import { Model, ModelCtor, Optional, Sequelize } from 'sequelize'

export interface RealisationAttributes {
  id: number
  titre: string
  image: string
  description: string
}

export interface RealisationCreationAttributes
  extends Optional<RealisationAttributes, 'id'> {}

export interface Realisation
  extends Model<RealisationAttributes, RealisationCreationAttributes> {
  dataValues: RealisationAttributes
}

export interface CompetencesAttributes {
  id: number
  titre: string
  image: string
  description: string
}

export interface CompetenceCreationAttributes
  extends Optional<CompetencesAttributes, 'id'> {}

export interface Competence
  extends Model<CompetencesAttributes, CompetenceCreationAttributes> {
  dataValues: CompetencesAttributes
}

export interface Database {
  sequelize: Sequelize
  realisations: ModelCtor<Realisation>
  competences: ModelCtor<Competence>
}
