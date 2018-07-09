import {
	ABRIR_FORMULARIO_CREAR_PREGUNTA,

	ABRIR_FORMULARIO_EDITAR_PREGUNTA_REQUEST,
	ABRIR_FORMULARIO_EDITAR_PREGUNTA_EXITO,
	ABRIR_FORMULARIO_EDITAR_PREGUNTA_FALLO,

	CERRAR_FORMULARIO_PREGUNTA,

	LISTAR_PREGUNTAS_REQUEST,
	LISTAR_PREGUNTAS_EXITO,
	LISTAR_PREGUNTAS_FALLO,

	// Create.
	CREAR_PREGUNTA_REQUEST,
	CREAR_PREGUNTA_EXITO,
	CREAR_PREGUNTA_FALLO,


	// Editar.
	EDITAR_PREGUNTA_REQUEST,
	EDITAR_PREGUNTA_EXITO,
	EDITAR_PREGUNTA_FALLO,

	// Delete.
	ELIMINAR_PREGUNTA_REQUEST,
	ELIMINAR_PREGUNTA_EXITO,
	ELIMINAR_PREGUNTA_FALLO
} from './types'

import jwtDecode from 'jwt-decode'

import io from 'socket.io-client'
import { socket } from '../../globalActions'

import { browserHistory } from 'react-router'
import { reset } from 'redux-form'

var preguntaSocket = io.connect('http://localhost:3000/pregunta');

export function abrirFormularioCrearPregunta() {
	return (dispatch) => {
		dispatch(reset('FormularioPregunta'))

		dispatch({ type: ABRIR_FORMULARIO_CREAR_PREGUNTA })
	}
}

export function abrirFormularioEditarPregunta(idPregunta) {
	return (dispatch) => {
		dispatch({ type: ABRIR_FORMULARIO_EDITAR_PREGUNTA_REQUEST })

		preguntaSocket.emit('mostrar_pregunta', { id_pregunta: idPregunta })

		preguntaSocket.on('mostrar_pregunta', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_PREGUNTA_FALLO, payload: data.error })
			} else {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_PREGUNTA_EXITO, payload: data })
			}
		})
	}
}

export function cerrarFormularioPregunta() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_PREGUNTA })
	}
}

export function listarPreguntas() {
	return (dispatch) => {

		dispatch({ type: LISTAR_PREGUNTAS_REQUEST })

		var preguntaSocket = io('http://localhost:3000')

		preguntaSocket.on('listar_preguntas', (data) => {

			if(data.error) {
				dispatch({ type: LISTAR_PREGUNTAS_FALLO, payload: data.error })
			} else {
				dispatch({ type: LISTAR_PREGUNTAS_EXITO, payload: data })
			}
		})
	}
}

export function crearPregunta(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: CREAR_PREGUNTA_REQUEST })

		preguntaSocket.emit('crear_pregunta', datosFormulario)
		preguntaSocket.on('crear_pregunta', (data) => {
			if(data.error) {
				dispatch({ type: CREAR_PREGUNTA_FALLO, payload: data.error })
			} else {
				dispatch(reset('FormularioPregunta'))
				dispatch({ type: CREAR_PREGUNTA_EXITO, payload: data })
			}
		})
	
	}
}

export function eliminarPregunta(idPregunta) {
	return (dispatch) => {

		dispatch({ type: ELIMINAR_PREGUNTA_REQUEST })

		preguntaSocket.emit('eliminar_pregunta', { 
			id_pregunta: idPregunta,
		})

		preguntaSocket.on('eliminar_pregunta', (data) => {
			if(data.error) {
				dispatch({ type: ELIMINAR_PREGUNTA_FALLO, payload: data.error })
			} else {
				dispatch({ type: ELIMINAR_PREGUNTA_EXITO, payload: data })
			}
		})
	}
}



export function editarPregunta(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: EDITAR_PREGUNTA_REQUEST })

		preguntaSocket.emit('editar_pregunta', datosFormulario)

		preguntaSocket.on('editar_pregunta', (data) => {
			if(data.error) {
				dispatch({ type: EDITAR_PREGUNTA_FALLO, payload: data.error })
			} else {
				dispatch({ type: EDITAR_PREGUNTA_EXITO, payload: data })
			}
		})

	}
}









