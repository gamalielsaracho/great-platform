import mongoose, { Schema } from 'mongoose'

const FacultadSchema = new Schema({
	descripcion: {
		type: String
	}
})

export default mongoose.model('Facultad', FacultadSchema)