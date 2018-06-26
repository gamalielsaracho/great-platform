import {
	ABRIR_FORMULARIO_CREAR_CALIFICACION,

	ABRIR_FORMULARIO_EDITAR_CALIFICACION_REQUEST,
	ABRIR_FORMULARIO_EDITAR_CALIFICACION_EXITO,
	ABRIR_FORMULARIO_EDITAR_CALIFICACION_FALLO,

	CERRAR_FORMULARIO_CALIFICACION,

	LISTAR_CALIFICACIONES_REQUEST,
	LISTAR_CALIFICACIONES_EXITO,
	LISTAR_CALIFICACIONES_FALLO,

	// Create rol.
	CREAR_CALIFICACION_REQUEST,
	CREAR_CALIFICACION_EXITO,
	CREAR_CALIFICACION_FALLO,

	// Show rol.
	MOSTRAR_CALIFICACION_REQUEST,
	MOSTRAR_CALIFICACION_EXITO,
	MOSTRAR_CALIFICACION_FALLO,

	CERRAR_MODAL_MOSTRAR_CALIFICACION,

	// Editar Rol.
	EDITAR_CALIFICACION_REQUEST,
	EDITAR_CALIFICACION_EXITO,
	EDITAR_CALIFICACION_FALLO,

	// Delete Rol.
	ELIMINAR_CALIFICACION_REQUEST,
	ELIMINAR_CALIFICACION_EXITO,
	ELIMINAR_CALIFICACION_FALLO
} from './types'

import jwtDecode from 'jwt-decode'

import io from 'socket.io-client'

import { browserHistory } from 'react-router'
import { reset } from 'redux-form'

var calificacionSocket = io.connect('http://localhost:3000');

export function abrirFormularioCrearCalificacion() {
	return (dispatch) => {
		dispatch(reset('FormularioCalificacion'))

		dispatch({ type: ABRIR_FORMULARIO_CREAR_CALIFICACION })
	}
}

export function abrirFormularioEditarCalificacion(idCalificacion) {
	return (dispatch) => {
		dispatch({ type: ABRIR_FORMULARIO_EDITAR_CALIFICACION_REQUEST })

		calificacionSocket.emit('mostrar_calificacion', { _id: idCalificacion })

		calificacionSocket.on('mostrar_calificacion', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_CALIFICACION_FALLO, payload: data.error })
			} else {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_CALIFICACION_EXITO, payload: data })
			}
		})
	}
}

export function cerrarFormularioCalificacion() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_CALIFICACION })
	}
}

export function listarCalificaciones() {
	return (dispatch) => {

		dispatch({ type: LISTAR_CALIFICACIONES_REQUEST })

		calificacionSocket.emit('listar_calificaciones', null)

		calificacionSocket.on('listar_calificaciones', (data) => {
			console.log(data)
			if(data.error) {
				dispatch({ type: LISTAR_CALIFICACIONES_FALLO, payload: data.error })
			} else {
				dispatch({ type: LISTAR_CALIFICACIONES_EXITO, payload: data })
			}
		})
	}
}

export function crearCalificacion(datosFormulario, idPersonal) {
	return (dispatch) => {

	var usuarioSocket = io.connect('http://localhost:3000');

		// console.log('datosFormulario')
		// console.log(datosFormulario)

		dispatch({ type: CREAR_CALIFICACION_REQUEST })

		let datos = {
			_id: idPersonal,
			datosCli: datosFormulario 
		}

		usuarioSocket.emit('agregar_calificacion_usuario', datos)

		usuarioSocket.on('agregar_calificacion_usuario', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: CREAR_CALIFICACION_FALLO, payload: data.error })
			} else {
				dispatch({ type: CREAR_CALIFICACION_EXITO, payload: data })
				dispatch(reset('FormularioCalificacion'))
			}
		})
	
	}
}

export function eliminarCalificacion(idCalificacion) {
	return (dispatch) => {
		// alert(idCalificacion)

		dispatch({ type: ELIMINAR_CALIFICACION_REQUEST })

		calificacionSocket.emit('eliminar_calificacion', { 
			_id: idCalificacion
		})

		calificacionSocket.on('eliminar_calificacion', (data) => {
			console.log(data)
			if(data.error) {
				dispatch({ type: ELIMINAR_CALIFICACION_FALLO, payload: data.error })
			} else {
				dispatch({ type: ELIMINAR_CALIFICACION_EXITO, payload: data })
			}
		})
	}
}


export function mostrarCalificacion(idCalificacion) {
	return (dispatch) => {
		dispatch({ type: MOSTRAR_CALIFICACION_REQUEST })

		calificacionSocket.emit('mostrar_calificacion', { _id: idCalificacion })

		calificacionSocket.on('mostrar_calificacion', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: MOSTRAR_CALIFICACION_FALLO, payload: data.error })
			} else {
				dispatch({ type: MOSTRAR_CALIFICACION_EXITO, payload: data })
			}
		})
	}
}


export function cerrarModalMostrarCalificacion() {
	return (dispatch) => {
		dispatch({ type: CERRAR_MODAL_MOSTRAR_CALIFICACION })
	}
}

export function editarCalificacion(datosFormulario, idPersonal) {
	return (dispatch) => {
		dispatch({ type: EDITAR_CALIFICACION_REQUEST })

		// var usuarioSocket = io.connect('http://localhost:3000/usuario');

		let datos = {
			_id: idPersonal,
			datosCli: datosFormulario 
		}

		calificacionSocket.emit('editar_calificacion', datos)

		calificacionSocket.on('editar_calificacion', (data) => {
			if(data.error) {
				dispatch({ type: EDITAR_CALIFICACION_FALLO, payload: data.error })
			} else {
				dispatch({ type: EDITAR_CALIFICACION_EXITO, payload: data })
			}
		})

	}
}









