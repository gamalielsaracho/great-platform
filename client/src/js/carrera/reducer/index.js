import {
	CERRAR_FORMULARIO_FACULTAD,

	LISTAR_FACULTADES_REQUEST,
	LISTAR_FACULTADES_EXITO,
	LISTAR_FACULTADES_FALLO,

	ABRIR_FORMULARIO_CREAR_FACULTAD,

	CREAR_FACULTAD_REQUEST,
	CREAR_FACULTAD_EXITO,
	CREAR_FACULTAD_FALLO,

	MOSTRAR_FACULTAD_REQUEST,
	MOSTRAR_FACULTAD_EXITO,
	MOSTRAR_FACULTAD_FALLO,

	ABRIR_FORMULARIO_EDITAR_FACULTAD_REQUEST,
	ABRIR_FORMULARIO_EDITAR_FACULTAD_EXITO,
	ABRIR_FORMULARIO_EDITAR_FACULTAD_FALLO,

	EDITAR_FACULTAD_REQUEST,
	EDITAR_FACULTAD_EXITO,
	EDITAR_FACULTAD_FALLO,

	ELIMINAR_FACULTAD_REQUEST,
	ELIMINAR_FACULTAD_EXITO,
	ELIMINAR_FACULTAD_FALLO
} from '../actions/types'

const INITIAL_STATE = {
	formulario: {
		abirtoCrear: false,
		abirtoEditar: false,
		iniciarValores: false,
		error: '',
		cargando: false,
		facultad: {}
	},
	crear: { mensaje: '', cargando: false, error:'' },
	listar: { facultades:[], cargando: false, error: '' },
	eliminar: { cargando: false, mensaje: '', error: '' },
	mostrar: { cargando: false, facultad: {}, error: '', abierto: false },
	editar: { cargando: false, mensaje: '', error: '' }
}


export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
		case ABRIR_FORMULARIO_CREAR_FACULTAD:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: true,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					facultad: {}
				},
				mostrar: { abierto: false },
				eliminar: INITIAL_STATE.eliminar
			})

		case ABRIR_FORMULARIO_EDITAR_FACULTAD_REQUEST:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: true,
					facultad: {}
				},
				mostrar: { abierto: false },
				eliminar: INITIAL_STATE.eliminar
			})

		case ABRIR_FORMULARIO_EDITAR_FACULTAD_EXITO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: false,
					facultad: action.payload
				},
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_FACULTAD_FALLO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: action.payload,
					cargando: false,
					facultad: {}
				},
				mostrar: { abierto: false }
			})


		case CERRAR_FORMULARIO_FACULTAD:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					facultad: {}
				}
			})

		case CREAR_FACULTAD_REQUEST:
			return state = Object.assign({}, state, {
				crear: { cargando: true }
			})

		case CREAR_FACULTAD_EXITO:
			return Object.assign({}, state, {
				crear: { 
					mensaje: action.payload.mensaje,
				},
				formulario: { abirtoCrear: false }
			})


		case CREAR_FACULTAD_FALLO:
			return state = Object.assign({}, state, {
				crear: { error: action.payload }
			})


		case LISTAR_FACULTADES_REQUEST:
			return Object.assign({}, state, {
				listar: { cargando: true, error: '' },
				eliminar: INITIAL_STATE.eliminar
			})

		case LISTAR_FACULTADES_EXITO:
			return Object.assign({}, state, {
				listar: { facultades: action.payload.facultades, cargando: false, error: '' }
			})


		case LISTAR_FACULTADES_FALLO:
			return Object.assign({}, state, {
				listar: { error: action.payload, facultades:[], cargando: false }
			})


		case MOSTRAR_FACULTAD_REQUEST:
			return Object.assign({}, state, {
				mostrar: { cargando: true, abierto: true },
				formulario: { abirtoEditar: false, abirtoCrear: false },
				eliminar: INITIAL_STATE.eliminar
			})

		case MOSTRAR_FACULTAD_EXITO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					facultad: action.payload,
					abierto: true
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_FACULTAD_FALLO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					facultad: {},
					error: action.payload,
					abierto: true
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})



		case EDITAR_FACULTAD_REQUEST:
			return Object.assign({}, state, {
				editar: { cargando: true }
			})

		case EDITAR_FACULTAD_EXITO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false, 
					mensaje: action.payload.mensaje
				},
				formulario: { abirtoEditar: false }
			})

		case EDITAR_FACULTAD_FALLO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false,
					mensaje: '', 
					error: action.payload
				}
			})
		


		case ELIMINAR_FACULTAD_REQUEST:
			return Object.assign({}, state, {
				eliminar: { cargando: true }
			})

		case ELIMINAR_FACULTAD_EXITO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: ''
				}
			})

		case ELIMINAR_FACULTAD_FALLO:
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