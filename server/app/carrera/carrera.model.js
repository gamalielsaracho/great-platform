import mongoose, { Schema } from 'mongoose'

const CarreraSchema = new Schema({
	descripcion: {
		type: String
	},
	facultad: {
		type: Schema.Types.ObjectId, ref: 'Facultad'
	},
	materias: [
		{
			materia: {
				type: Schema.Types.ObjectId, ref: 'Materia'
			}
		}
	]
})

export default mongoose.model('Carrera', CarreraSchema)