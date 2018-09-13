import {
	CERRAR_FORMULARIO_CARRERA,

	ABRIR_FORMULARIO_CREAR_CARRERA,


	ABRIR_FORMULARIO_EDITAR_CARRERA_REQUEST,
	ABRIR_FORMULARIO_EDITAR_CARRERA_EXITO,
	ABRIR_FORMULARIO_EDITAR_CARRERA_FALLO
} from '../actions/types'


export default function (INITIAL_STATE, action) {
	var state = INITIAL_STATE

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

		default: 
			return state
	}

}