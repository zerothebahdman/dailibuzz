module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('articles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Opps!. Name must specified.' },
          notEmpty: { msg: "Opps!. Name can't be empty." },
        },
      },
      image: DataTypes.STRING,
      url: DataTypes.STRING,
      source: DataTypes.STRING,
      category_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'categories', // Name of the created table
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('articles');
  },
};
