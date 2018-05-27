import mongoose, { Schema } from 'mongoose'

const UsuarioSchema = new Schema({
	correo: {
		type: String,
		unique: true
	},
	nombreUsuario: {
		type: String
	},
	contrasena: {
		type: String
	},
	rol: {
		type: { Schema.ObjectId, ref: 'Rol' }
	}
})

export default mongoose.model('Usuario', UsuarioSchema)