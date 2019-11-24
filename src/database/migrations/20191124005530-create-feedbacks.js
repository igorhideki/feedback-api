module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('feedbacks', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      review_id: {
        type: Sequelize.INTEGER,
        references: { model: 'reviews', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      productivity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      organization: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      flexibility: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      observation: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
      },
      team_work: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      leadership: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('feedbacks');
  },
};
