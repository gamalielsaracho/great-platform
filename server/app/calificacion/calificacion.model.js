import mongoose, { Schema } from 'mongoose'

const CalificacionSchema = new Schema({
	alumno: {
		type: { Schema.ObjectId, ref: 'Usuario' }
	},
	nota: {
		type: Number,
		default: 0
	},
	firmaAlumno: {
		type: String,
		'ausente'
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