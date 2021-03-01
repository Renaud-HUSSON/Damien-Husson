import { Sequelize } from 'sequelize'
import { DatabaseInterface } from '../@types/db'
import RealisationModel from '../models/RealisationModel'

const DB_DATABASE = process.env.DB_DATABASE ?? 'damien'
const DB_USERNAME = process.env.DB_USERNAME ?? 'root'
const DB_PASSWORD = process.env.DB_PASSWORD ?? 'root'
const DB_HOST = process.env.DB_HOST ?? 'damiendb'

const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql'
});

const db : DatabaseInterface = {
  sequelize: sequelize,
  realisations: RealisationModel(sequelize),
}

export default db