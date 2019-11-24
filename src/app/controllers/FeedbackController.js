import * as Yup from 'yup';

import Feedback from '../models/Feedback';
import Review from '../models/Review';

class FeedbackController {
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
        .min(0)
        .max(5),
      organization: Yup.number()
        .required()
        .min(0)
        .max(5),
      flexibility: Yup.number()
        .required()
        .min(0)
        .max(5),
      team_work: Yup.number()
        .required()
        .min(0)
        .max(5),
      leadership: Yup.number()
        .required()
        .min(0)
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
}

export default new FeedbackController();
