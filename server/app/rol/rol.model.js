import mongoose, { Schema } from 'mongoose'

const RolSchema = new Schema({
	nombre: {
		type: String,
		default: 'alumno'
	}
})

export default mongoose.model('Rol', RolSchema)