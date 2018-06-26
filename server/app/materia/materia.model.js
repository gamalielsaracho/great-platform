import mongoose, { Schema } from 'mongoose'

const MateriaSchema = new Schema({
	nombre: {
		type: String
	}
})

export default mongoose.model('Materia', MateriaSchema)