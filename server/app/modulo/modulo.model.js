import mongoose, { Schema } from 'mongoose'

const ModuloSchema = new Schema({
	descripcion: {
		type: String
	}
})

export default mongoose.model('Modulo', ModuloSchema)