import { ModelCtor, Sequelize } from 'sequelize'

export interface Database {
  sequelize: Sequelize
  realisations: ModelCtor<any>
  competences?: ModelCtor<any>
}
