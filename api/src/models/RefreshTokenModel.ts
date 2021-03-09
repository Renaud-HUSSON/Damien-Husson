import { ModelCtor, Sequelize } from 'sequelize/types'
import { DataTypes } from 'sequelize'
import { RefreshToken } from '../ts/interfaces/db'

export default (sequelize: Sequelize): ModelCtor<RefreshToken> => {
  return sequelize.define(
    'RefreshTokens',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      token: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'refreshTokens',
    }
  )
}
