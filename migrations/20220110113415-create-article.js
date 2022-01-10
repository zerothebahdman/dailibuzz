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
      categoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'categories', // Name of the created table
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('articles');
  },
};
