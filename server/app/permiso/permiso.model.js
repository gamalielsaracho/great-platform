import mongoose, { Schema } from 'mongoose'

const PermisoSchema = new Schema({
	usuario: {
		type: Schema.Types.ObjectId, ref: 'Usuario'
	},
	modulo: {
		type: String
	},
	mostrar: {
		default: false,
		type: Boolean
	},
	eliminar: {
		default: false,
		type: Boolean
	},
	editar: {
		default: false,
		type: Boolean
	},
	crear: {
		default: false,
		type: Boolean
	}
})

export default mongoose.model('Permiso', PermisoSchema)