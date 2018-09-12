import {
	ABRIR_FORMULARIO_CREAR_MATERIA,

	ABRIR_FORMULARIO_EDITAR_MATERIA_REQUEST,
	ABRIR_FORMULARIO_EDITAR_MATERIA_EXITO,
	ABRIR_FORMULARIO_EDITAR_MATERIA_FALLO,

	CERRAR_FORMULARIO_MATERIA,

	LISTAR_MATERIAS_REQUEST,
	LISTAR_MATERIAS_EXITO,
	LISTAR_MATERIAS_FALLO,

	CREAR_MATERIA_REQUEST,
	CREAR_MATERIA_EXITO,
	CREAR_MATERIA_FALLO,

	MOSTRAR_MATERIA_REQUEST,
	MOSTRAR_MATERIA_EXITO,
	MOSTRAR_MATERIA_FALLO,

	EDITAR_MATERIA_REQUEST,
	EDITAR_MATERIA_EXITO,
	EDITAR_MATERIA_FALLO,

	ELIMINAR_MATERIA_REQUEST,
	ELIMINAR_MATERIA_EXITO,
	ELIMINAR_MATERIA_FALLO
} from './types'

import io from 'socket.io-client'

import { browserHistory } from 'react-router'
import { reset } from 'redux-form'

import jwtDecode from 'jwt-decode'

var socketMateria = io('http://localhost:3000')

export function abrirFormularioCrearMateria() {
	return (dispatch) => {
		dispatch(reset('FormularioMateria'))

		dispatch({ type: ABRIR_FORMULARIO_CREAR_MATERIA })
	}
}

export function abrirFormularioEditarMateria(idMateria) {
	console.log(idMateria)
	return (dispatch) => {
		dispatch({ type: ABRIR_FORMULARIO_EDITAR_MATERIA_REQUEST })

		socketMateria.emit('mostrar_materia', { _id: idMateria })

		socketMateria.on('mostrar_materia', (data) => {
			console.log("DATA"+data)
			
			if(data.error) {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_MATERIA_FALLO, payload: data.error })
			} else {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_MATERIA_EXITO, payload: data })
			}
		})
	}
}

export function cerrarFormularioMateria() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_MATERIA })
	}
}

export function listarMaterias() {
	return (dispatch) => {

		dispatch({ type: LISTAR_MATERIAS_REQUEST })

		// var socket = io('http://localhost:3000')
		socketMateria.emit('listar_materias', null)


		socketMateria.on('listar_materias', (data) => {

			if(data.error) {
				dispatch({ type: LISTAR_MATERIAS_FALLO, payload: data.error })
			} else {
				dispatch({ type: LISTAR_MATERIAS_EXITO, payload: data })
			}
		})
	}
}

export function crearMateria(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: CREAR_MATERIA_REQUEST })

		socketMateria.emit('crear_materia', datosFormulario)
		socketMateria.on('crear_materia', (data) => {
			if(data.err) {
				dispatch({ type: CREAR_MATERIA_FALLO, payload: data.error })
			} else {
				dispatch({ type: CREAR_MATERIA_EXITO, payload: data })
			}
		})
	
		dispatch(reset('FormularioMateria'))
	}
}

export function eliminarMateria(idMateria) {
	return (dispatch) => {
		// alert(idMateria)

		dispatch({ type: ELIMINAR_MATERIA_REQUEST })

		// var socket = io('http://localhost:3000')

		socketMateria.emit('eliminar_materia', { 
			_id: idMateria
		})

		socketMateria.on('eliminar_materia', (data) => {
			console.log(data)
			if(data.error) {
				dispatch({ type: ELIMINAR_MATERIA_FALLO, payload: data.error })
			} else {
				dispatch({ type: ELIMINAR_MATERIA_EXITO, payload: data })
			}
		})
	}
}


export function mostrarMateria(idMateria) {
	return (dispatch) => {
		dispatch({ type: MOSTRAR_MATERIA_REQUEST })

		socketMateria.emit('mostrar_materia', { _id: idMateria })

		socketMateria.on('mostrar_materia', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: MOSTRAR_MATERIA_FALLO, payload: data.error })
			} else {
				dispatch({ type: MOSTRAR_MATERIA_EXITO, payload: data })
			}
		})
	}
}


export function editarMateria(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: EDITAR_MATERIA_REQUEST })

		socketMateria.emit('editar_materia', datosFormulario)

		socketMateria.on('editar_materia', (data) => {
			if(data.error) {
				dispatch({ type: EDITAR_MATERIA_FALLO, payload: data.error })
			} else {
				dispatch({ type: EDITAR_MATERIA_EXITO, payload: data })
			}
		})

	}
}









