
module.exports = (sequelize, DataTypes)=> {
        const Plant = sequelize.define("Plant", {
        name: DataTypes.STRING,
        dayPlanted: DataTypes.INTEGER,
        maturity: DataTypes.INTEGER,
        img: DataTypes.STRING,
        positionTop: DataTypes.INTEGER,
        positionLeft: DataTypes.INTEGER
    });


    Plant.associate = function(models) {

        Plant.belongsTo(models.User, {
          foreignKey: {
            allowNull: true
        }
        })
      }
    return Plant
    }