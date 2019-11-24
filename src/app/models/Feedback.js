import Sequelize, { Model } from 'sequelize';

class Feedback extends Model {
  static init(sequelize) {
    super.init(
      {
        productivity: Sequelize.INTEGER,
        organization: Sequelize.INTEGER,
        flexibility: Sequelize.INTEGER,
        team_work: Sequelize.INTEGER,
        leadership: Sequelize.INTEGER,
        observation: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Review, { foreignKey: 'review_id', as: 'review' });
  }
}

export default Feedback;
