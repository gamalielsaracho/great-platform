import {
	CERRAR_FORMULARIO_CALIFICACION,

	LISTAR_CALIFICACIONES_REQUEST,
	LISTAR_CALIFICACIONES_EXITO,
	LISTAR_CALIFICACIONES_FALLO,

	ABRIR_FORMULARIO_CREAR_CALIFICACION,

	CREAR_CALIFICACION_REQUEST,
	CREAR_CALIFICACION_EXITO,
	CREAR_CALIFICACION_FALLO,

	MOSTRAR_CALIFICACION_REQUEST,
	MOSTRAR_CALIFICACION_EXITO,
	MOSTRAR_CALIFICACION_FALLO,

	CERRAR_MODAL_MOSTRAR_CALIFICACION,

	// Editar calificacion.
		// form to edit a calificacion.
	ABRIR_FORMULARIO_EDITAR_CALIFICACION_REQUEST,
	ABRIR_FORMULARIO_EDITAR_CALIFICACION_EXITO,
	ABRIR_FORMULARIO_EDITAR_CALIFICACION_FALLO,

	EDITAR_CALIFICACION_REQUEST,
	EDITAR_CALIFICACION_EXITO,
	EDITAR_CALIFICACION_FALLO,

	ELIMINAR_CALIFICACION_REQUEST,
	ELIMINAR_CALIFICACION_EXITO,
	ELIMINAR_CALIFICACION_FALLO
} from '../actions/types'

const INITIAL_STATE = {
	formulario: {
		abirtoCrear: false,
		abirtoEditar: false,
		iniciarValores: false,
		error: '',
		cargando: false,
		calificacion: null
	},
	crear: { mensaje: '', cargando: false, error:'' },
	listar: { calificaciones:[], cargando: false, error: '' },
	eliminar: { cargando: false, mensaje: '', error: '' },
	mostrar: { cargando: false, calificacion: null, error: '', abierto: false },
	editar: { cargando: false, mensaje: '', error: '' }
}

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
		case ABRIR_FORMULARIO_CREAR_CALIFICACION:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: true,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					calificacion: null
				},
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar,
				mostrar: { abierto: false },
				eliminar: INITIAL_STATE.eliminar
			})

		case ABRIR_FORMULARIO_EDITAR_CALIFICACION_REQUEST:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: true,
					calificacion: null
				},
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar,
				mostrar: { abierto: false },
				eliminar: INITIAL_STATE.eliminar
			})

		case ABRIR_FORMULARIO_EDITAR_CALIFICACION_EXITO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: false,
					calificacion: action.payload
				},
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_CALIFICACION_FALLO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: action.payload,
					cargando: false,
					calificacion: null
				},
				mostrar: { abierto: false }
			})


		case CERRAR_FORMULARIO_CALIFICACION:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					calificacion: null
				}
			})

		// CREATE calificacion.
		case CREAR_CALIFICACION_REQUEST:
			return state = Object.assign({}, state, {
				crear: { cargando: true }
			})

		case CREAR_CALIFICACION_EXITO:
			// console.log(action.payload.datoInsertado)

			return Object.assign({}, state, {
				crear: { 
					mensaje: action.payload.mensaje,
				},
				formulario: { abirtoCrear: false }
				// listar: { 
				// 	calificaciones: [ ...state.listar.calificaciones, action.payload.datoInsertado ]
				// }
			})

		case CREAR_CALIFICACION_FALLO:
			return state = Object.assign({}, state, {
				crear: { error: action.payload }
			})

		// LISTAR.
		case LISTAR_CALIFICACIONES_REQUEST:
			return Object.assign({}, state, {
				listar: { cargando: true, error: '' },
				eliminar: INITIAL_STATE.eliminar
			})

		case LISTAR_CALIFICACIONES_EXITO:
			return Object.assign({}, state, {
				listar: { calificaciones: action.payload.calificaciones, cargando: false, error: '' }
			})


		case LISTAR_CALIFICACIONES_FALLO:
			return Object.assign({}, state, {
				listar: { error: action.payload, calificaciones:[], cargando: false }
			})

		// MOSTRAR.
		case MOSTRAR_CALIFICACION_REQUEST:
			return Object.assign({}, state, {
				mostrar: { cargando: true, abierto: true },
				formulario: { abirtoEditar: false, abirtoCrear: false },
				eliminar: INITIAL_STATE.eliminar
			})

		case MOSTRAR_CALIFICACION_EXITO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					calificacion: action.payload,
					abierto: true
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_CALIFICACION_FALLO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					calificacion: null,
					error: action.payload,
					abierto: true
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case CERRAR_MODAL_MOSTRAR_CALIFICACION:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					calificacion: null,
					error: '',
					abierto: false
				}
			})


		// EDITAR.
		case EDITAR_CALIFICACION_REQUEST:
			return Object.assign({}, state, {
				editar: { cargando: true }
			})

		case EDITAR_CALIFICACION_EXITO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false, 
					mensaje: action.payload.mensaje
				},
				formulario: { abirtoEditar: false }
			})

		case EDITAR_CALIFICACION_FALLO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false,
					mensaje: '', 
					error: action.payload
				}
			})
		

		// ELIMINAR.
		case ELIMINAR_CALIFICACION_REQUEST:
			return Object.assign({}, state, {
				eliminar: { cargando: true }
			})

		case ELIMINAR_CALIFICACION_EXITO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: '',
					calificacion: action.payload
				}
			})

		case ELIMINAR_CALIFICACION_FALLO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: action.payload,
					calificacion: null
				}
			})


		default: 
			return state
	}

}