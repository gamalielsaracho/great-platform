import {
	ABRIR_FORMULARIO_CREAR_FACULTAD,

	ABRIR_FORMULARIO_EDITAR_FACULTAD_REQUEST,
	ABRIR_FORMULARIO_EDITAR_FACULTAD_EXITO,
	ABRIR_FORMULARIO_EDITAR_FACULTAD_FALLO,

	CERRAR_FORMULARIO_FACULTAD,

	LISTAR_FACULTADES_REQUEST,
	LISTAR_FACULTADES_EXITO,
	LISTAR_FACULTADES_FALLO,

	// Create rol.
	CREAR_FACULTAD_REQUEST,
	CREAR_FACULTAD_EXITO,
	CREAR_FACULTAD_FALLO,

	// Show rol.
	MOSTRAR_FACULTAD_REQUEST,
	MOSTRAR_FACULTAD_EXITO,
	MOSTRAR_FACULTAD_FALLO,


	// Editar Rol.
	EDITAR_FACULTAD_REQUEST,
	EDITAR_FACULTAD_EXITO,
	EDITAR_FACULTAD_FALLO,

	// Delete Rol.
	ELIMINAR_FACULTAD_REQUEST,
	ELIMINAR_FACULTAD_EXITO,
	ELIMINAR_FACULTAD_FALLO
} from './types'

import io from 'socket.io-client'

import { browserHistory } from 'react-router'
import { reset } from 'redux-form'

import jwtDecode from 'jwt-decode'

var socketFacultad = io('http://localhost:3000')

export function abrirFormularioCrearFacultad() {
	return (dispatch) => {
		dispatch(reset('FormularioFacultad'))

		dispatch({ type: ABRIR_FORMULARIO_CREAR_FACULTAD })
	}
}

export function abrirFormularioEditarFacultad(idFacultad) {
	console.log(idFacultad)
	return (dispatch) => {
		dispatch({ type: ABRIR_FORMULARIO_EDITAR_FACULTAD_REQUEST })

		socketFacultad.emit('mostrar_facultad', { _id: idFacultad })

		socketFacultad.on('mostrar_facultad', (data) => {
			
			if(data.error) {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_FACULTAD_FALLO, payload: data.error })
			} else {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_FACULTAD_EXITO, payload: data })
			}
		})
	}
}

export function cerrarFormularioFacultad() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_FACULTAD })
	}
}

export function listarFacultades() {
	return (dispatch) => {

		dispatch({ type: LISTAR_FACULTADES_REQUEST })

		socketFacultad.emit('listar_facultades', null)

		socketFacultad.on('listar_facultades', (data) => {

			console.log('listar_facultades')
			console.log(data)

			if(data.error) {
				dispatch({ type: LISTAR_FACULTADES_FALLO, payload: data.error })
			} else {
				dispatch({ type: LISTAR_FACULTADES_EXITO, payload: data })
			}
		})
	}
}

export function crearFacultad(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: CREAR_FACULTAD_REQUEST })

		socketFacultad.emit('crear_facultad', datosFormulario)
		socketFacultad.on('crear_facultad', (data) => {
			if(data.err) {
				dispatch({ type: CREAR_FACULTAD_FALLO, payload: data.error })
			} else {
				dispatch({ type: CREAR_FACULTAD_EXITO, payload: data })
			}
		})
	
		dispatch(reset('FormularioFacultad'))
	}
}

export function eliminarFacultad(idFacultad) {
	return (dispatch) => {
		// alert(idFacultad)

		dispatch({ type: ELIMINAR_FACULTAD_REQUEST })

		// var socket = io('http://localhost:3000')

		socketFacultad.emit('eliminar_facultad', { 
			_id: idFacultad
		})

		socketFacultad.on('eliminar_facultad', (data) => {
			console.log(data)
			if(data.error) {
				dispatch({ type: ELIMINAR_FACULTAD_FALLO, payload: data.error })
			} else {
				dispatch({ type: ELIMINAR_FACULTAD_EXITO, payload: data })
			}
		})
	}
}


export function mostrarFacultad(idFacultad) {
	return (dispatch) => {
		dispatch({ type: MOSTRAR_FACULTAD_REQUEST })

		socketFacultad.emit('mostrar_facultad', { _id: idFacultad })

		socketFacultad.on('mostrar_facultad', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: MOSTRAR_FACULTAD_FALLO, payload: data.error })
			} else {
				dispatch({ type: MOSTRAR_FACULTAD_EXITO, payload: data })
			}
		})
	}
}


export function editarFacultad(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: EDITAR_FACULTAD_REQUEST })

		socketFacultad.emit('editar_facultad', datosFormulario)

		socketFacultad.on('editar_facultad', (data) => {
			if(data.error) {
				dispatch({ type: EDITAR_FACULTAD_FALLO, payload: data.error })
			} else {
				dispatch({ type: EDITAR_FACULTAD_EXITO, payload: data })
			}
		})

	}
}









