import {
	CERRAR_FORMULARIO_PERMISO,

	LISTAR_PERMISOS_REQUEST,
	LISTAR_PERMISOS_EXITO,
	LISTAR_PERMISOS_FALLO,

	ABRIR_FORMULARIO_CREAR_PERMISO,

	CREAR_PERMISO_REQUEST,
	CREAR_PERMISO_EXITO,
	CREAR_PERMISO_FALLO,

	MOSTRAR_PERMISO_REQUEST,
	MOSTRAR_PERMISO_EXITO,
	MOSTRAR_PERMISO_FALLO,

	ABRIR_FORMULARIO_EDITAR_PERMISO_REQUEST,
	ABRIR_FORMULARIO_EDITAR_PERMISO_EXITO,
	ABRIR_FORMULARIO_EDITAR_PERMISO_FALLO,

	EDITAR_PERMISO_REQUEST,
	EDITAR_PERMISO_EXITO,
	EDITAR_PERMISO_FALLO,

	ELIMINAR_PERMISO_REQUEST,
	ELIMINAR_PERMISO_EXITO,
	ELIMINAR_PERMISO_FALLO
} from '../actions/types'

const INITIAL_STATE = {
	formulario: {
		abirtoCrear: false,
		abirtoEditar: false,
		iniciarValores: false,
		error: '',
		cargando: false,
		permiso: null
	},
	crear: { mensaje: '', cargando: false, error:'' },
	listar: { permisos: null, cargando: false, error: '' },
	eliminar: { cargando: false, mensaje: '', error: '' },
	mostrar: { cargando: false, permiso: null, error: '' },
	editar: { cargando: false, mensaje: '', error: '' }
}


export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
		case ABRIR_FORMULARIO_CREAR_PERMISO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: true,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					permiso: null
				},
				mostrar: INITIAL_STATE.mostrar,
				eliminar: INITIAL_STATE.eliminar
			})

		case ABRIR_FORMULARIO_EDITAR_PERMISO_REQUEST:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: true,
					permiso: null
				},
				mostrar: INITIAL_STATE.mostrar,
				eliminar: INITIAL_STATE.eliminar
			})

		case ABRIR_FORMULARIO_EDITAR_PERMISO_EXITO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: false,
					permiso: action.payload
				},
				mostrar: INITIAL_STATE.mostrar
			})

		case ABRIR_FORMULARIO_EDITAR_PERMISO_FALLO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: action.payload,
					cargando: false,
					permiso: null
				},
				mostrar: INITIAL_STATE.mostrar
			})


		case CERRAR_FORMULARIO_PERMISO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					permiso: null
				}
			})

		case CREAR_PERMISO_REQUEST:
			return state = Object.assign({}, state, {
				crear: { cargando: true }
			})

		case CREAR_PERMISO_EXITO:
			return Object.assign({}, state, {
				crear: { 
					mensaje: action.payload.mensaje,
				},
				formulario: { abirtoCrear: false }
			})


		case CREAR_PERMISO_FALLO:
			return state = Object.assign({}, state, {
				crear: { error: action.payload }
			})


		case LISTAR_PERMISOS_REQUEST:
			return Object.assign({}, state, {
				listar: { cargando: true, error: '' },
				eliminar: INITIAL_STATE.eliminar,
				formulario: INITIAL_STATE.formulario
			})

		case LISTAR_PERMISOS_EXITO:
			return Object.assign({}, state, {
				listar: { permisos: action.payload.permisos, cargando: false, error: '' }
			})


		case LISTAR_PERMISOS_FALLO:
			return Object.assign({}, state, {
				listar: { error: action.payload, permisos: null, cargando: false }
			})


		case MOSTRAR_PERMISO_REQUEST:
			return Object.assign({}, state, {
				mostrar: { cargando: true },
				formulario: { abirtoEditar: false, abirtoCrear: false },
				eliminar: INITIAL_STATE.eliminar
			})

		case MOSTRAR_PERMISO_EXITO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					permiso: action.payload
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_PERMISO_FALLO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					permiso: null,
					error: action.payload
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})



		case EDITAR_PERMISO_REQUEST:
			return Object.assign({}, state, {
				editar: { cargando: true }
			})

		case EDITAR_PERMISO_EXITO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false, 
					mensaje: action.payload.mensaje
				},
				formulario: { abirtoEditar: false }
			})

		case EDITAR_PERMISO_FALLO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false,
					mensaje: '', 
					error: action.payload
				}
			})
		


		case ELIMINAR_PERMISO_REQUEST:
			return Object.assign({}, state, {
				eliminar: { cargando: true }
			})

		case ELIMINAR_PERMISO_EXITO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: ''
				}
			})

		case ELIMINAR_PERMISO_FALLO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: action.payload
				}
			})


		default: 
			return state
	}

}