import { ModelCtor, Sequelize } from 'sequelize/types'
import { DataTypes } from 'sequelize'
import { Realisation } from '../ts/interfaces/db'

export default (sequelize: Sequelize): ModelCtor<Realisation> => {
  return sequelize.define<Realisation>(
    'Realisations',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      titre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      likes: {
        type: DataTypes.INTEGER.UNSIGNED,
      },
    },
    {
      tableName: 'realisations',
    }
  )
}
