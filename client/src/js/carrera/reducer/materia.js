import {
	ABRIR_FORMULARIO_CREAR_MATERIA_CARRERA,

	CERRAR_FORMULARIO_MATERIA_CARRERA,

	CREAR_MATERIA_CARRERA_REQUEST,
	CREAR_MATERIA_CARRERA_EXITO,
	CREAR_MATERIA_CARRERA_FALLO,

	ABRIR_FORMULARIO_EDITAR_MATERIA_CARRERA_REQUEST,
	ABRIR_FORMULARIO_EDITAR_MATERIA_CARRERA_EXITO,
	ABRIR_FORMULARIO_EDITAR_MATERIA_CARRERA_FALLO,

	EDITAR_MATERIA_CARRERA_REQUEST,
	EDITAR_MATERIA_CARRERA_EXITO,
	EDITAR_MATERIA_CARRERA_FALLO,

	ELIMINAR_MATERIA_CARRERA_REQUEST,
	ELIMINAR_MATERIA_CARRERA_EXITO,
	ELIMINAR_MATERIA_CARRERA_FALLO
} from '../actions/materiaTypes'



export default function (INITIAL_STATE, action) {
	var state = INITIAL_STATE

	switch(action.type) {
		case ABRIR_FORMULARIO_CREAR_MATERIA_CARRERA:
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

		case ABRIR_FORMULARIO_EDITAR_MATERIA_CARRERA_REQUEST:
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

		case ABRIR_FORMULARIO_EDITAR_MATERIA_CARRERA_EXITO:
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

		case ABRIR_FORMULARIO_EDITAR_MATERIA_CARRERA_FALLO:
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


		case CERRAR_FORMULARIO_MATERIA_CARRERA:
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


		case CREAR_MATERIA_CARRERA_REQUEST:
			return state = Object.assign({}, state, {
				crear: { cargando: true }
			})

		case CREAR_MATERIA_CARRERA_EXITO:
			return Object.assign({}, state, {
				crear: { 
					mensaje: action.payload.mensaje,
				},
				formulario: { abirtoCrear: false }
			})


		case CREAR_MATERIA_CARRERA_FALLO:
			return state = Object.assign({}, state, {
				crear: { error: action.payload }
			})


		case EDITAR_MATERIA_CARRERA_REQUEST:
			return Object.assign({}, state, {
				editar: { cargando: true }
			})

		case EDITAR_MATERIA_CARRERA_EXITO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false, 
					mensaje: action.payload.mensaje
				},
				formulario: { abirtoEditar: false }
			})

		case EDITAR_MATERIA_CARRERA_FALLO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false,
					mensaje: '', 
					error: action.payload
				}
			})
		


		case ELIMINAR_MATERIA_CARRERA_REQUEST:
			return Object.assign({}, state, {
				eliminar: { cargando: true }
			})

		case ELIMINAR_MATERIA_CARRERA_EXITO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: ''
				}
			})

		case ELIMINAR_MATERIA_CARRERA_FALLO:
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