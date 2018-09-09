import mongoose, { Schema } from 'mongoose'

const RolSchema = new Schema({
	descripcion: {
		type: String
	}
})

export default mongoose.model('Rol', RolSchema)