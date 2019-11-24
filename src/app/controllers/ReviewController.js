import * as Yup from 'yup';

import User from '../models/User';
import Review from '../models/Review';

class ReviewController {
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
