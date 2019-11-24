import { Model } from 'sequelize';

class Review extends Model {
  static init(sequelize) {
    super.init({}, { sequelize });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'reviewer_id', as: 'reviewer' });
    this.belongsTo(models.User, { foreignKey: 'reviewed_id', as: 'reviewed' });
  }
}

export default Review;
