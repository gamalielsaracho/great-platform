import mongoose, { Schema } from 'mongoose'

const OportunidadSchema = new Schema({
	descripcion: {
		type: String
	}
})

export default mongoose.model('Oportunidad', OportunidadSchema)