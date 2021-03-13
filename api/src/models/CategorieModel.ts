import { ModelCtor, Sequelize } from 'sequelize/types'
import { DataTypes } from 'sequelize'
import { Categorie } from '../ts/interfaces/db'

export const CategorieModel = (sequelize: Sequelize): ModelCtor<Categorie> => {
  return sequelize.define(
    'Categories',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      nom: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'categories',
    }
  )
}
