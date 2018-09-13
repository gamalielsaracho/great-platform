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
} from './materiaTypes'

import io from 'socket.io-client'

import { browserHistory } from 'react-router'
import { reset } from 'redux-form'

import jwtDecode from 'jwt-decode'

var socketCarrera = io('http://localhost:3000')

export function abrirFormularioCrearMateriaCarrera() {
	return (dispatch) => {
		dispatch(reset('FormularioMateriaCarrera'))

		dispatch({ type: ABRIR_FORMULARIO_CREAR_MATERIA_CARRERA })
	}
}

export function abrirFormularioEditarMateriaCarrera(idMateria, idCarrera) {
	// console.log(idMateria)
	return (dispatch) => {
		dispatch({ type: ABRIR_FORMULARIO_EDITAR_MATERIA_CARRERA_REQUEST })

		socketCarrera.emit('mostrar_materia_carrera_editar', { 
			_id: idMateria,
			idCarrera: idCarrera
		})

		socketCarrera.on('mostrar_materia_carrera_editar', (data) => {
			
			if(data.error) {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_MATERIA_CARRERA_FALLO, payload: data.error })
			} else {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_MATERIA_CARRERA_EXITO, payload: data })
			}
		})
	}
}

export function cerrarFormularioMateriaCarrera() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_MATERIA_CARRERA })
	}
}


export function crearMateriaCarrera(datosFormulario, idCarrera) {
	return (dispatch) => {

		dispatch({ type: CREAR_MATERIA_CARRERA_REQUEST })

		let datos = {
			idCarrera: idCarrera,
			datosCli: datosFormulario 
		}

		// console.log(datos)
		socketCarrera.emit('crear_materia_carrera', datos)
		socketCarrera.on('crear_materia_carrera', (data) => {
			if(data.err) {
				dispatch({ type: CREAR_MATERIA_CARRERA_FALLO, payload: data.error })
			} else {
				dispatch({ type: CREAR_MATERIA_CARRERA_EXITO, payload: data })
			}
		})
	
		dispatch(reset('FormularioMateriaCarrera'))
	}
}

export function eliminarMateriaCarrera(idMateria, idCarrera) {
	return (dispatch) => {

		dispatch({ type: ELIMINAR_MATERIA_CARRERA_REQUEST })

		socketCarrera.emit('eliminar_materia_carrera', { 
			_id: idMateria,
			idCarrera: idCarrera
		})

		socketCarrera.on('eliminar_materia_carrera', (data) => {
			console.log(data)
			if(data.error) {
				dispatch({ type: ELIMINAR_MATERIA_CARRERA_FALLO, payload: data.error })
			} else {
				dispatch({ type: ELIMINAR_MATERIA_CARRERA_EXITO, payload: data })
			}
		})
	}
}


export function editarMateriaCarrera(datosFormulario, idCarrera) {
	return (dispatch) => {

		dispatch({ type: EDITAR_MATERIA_CARRERA_REQUEST })

		let datos = {
			idCarrera: idCarrera,
			datosCli: datosFormulario 
		}

		socketCarrera.emit('editar_materia_carrera', datos)

		socketCarrera.on('editar_materia_carrera', (data) => {
			if(data.error) {
				dispatch({ type: EDITAR_MATERIA_CARRERA_FALLO, payload: data.error })
			} else {
				dispatch({ type: EDITAR_MATERIA_CARRERA_EXITO, payload: data })
			}
		})

	}
}