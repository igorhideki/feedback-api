import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        admin: Sequelize.BOOLEAN,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default User;
