import * as Yup from 'yup';
import { parseISO, startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';

import User from '../models/User';
import Review from '../models/Review';

class ReviewController {
  async index(req, res) {
    const { page = 1, date } = req.query;
    const auxOffset = page > 1 ? 1 : 0;
    const parseDate = parseISO(date);
    const limit = 10;
    const where = { reviewer_id: req.userId };

    if (date) {
      where.created_at = {
        [Op.between]: [startOfDay(parseDate), endOfDay(parseDate)],
      };
    }

    const reviews = await Review.findAll({
      where,
      order: ['created_at'],
      offset: (page - 1) * limit + auxOffset,
      limit,
      attributes: ['id'],
      include: [
        {
          model: User,
          as: 'reviewer',
          attributes: ['id', 'name'],
        },
        {
          model: User,
          as: 'reviewed',
          attributes: ['id', 'name'],
        },
      ],
    });

    return res.json(reviews);
  }

  async store(req, res) {
    const currentUser = await User.findByPk(req.userId);
    const isAdmin = currentUser.admin;

    if (!isAdmin) {
      return res.status(401).json({ error: 'User is not admin' });
    }

    const scheme = Yup.object().shape({
      reviewer_id: Yup.number().required(),
      reviewed_id: Yup.number().required(),
    });

    if (!(await scheme.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const review = await Review.create(req.body);

    return res.json(review);
  }
}

export default new ReviewController();
