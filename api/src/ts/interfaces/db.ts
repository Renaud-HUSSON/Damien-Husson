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
export interface UtilisateurAttributes {
  id: number
  email: string
  password: string
}

export interface UtilisateurCreationAttributes
  extends Optional<UtilisateurAttributes, 'id'> {}

export interface Utilisateur
  extends Model<UtilisateurAttributes, UtilisateurCreationAttributes> {
  dataValues: UtilisateurAttributes
}

export interface RefreshTokenAttributes {
  id: number
  utilisateurId: number
  token: string
}

export interface RefreshTokenCreationAttributes
  extends Optional<RefreshTokenAttributes, 'id'> {}

export interface RefreshToken
  extends Model<RefreshTokenAttributes, RefreshTokenCreationAttributes> {
  dataValues: RefreshTokenAttributes
}

export interface Database {
  sequelize: Sequelize
  realisations: ModelCtor<Realisation>
  competences: ModelCtor<Competence>
  utilisateurs: ModelCtor<Utilisateur>
  refreshTokens: ModelCtor<RefreshToken>
}
