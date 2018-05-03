import mongoose, { Schema } from 'mongoose'

const PreguntaSchema = new Schema({
	contenido: {
		type: String
	},
	fechaCreacion: {
		type: Date
	},
	importante: {
		type: Boolean,
		default: false
	},
	contestada: {
		type: Boolean,
		default: false
	}
})

export default mongoose.model('Pregunta', PreguntaSchema)