export default function (sequelize, DataTypes) {
  return sequelize.define('posts', {
    id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      field: 'user_id',
      references: {
        model: 'users',
        key: 'id',
      },
    },
    // postType: {
    //   type: DataTypes.INTEGER(1),
    //   allowNull: false,
    //   field: 'post_type',
    // },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // price: {
    //   type: DataTypes.INTEGER(6).UNSIGNED,
    //   allowNull: true,
    // },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // category: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    // condition: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updated_at',
    }, 
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    tableName: 'posts',
  });
}
