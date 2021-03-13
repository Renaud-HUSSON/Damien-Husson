import { Sequelize } from 'sequelize'
import { Database } from '../ts/interfaces/db'
import RealisationModel from '../models/RealisationModel'
import CompetenceModel from '../models/CompetenceModel'
import UserModel from '../models/UtilisateurModel'
import RefreshTokenModel from '../models/RefreshTokenModel'
import bcrypt from 'bcrypt'
import { config } from 'dotenv'
import { CategorieModel } from '../models/CategorieModel'
config()

const DB_DATABASE = process.env.DB_DATABASE ?? 'damien'
const DB_USERNAME = process.env.DB_USERNAME ?? 'root'
const DB_PASSWORD = process.env.DB_PASSWORD ?? 'root'
const DB_HOST = process.env.DB_HOST ?? 'damiendb'

const USERS = process.env.FASTIFY_PUBLIC_USER_EMAILS?.split(',')
const USERS_PASSWORDS = process.env.FASTIFY_PUBLIC_USER_PASSWORDS?.split(',')

const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql',
})

const initUsers = async () => {
  for (let i = 0; i < USERS?.length ?? 0; i++) {
    db.utilisateurs.create({
      email: USERS[i],
      password: await bcrypt.hash(USERS_PASSWORDS[i], 10),
    })
  }
}

const db: Database = {
  sequelize: sequelize,
  realisations: RealisationModel(sequelize),
  competences: CompetenceModel(sequelize),
  utilisateurs: UserModel(sequelize),
  refreshTokens: RefreshTokenModel(sequelize),
  categories: CategorieModel(sequelize),
}

db.utilisateurs.hasMany(db.refreshTokens)
db.refreshTokens.belongsTo(db.utilisateurs)

db.realisations.belongsToMany(db.categories, {
  through: 'realisationsCategories',
  foreignKey: 'realisationId',
})
db.categories.belongsToMany(db.realisations, {
  through: 'realisationsCategories',
  foreignKey: 'categorieId',
})

initUsers()

export default db
