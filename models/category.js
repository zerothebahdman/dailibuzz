const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Article }) {
      this.hasMany(Article, {
        as: 'article',
        hooks: true,
        onDelete: 'cascade',
        onUpdate: 'cascade',
      });
    }

    toJSON() {
      return {
        ...this.get(),
        id: undefined,
      };
    }
  }
  category.init(
    {
      uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      name: DataTypes.STRING,
      createdAt: { type: DataTypes.DATE },
      updatedAt: { type: DataTypes.DATE },
    },
    {
      sequelize,
      modelName: 'Category',
      tabelName: 'categories',
      underscored: true,
    }
  );
  return category;
};
