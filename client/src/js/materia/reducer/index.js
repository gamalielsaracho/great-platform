import {
	CERRAR_FORMULARIO_MATERIA,

	LISTAR_MATERIAS_REQUEST,
	LISTAR_MATERIAS_EXITO,
	LISTAR_MATERIAS_FALLO,

	ABRIR_FORMULARIO_CREAR_MATERIA,

	CREAR_MATERIA_REQUEST,
	CREAR_MATERIA_EXITO,
	CREAR_MATERIA_FALLO,

	MOSTRAR_MATERIA_REQUEST,
	MOSTRAR_MATERIA_EXITO,
	MOSTRAR_MATERIA_FALLO,

	CERRAR_MODAL_MOSTRAR_MATERIA,

	// Editar Rol.
		// form to edit a rol.
	ABRIR_FORMULARIO_EDITAR_MATERIA_REQUEST,
	ABRIR_FORMULARIO_EDITAR_MATERIA_EXITO,
	ABRIR_FORMULARIO_EDITAR_MATERIA_FALLO,

	EDITAR_MATERIA_REQUEST,
	EDITAR_MATERIA_EXITO,
	EDITAR_MATERIA_FALLO,

	ELIMINAR_MATERIA_REQUEST,
	ELIMINAR_MATERIA_EXITO,
	ELIMINAR_MATERIA_FALLO
} from '../actions/types'

const INITIAL_STATE = {
	formulario: {
		abirtoCrear: false,
		abirtoEditar: false,
		iniciarValores: false,
		error: '',
		cargando: false,
		materia: {}
	},
	crear: { mensaje: '', cargando: false, error:'' },
	listar: { materias:[], cargando: false, error: '' },
	eliminar: { cargando: false, mensaje: '', error: '' },
	mostrar: { cargando: false, materia: {}, error: '', abierto: false },
	editar: { cargando: false, mensaje: '', error: '' }
}

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
		case ABRIR_FORMULARIO_CREAR_MATERIA:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: true,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					materia: {}
				},
				mostrar: { abierto: false },
				eliminar: INITIAL_STATE.eliminar
			})

		case ABRIR_FORMULARIO_EDITAR_MATERIA_REQUEST:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: true,
					materia: {}
				},
				mostrar: { abierto: false },
				eliminar: INITIAL_STATE.eliminar
			})

		case ABRIR_FORMULARIO_EDITAR_MATERIA_EXITO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: false,
					materia: action.payload
				},
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_MATERIA_FALLO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: action.payload,
					cargando: false,
					materia: {}
				},
				mostrar: { abierto: false }
			})


		case CERRAR_FORMULARIO_MATERIA:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					materia: {}
				}
			})

		// CREATE ROL.
		case CREAR_MATERIA_REQUEST:
			return state = Object.assign({}, state, {
				crear: { cargando: true }
			})

		case CREAR_MATERIA_EXITO:
			console.log(action.payload.datoInsertado)

			return Object.assign({}, state, {
				crear: { 
					mensaje: action.payload.mensaje,
				},
				formulario: { abirtoCrear: false }
				// listar: { 
				// 	materias: [ ...state.listar.roles, action.payload.datoInsertado ]
				// }
			})

		case CREAR_MATERIA_FALLO:
			return state = Object.assign({}, state, {
				crear: { error: action.payload }
			})

		// LISTAR.
		case LISTAR_MATERIAS_REQUEST:
			return Object.assign({}, state, {
				listar: { cargando: true, error: '' },
				eliminar: INITIAL_STATE.eliminar
			})

		case LISTAR_MATERIAS_EXITO:
			return Object.assign({}, state, {
				listar: { materias: action.payload.materias, cargando: false, error: '' }
			})


		case LISTAR_MATERIAS_FALLO:
			return Object.assign({}, state, {
				listar: { error: action.payload, materias:[], cargando: false }
			})

		// MOSTRAR.
		case MOSTRAR_MATERIA_REQUEST:
			return Object.assign({}, state, {
				mostrar: { cargando: true, abierto: true },
				formulario: { abirtoEditar: false, abirtoCrear: false },
				eliminar: INITIAL_STATE.eliminar
			})

		case MOSTRAR_MATERIA_EXITO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					materia: action.payload,
					abierto: true
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_MATERIA_FALLO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					materia: {},
					error: action.payload,
					abierto: true
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case CERRAR_MODAL_MOSTRAR_MATERIA:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					materia: {},
					error: '',
					abierto: false
				}
			})


		// EDITAR.
		case EDITAR_MATERIA_REQUEST:
			return Object.assign({}, state, {
				editar: { cargando: true }
			})

		case EDITAR_MATERIA_EXITO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false, 
					mensaje: action.payload.mensaje
				},
				formulario: { abirtoEditar: false }
			})

		case EDITAR_MATERIA_FALLO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false,
					mensaje: '', 
					error: action.payload
				}
			})
		

		// ELIMINAR.
		case ELIMINAR_MATERIA_REQUEST:
			return Object.assign({}, state, {
				eliminar: { cargando: true }
			})

		case ELIMINAR_MATERIA_EXITO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: '',
					materia: action.payload
				}
			})

		case ELIMINAR_MATERIA_FALLO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: action.payload,
					materia: {}
				}
			})


		default: 
			return state
	}

}