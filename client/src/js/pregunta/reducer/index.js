import {
	CERRAR_FORMULARIO_PREGUNTA,

	LISTAR_PREGUNTAS_REQUEST,
	LISTAR_PREGUNTAS_EXITO,
	LISTAR_PREGUNTAS_FALLO,

	ABRIR_FORMULARIO_CREAR_PREGUNTA,

	CREAR_PREGUNTA_REQUEST,
	CREAR_PREGUNTA_EXITO,
	CREAR_PREGUNTA_FALLO,

	MOSTRAR_PREGUNTA_REQUEST,
	MOSTRAR_PREGUNTA_EXITO,
	MOSTRAR_PREGUNTA_FALLO,


	// Editar pregunta.
		// form to edit.
	ABRIR_FORMULARIO_EDITAR_PREGUNTA_REQUEST,
	ABRIR_FORMULARIO_EDITAR_PREGUNTA_EXITO,
	ABRIR_FORMULARIO_EDITAR_PREGUNTA_FALLO,

	EDITAR_PREGUNTA_REQUEST,
	EDITAR_PREGUNTA_EXITO,
	EDITAR_PREGUNTA_FALLO,

	ELIMINAR_PREGUNTA_REQUEST,
	ELIMINAR_PREGUNTA_EXITO,
	ELIMINAR_PREGUNTA_FALLO
} from '../actions/types'

const INITIAL_STATE = {
	formulario: {
		abirtoCrear: false,
		abirtoEditar: false,
		iniciarValores: false,
		error: '',
		cargando: false,
		pregunta: null
	},
	crear: { mensaje: '', cargando: false, error:'' },
	listar: { preguntas:[], cargando: false, error: '' },
	eliminar: { cargando: false, mensaje: '', error: '' },
	mostrar: { cargando: false, pregunta: null, error: '', abierto: false },
	editar: { cargando: false, mensaje: '', error: '' }
}

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
		case ABRIR_FORMULARIO_CREAR_PREGUNTA:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: true,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					pregunta: null
				},
				mostrar: INITIAL_STATE.mostrar,
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar,

				eliminar: INITIAL_STATE.eliminar
			})

		case ABRIR_FORMULARIO_EDITAR_PREGUNTA_REQUEST:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: true,
					pregunta: null
				},
				mostrar: INITIAL_STATE.mostrar,
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar,

				eliminar: INITIAL_STATE.eliminar
			})

		case ABRIR_FORMULARIO_EDITAR_PREGUNTA_EXITO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: false,
					pregunta: action.payload
				},
				mostrar: INITIAL_STATE.mostrar
			})

		case ABRIR_FORMULARIO_EDITAR_PREGUNTA_FALLO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: action.payload,
					cargando: false,
					pregunta: null
				},
				mostrar: INITIAL_STATE.mostrar
			})


		case CERRAR_FORMULARIO_PREGUNTA:
			return Object.assign({}, state, {
				formulario: INITIAL_STATE.formulario
			})

		// CREATE.
		case CREAR_PREGUNTA_REQUEST:
			return state = Object.assign({}, state, {
				crear: { cargando: true }
			})

		case CREAR_PREGUNTA_EXITO:

			return Object.assign({}, state, {
				crear: { 
					mensaje: action.payload.mensaje,
				},
				formulario: INITIAL_STATE.formulario
			})

		case CREAR_PREGUNTA_FALLO:
			console.log(action.payload)
			return state = Object.assign({}, state, {
				crear: { error: action.payload }
			})

		// LISTAR.
		case LISTAR_PREGUNTAS_REQUEST:
			return Object.assign({}, state, {
				listar: { cargando: true, error: '' },
				eliminar: INITIAL_STATE.eliminar
			})


		case LISTAR_PREGUNTAS_EXITO:
			return Object.assign({}, state, {
				listar: { preguntas: action.payload.preguntas, cargando: false, error: '' }
			})


		case LISTAR_PREGUNTAS_FALLO:
			return Object.assign({}, state, {
				listar: { error: action.payload, preguntas:[], cargando: false }
			})

		// MOSTRAR.
		case MOSTRAR_PREGUNTA_REQUEST:
			return Object.assign({}, state, {
				mostrar: { cargando: true, abierto: true },
				formulario: INITIAL_STATE.formulario,
				eliminar: INITIAL_STATE.eliminar,

				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar
			})

		case MOSTRAR_PREGUNTA_EXITO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					pregunta: action.payload,
					abierto: true
				},
				formulario: INITIAL_STATE.formulario
			})

		case MOSTRAR_PREGUNTA_FALLO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					pregunta: null,
					error: action.payload,
					abierto: true
				},
				formulario: INITIAL_STATE.formulario
			})



		// EDITAR.
		case EDITAR_PREGUNTA_REQUEST:
			return Object.assign({}, state, {
				editar: { cargando: true }
			})

		case EDITAR_PREGUNTA_EXITO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false, 
					mensaje: action.payload.mensaje
				},
				formulario: INITIAL_STATE.formulario
			})

		case EDITAR_PREGUNTA_FALLO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false,
					mensaje: '', 
					error: action.payload
				}
			})
		

		// ELIMINAR.
		case ELIMINAR_PREGUNTA_REQUEST:
			return Object.assign({}, state, {
				eliminar: { cargando: true }
			})

		case ELIMINAR_PREGUNTA_EXITO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: ''
				}
			})

		case ELIMINAR_PREGUNTA_FALLO:
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