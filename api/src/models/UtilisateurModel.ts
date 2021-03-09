import { ModelCtor, Sequelize } from 'sequelize/types'
import { DataTypes } from 'sequelize'
import { Utilisateur } from '../ts/interfaces/db'

export default (sequelize: Sequelize): ModelCtor<Utilisateur> => {
  return sequelize.define(
    'Utilisateurs',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'utilisateurs',
    }
  )
}
