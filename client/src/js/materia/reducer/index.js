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
		materia: null
	},
	crear: { mensaje: '', cargando: false, error:'' },
	listar: { materias: null, cargando: false, error: '' },
	eliminar: { cargando: false, mensaje: '', error: '' },
	mostrar: { cargando: false, materia: null, error: '' },
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
					materia: null
				},
				mostrar: INITIAL_STATE.mostrar,
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
					materia: null
				},
				mostrar: INITIAL_STATE.mostrar,
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
				mostrar: INITIAL_STATE.mostrar
			})

		case ABRIR_FORMULARIO_EDITAR_MATERIA_FALLO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: action.payload,
					cargando: false,
					materia: null
				},
				mostrar: INITIAL_STATE.mostrar
			})


		case CERRAR_FORMULARIO_MATERIA:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					materia: null
				}
			})


		case CREAR_MATERIA_REQUEST:
			return state = Object.assign({}, state, {
				crear: { cargando: true }
			})

		case CREAR_MATERIA_EXITO:

			return Object.assign({}, state, {
				crear: { 
					mensaje: action.payload.mensaje,
				},
				formulario: { abirtoCrear: false }
			})

		case CREAR_MATERIA_FALLO:
			return state = Object.assign({}, state, {
				crear: { error: action.payload }
			})


		case LISTAR_MATERIAS_REQUEST:
			return Object.assign({}, state, {
				listar: { cargando: true, error: '' },
				eliminar: INITIAL_STATE.eliminar,
				formulario: INITIAL_STATE.formulario
			})

		case LISTAR_MATERIAS_EXITO:
			return Object.assign({}, state, {
				listar: { materias: action.payload.materias, cargando: false, error: '' }
			})


		case LISTAR_MATERIAS_FALLO:
			return Object.assign({}, state, {
				listar: { error: action.payload, materias: null, cargando: false }
			})


		case MOSTRAR_MATERIA_REQUEST:
			return Object.assign({}, state, {
				mostrar: { cargando: true },
				formulario: { abirtoEditar: false, abirtoCrear: false },
				eliminar: INITIAL_STATE.eliminar
			})

		case MOSTRAR_MATERIA_EXITO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					materia: action.payload
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_MATERIA_FALLO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					materia: null,
					error: action.payload
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})


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
		

		case ELIMINAR_MATERIA_REQUEST:
			return Object.assign({}, state, {
				eliminar: { cargando: true }
			})

		case ELIMINAR_MATERIA_EXITO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: ''
				}
			})

		case ELIMINAR_MATERIA_FALLO:
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