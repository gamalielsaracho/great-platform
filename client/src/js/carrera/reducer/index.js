import {
	CERRAR_FORMULARIO_CARRERA,

	LISTAR_CARRERAS_REQUEST,
	LISTAR_CARRERAS_EXITO,
	LISTAR_CARRERAS_FALLO,

	ABRIR_FORMULARIO_CREAR_CARRERA,

	CREAR_CARRERA_REQUEST,
	CREAR_CARRERA_EXITO,
	CREAR_CARRERA_FALLO,

	MOSTRAR_CARRERA_REQUEST,
	MOSTRAR_CARRERA_EXITO,
	MOSTRAR_CARRERA_FALLO,

	ABRIR_FORMULARIO_EDITAR_CARRERA_REQUEST,
	ABRIR_FORMULARIO_EDITAR_CARRERA_EXITO,
	ABRIR_FORMULARIO_EDITAR_CARRERA_FALLO,

	EDITAR_CARRERA_REQUEST,
	EDITAR_CARRERA_EXITO,
	EDITAR_CARRERA_FALLO,

	ELIMINAR_CARRERA_REQUEST,
	ELIMINAR_CARRERA_EXITO,
	ELIMINAR_CARRERA_FALLO
} from '../actions/types'

const INITIAL_STATE = {
	formulario: {
		abirtoCrear: false,
		abirtoEditar: false,
		iniciarValores: false,
		error: '',
		cargando: false,
		carrera: null
	},
	crear: { mensaje: '', cargando: false, error:'' },
	listar: { carreras: null, cargando: false, error: '' },
	eliminar: { cargando: false, mensaje: '', error: '' },
	mostrar: { cargando: false, carrera: null, error: '' },
	editar: { cargando: false, mensaje: '', error: '' }
}


export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
		case ABRIR_FORMULARIO_CREAR_CARRERA:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: true,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					carrera: null
				},
				mostrar: INITIAL_STATE.mostrar,
				eliminar: INITIAL_STATE.eliminar
			})

		case ABRIR_FORMULARIO_EDITAR_CARRERA_REQUEST:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: true,
					carrera: null
				},
				mostrar: INITIAL_STATE.mostrar,
				eliminar: INITIAL_STATE.eliminar
			})

		case ABRIR_FORMULARIO_EDITAR_CARRERA_EXITO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: false,
					carrera: action.payload
				},
				mostrar: INITIAL_STATE.mostrar
			})

		case ABRIR_FORMULARIO_EDITAR_CARRERA_FALLO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: action.payload,
					cargando: false,
					carrera: null
				},
				mostrar: INITIAL_STATE.mostrar
			})


		case CERRAR_FORMULARIO_CARRERA:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					carrera: null
				}
			})

		case CREAR_CARRERA_REQUEST:
			return state = Object.assign({}, state, {
				crear: { cargando: true }
			})

		case CREAR_CARRERA_EXITO:
			return Object.assign({}, state, {
				crear: { 
					mensaje: action.payload.mensaje,
				},
				formulario: { abirtoCrear: false }
			})


		case CREAR_CARRERA_FALLO:
			return state = Object.assign({}, state, {
				crear: { error: action.payload }
			})


		case LISTAR_CARRERAS_REQUEST:
			return Object.assign({}, state, {
				listar: { cargando: true, error: '' },
				eliminar: INITIAL_STATE.eliminar,
				formulario: INITIAL_STATE.formulario
			})

		case LISTAR_CARRERAS_EXITO:
			return Object.assign({}, state, {
				listar: { carreras: action.payload.carreras, cargando: false, error: '' }
			})


		case LISTAR_CARRERAS_FALLO:
			return Object.assign({}, state, {
				listar: { error: action.payload, carreras: null, cargando: false }
			})



		case MOSTRAR_CARRERA_REQUEST:
			return Object.assign({}, state, {
				mostrar: { cargando: true },
				formulario: { abirtoEditar: false, abirtoCrear: false },
				eliminar: INITIAL_STATE.eliminar
			})

		case MOSTRAR_CARRERA_EXITO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					carrera: action.payload
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_CARRERA_FALLO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					carrera: null,
					error: action.payload
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})



		case EDITAR_CARRERA_REQUEST:
			return Object.assign({}, state, {
				editar: { cargando: true }
			})

		case EDITAR_CARRERA_EXITO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false, 
					mensaje: action.payload.mensaje
				},
				formulario: { abirtoEditar: false }
			})

		case EDITAR_CARRERA_FALLO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false,
					mensaje: '', 
					error: action.payload
				}
			})
		


		case ELIMINAR_CARRERA_REQUEST:
			return Object.assign({}, state, {
				eliminar: { cargando: true }
			})

		case ELIMINAR_CARRERA_EXITO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: ''
				}
			})

		case ELIMINAR_CARRERA_FALLO:
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