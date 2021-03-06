import { ModelCtor, Sequelize } from 'sequelize/types'
import { DataTypes } from 'sequelize'
import { Competence } from '../ts/interfaces/db'

export default (sequelize: Sequelize): ModelCtor<Competence> => {
  return sequelize.define<Competence>(
    'Competences',
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
    },
    {
      tableName: 'competences',
    }
  )
}
