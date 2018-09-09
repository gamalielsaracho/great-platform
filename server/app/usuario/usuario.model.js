import mongoose, { Schema } from 'mongoose'

const UsuarioSchema = new Schema({
	nroDocumento: {
		type: Number,
		unique: true
	},
	nombres: {
		type: String
	},
	apellidos: {
		type: String
	},
	correo: {
		type: String,
		unique: true
	},
	curso: {
		type: String
	},
	contrasena: {
		type: String
	},
	rol: {
		// default: 'alumno'
		type: Schema.Types.ObjectId, ref: 'Rol'
	},
	calificaciones: [
		{
			docente: {
				type: Schema.Types.ObjectId, ref: 'Usuario'
			},
			materia: {
				type: Schema.Types.ObjectId, ref: 'Materia'
			},
			oportunidad: {
				type: Schema.Types.ObjectId, ref: 'Oportunidad'
			},
			nota: {
				type: Number,
				default: 0
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
		}
	],
	permisos: [
		{
			modulo: {
				type: Schema.Types.ObjectId, ref: 'Modulo'
			},
			editar: {
				type: Boolean,
				default: false
			},
			eliminar: {
				type: Boolean,
				default: false
			},
			mostrar: {
				type: Boolean,
				default: false
			}
		}
	]
})

export default mongoose.model('Usuario', UsuarioSchema)