import {
	ABRIR_FORMULARIO_CREAR_ROL,

	ABRIR_FORMULARIO_EDITAR_ROL_REQUEST,
	ABRIR_FORMULARIO_EDITAR_ROL_EXITO,
	ABRIR_FORMULARIO_EDITAR_ROL_FALLO,

	CERRAR_FORMULARIO_ROL,

	LISTAR_ROLES_REQUEST,
	LISTAR_ROLES_EXITO,
	LISTAR_ROLES_FALLO,

	CREAR_ROL_REQUEST,
	CREAR_ROL_EXITO,
	CREAR_ROL_FALLO,

	EDITAR_ROL_REQUEST,
	EDITAR_ROL_EXITO,
	EDITAR_ROL_FALLO,

	ELIMINAR_ROL_REQUEST,
	ELIMINAR_ROL_EXITO,
	ELIMINAR_ROL_FALLO
} from './types'

import io from 'socket.io-client'

import { browserHistory } from 'react-router'
import { reset } from 'redux-form'

import jwtDecode from 'jwt-decode'

var socketRol = io('http://localhost:3000')

export function abrirFormularioCrearRol() {
	return (dispatch) => {
		dispatch(reset('FormularioRol'))

		dispatch({ type: ABRIR_FORMULARIO_CREAR_ROL })
	}
}


export function abrirFormularioEditarRol(idRol) {
	return (dispatch) => {
		dispatch({ type: ABRIR_FORMULARIO_EDITAR_ROL_REQUEST })

		socketRol.emit('mostrar_rol', { _id: idRol })

		socketRol.on('mostrar_rol', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_ROL_FALLO, payload: data.error })
			} else {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_ROL_EXITO, payload: data })
			}
		})
	}
}

export function cerrarFormularioRol() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_ROL })
	}
}

export function listarRoles() {
	return (dispatch) => {

		dispatch({ type: LISTAR_ROLES_REQUEST })

		socketRol.emit('listar_roles', null)

		socketRol.on('listar_roles', (data) => {
			if(data.error) {
				dispatch({ type: LISTAR_ROLES_FALLO, payload: data.error })
			} else {
				dispatch({ type: LISTAR_ROLES_EXITO, payload: data })
			}
		})
	}
}

export function crearRol(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: CREAR_ROL_REQUEST })

		socketRol.emit('crear_rol', datosFormulario)
		socketRol.on('crear_rol', (data) => {
			if(data.err) {
				dispatch({ type: CREAR_ROL_FALLO, payload: data.error })
			} else {
				dispatch({ type: CREAR_ROL_EXITO, payload: data })
			}
		})
	
		dispatch(reset('FormularioRol'))
	}
}

export function eliminarRol(idRol) {
	return (dispatch) => {

		dispatch({ type: ELIMINAR_ROL_REQUEST })

		socketRol.emit('eliminar_rol', { 
			_id: idRol
		})

		socketRol.on('eliminar_rol', (data) => {
			console.log(data)
			if(data.error) {
				dispatch({ type: ELIMINAR_ROL_FALLO, payload: data.error })
			} else {
				dispatch({ type: ELIMINAR_ROL_EXITO, payload: data })
			}
		})
	}
}


export function editarRol(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: EDITAR_ROL_REQUEST })

		socketRol.emit('editar_rol', datosFormulario)

		socketRol.on('editar_rol', (data) => {
			if(data.error) {
				dispatch({ type: EDITAR_ROL_FALLO, payload: data.error })
			} else {
				dispatch({ type: EDITAR_ROL_EXITO, payload: data })
			}
		})

	}
}









