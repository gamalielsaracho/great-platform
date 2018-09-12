import {
	ABRIR_FORMULARIO_CREAR_CARRERA,

	ABRIR_FORMULARIO_EDITAR_CARRERA_REQUEST,
	ABRIR_FORMULARIO_EDITAR_CARRERA_EXITO,
	ABRIR_FORMULARIO_EDITAR_CARRERA_FALLO,

	CERRAR_FORMULARIO_CARRERA,

	LISTAR_CARRERAS_REQUEST,
	LISTAR_CARRERAS_EXITO,
	LISTAR_CARRERAS_FALLO,

	CREAR_CARRERA_REQUEST,
	CREAR_CARRERA_EXITO,
	CREAR_CARRERA_FALLO,

	MOSTRAR_CARRERA_REQUEST,
	MOSTRAR_CARRERA_EXITO,
	MOSTRAR_CARRERA_FALLO,


	EDITAR_CARRERA_REQUEST,
	EDITAR_CARRERA_EXITO,
	EDITAR_CARRERA_FALLO,

	ELIMINAR_CARRERA_REQUEST,
	ELIMINAR_CARRERA_EXITO,
	ELIMINAR_CARRERA_FALLO
} from './types'

import io from 'socket.io-client'

import { browserHistory } from 'react-router'
import { reset } from 'redux-form'

import jwtDecode from 'jwt-decode'

var socketCarrera = io('http://localhost:3000')

export function abrirFormularioCrearCarrera() {
	return (dispatch) => {
		dispatch(reset('FormularioCarrera'))

		dispatch({ type: ABRIR_FORMULARIO_CREAR_CARRERA })
	}
}

export function abrirFormularioEditarCarrera(idCarrera) {
	console.log(idCarrera)
	return (dispatch) => {
		dispatch({ type: ABRIR_FORMULARIO_EDITAR_CARRERA_REQUEST })

		socketCarrera.emit('mostrar_carrera', { _id: idCarrera })

		socketCarrera.on('mostrar_carrera', (data) => {
			
			if(data.error) {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_CARRERA_FALLO, payload: data.error })
			} else {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_CARRERA_EXITO, payload: data })
			}
		})
	}
}

export function cerrarFormularioCarrera() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_CARRERA })
	}
}


export function listarCarreras() {
	return (dispatch) => {

		dispatch({ type: LISTAR_CARRERAS_REQUEST })

		socketCarrera.emit('listar_carreras', null)

		socketCarrera.on('listar_carreras', (data) => {
			if(data.error) {
				dispatch({ type: LISTAR_CARRERAS_FALLO, payload: data.error })
			} else {
				dispatch({ type: LISTAR_CARRERAS_EXITO, payload: data })
			}
		})
	}
}


export function listarCarrerasPorIdFacultad(idFacultad) {
	return (dispatch) => {

		dispatch({ type: LISTAR_CARRERAS_REQUEST })


		socketCarrera.emit('listar_carreras_porIdFacultad', {
			idFacultad: idFacultad
		})

		socketCarrera.on('listar_carreras_porIdFacultad', (data) => {
			if(data.error) {
				dispatch({ type: LISTAR_CARRERAS_FALLO, payload: data.error })
			} else {
				dispatch({ type: LISTAR_CARRERAS_EXITO, payload: data })
			}
		})
	}
}


export function crearCarrera(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: CREAR_CARRERA_REQUEST })

		socketCarrera.emit('crear_carrera', datosFormulario)
		socketCarrera.on('crear_carrera', (data) => {
			if(data.err) {
				dispatch({ type: CREAR_CARRERA_FALLO, payload: data.error })
			} else {
				dispatch({ type: CREAR_CARRERA_EXITO, payload: data })
			}
		})
	
		dispatch(reset('FormularioCarrera'))
	}
}

export function eliminarCarrera(idCarrera, idFacultad) {
	return (dispatch) => {

		dispatch({ type: ELIMINAR_CARRERA_REQUEST })

		socketCarrera.emit('eliminar_carrera', { 
			_id: idCarrera,
			idFacultad: idFacultad
		})

		socketCarrera.on('eliminar_carrera', (data) => {
			console.log(data)
			if(data.error) {
				dispatch({ type: ELIMINAR_CARRERA_FALLO, payload: data.error })
			} else {
				dispatch({ type: ELIMINAR_CARRERA_EXITO, payload: data })
			}
		})
	}
}


export function mostrarCarrera(idCarrera) {
	return (dispatch) => {
		dispatch({ type: MOSTRAR_CARRERA_REQUEST })

		socketCarrera.emit('mostrar_carrera', { _id: idCarrera })

		socketCarrera.on('mostrar_carrera', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: MOSTRAR_CARRERA_FALLO, payload: data.error })
			} else {
				dispatch({ type: MOSTRAR_CARRERA_EXITO, payload: data })
			}
		})
	}
}


export function editarCarrera(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: EDITAR_CARRERA_REQUEST })

		socketCarrera.emit('editar_carrera', datosFormulario)

		socketCarrera.on('editar_carrera', (data) => {
			if(data.error) {
				dispatch({ type: EDITAR_CARRERA_FALLO, payload: data.error })
			} else {
				dispatch({ type: EDITAR_CARRERA_EXITO, payload: data })
			}
		})

	}
}









