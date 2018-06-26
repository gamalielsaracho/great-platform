import mongoose, { Schema } from 'mongoose'

const CalificacionSchema = new Schema({
	alumno: {
		type: Schema.Types.ObjectId, ref: 'Person' 
	},
	docente: {
		type: Schema.Types.ObjectId, ref: 'Usuario'
	},
	nota: {
		type: Number,
		default: 0
	},
	presente: {
		type: Boolean,
		default: false
	},
	fechaExamen: {
		type: Date
	},
	observaciones: {
		type: String
	},
	fechaCreacion: {
		type: Date
	},
	fechaActualizacion: {
		type: Date
	}
})

export default mongoose.model('Calificacion', CalificacionSchema)