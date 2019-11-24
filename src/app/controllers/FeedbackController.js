import * as Yup from 'yup';
import { parseISO, startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';

import User from '../models/User';
import Feedback from '../models/Feedback';
import Review from '../models/Review';

class FeedbackController {
  async index(req, res) {
    const currentUser = await User.findByPk(req.userId);
    const isAdmin = currentUser.admin;

    if (!isAdmin) {
      return res.status(401).json({ error: 'User is not admin' });
    }

    const { page = 1, date } = req.query;
    const auxOffset = page > 1 ? 1 : 0;
    const parseDate = parseISO(date);
    const limit = 10;
    const where = {};

    if (date) {
      where.created_at = {
        [Op.between]: [startOfDay(parseDate), endOfDay(parseDate)],
      };
    }

    const feedbacks = await Feedback.findAll({
      where,
      order: ['created_at'],
      offset: (page - 1) * limit + auxOffset,
      limit,
      attributes: [
        'id',
        'productivity',
        'organization',
        'flexibility',
        'team_work',
        'leadership',
        'observation',
      ],
      include: {
        model: Review,
        as: 'review',
        attributes: ['id'],
        include: [
          {
            model: User,
            as: 'reviewer',
            attributes: ['name'],
          },
          {
            model: User,
            as: 'reviewed',
            attributes: ['name'],
          },
        ],
      },
    });

    return res.json(feedbacks);
  }

  async store(req, res) {
    const review = await Review.findByPk(req.params.reviewId);
    const isReviewer = req.userId === review.reviewer_id;

    if (!isReviewer) {
      return res
        .status(401)
        .json({ error: 'User is not reviewer of this feedback' });
    }

    const scheme = Yup.object().shape({
      productivity: Yup.number()
        .required()
        .min(1)
        .max(5),
      organization: Yup.number()
        .required()
        .min(1)
        .max(5),
      flexibility: Yup.number()
        .required()
        .min(1)
        .max(5),
      team_work: Yup.number()
        .required()
        .min(1)
        .max(5),
      leadership: Yup.number()
        .required()
        .min(1)
        .max(5),
      observation: Yup.string(),
    });

    if (!(await scheme.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const feedback = await Feedback.create({
      review_id: review.id,
      ...req.body,
    });

    return res.json(feedback);
  }

  async update(req, res) {
    const currentUser = await User.findByPk(req.userId);
    const isAdmin = currentUser.admin;

    if (!isAdmin) {
      return res.status(401).json({ error: 'User is not admin' });
    }

    const feedback = await Feedback.findByPk(req.params.id);

    if (!feedback) {
      return res.status(400).json({ error: 'Feedback not found' });
    }

    const scheme = Yup.object().shape({
      productivity: Yup.number()
        .min(1)
        .max(5),
      organization: Yup.number()
        .min(1)
        .max(5),
      flexibility: Yup.number()
        .min(1)
        .max(5),
      team_work: Yup.number()
        .min(1)
        .max(5),
      leadership: Yup.number()
        .min(1)
        .max(5),
      observation: Yup.string(),
    });

    if (!(await scheme.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    await feedback.update(req.body);

    return res.json(feedback);
  }
}

export default new FeedbackController();
