import * as Yup from 'yup';

import User from '../models/User';

class UserController {
  async store(req, res) {
    const scheme = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password_hash: Yup.string()
        .required()
        .min(6),
    });

    if (!(await scheme.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email } = req.body;
    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const user = await User.create(req.body);

    return res.json(user);
  }
}

export default new UserController();
