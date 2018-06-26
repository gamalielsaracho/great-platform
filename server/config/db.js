import mongoose from 'mongoose'
import config from './index'

console.log(config.database.url)
const db = mongoose.connect(config.database.url)
	.then(() => {
		console.log(`Conexión exitosa con mongodb`)
	})
	.catch((error) => {
		console.log(`Ocurrió un error al tratar de conectar: ${error}`)
	})

export default db