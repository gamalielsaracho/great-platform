import mongoose, { Schema } from 'mongoose'

const UsuarioSchema = new Schema({
	nroDocumento: {
		type: Number,
		unique: true
	},
	nombres: {
		type: String
	},
	apellidos: {
		type: String
	},
	correo: {
		type: String,
		unique: true
	},
	curso: {
		type: String
	},
	contrasena: {
		type: String
	},
	rol: {
		type: String,
		default: 'alumno'
	},
	calificaciones: [
		{ type: Schema.Types.ObjectId, ref: 'Calificacion' }
	]
})

export default mongoose.model('Usuario', UsuarioSchema)