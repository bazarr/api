var bcrypt = require('bcryptjs');
module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('users', {
    id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password_hash: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.VIRTUAL,
      set: function (val) {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(val, salt);
        this.setDataValue('password', val); // Remember to set the data value, otherwise it won't be validated
        this.setDataValue('password_hash', hash);
      },
      validate: {
        isLongEnough: function (val) {
          if (val.length < 6) {
            throw new Error("Password must be atleast 6 characters long")
          }
        }
      }
    },
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
  }, {
    tableName: 'users',
  });

  return User;
}
