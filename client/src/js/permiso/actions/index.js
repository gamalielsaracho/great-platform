import {
	ABRIR_FORMULARIO_CREAR_PERMISO,

	ABRIR_FORMULARIO_EDITAR_PERMISO_REQUEST,
	ABRIR_FORMULARIO_EDITAR_PERMISO_EXITO,
	ABRIR_FORMULARIO_EDITAR_PERMISO_FALLO,

	CERRAR_FORMULARIO_PERMISO,

	LISTAR_PERMISOS_REQUEST,
	LISTAR_PERMISOS_EXITO,
	LISTAR_PERMISOS_FALLO,

	CREAR_PERMISO_REQUEST,
	CREAR_PERMISO_EXITO,
	CREAR_PERMISO_FALLO,

	MOSTRAR_PERMISO_REQUEST,
	MOSTRAR_PERMISO_EXITO,
	MOSTRAR_PERMISO_FALLO,

	EDITAR_PERMISO_REQUEST,
	EDITAR_PERMISO_EXITO,
	EDITAR_PERMISO_FALLO,

	ELIMINAR_PERMISO_REQUEST,
	ELIMINAR_PERMISO_EXITO,
	ELIMINAR_PERMISO_FALLO
} from './types'

import io from 'socket.io-client'

import { browserHistory } from 'react-router'
import { reset } from 'redux-form'

import jwtDecode from 'jwt-decode'

var socketPermiso = io('http://localhost:3000')

export function abrirFormularioCrearPermiso() {
	return (dispatch) => {
		dispatch(reset('FormularioPermiso'))

		dispatch({ type: ABRIR_FORMULARIO_CREAR_PERMISO })
	}
}

export function abrirFormularioEditarPermiso(idPermiso) {

	return (dispatch) => {
		dispatch({ type: ABRIR_FORMULARIO_EDITAR_PERMISO_REQUEST })

		socketPermiso.emit('mostrar_permiso_editar', { _id: idPermiso })

		socketPermiso.on('mostrar_permiso_editar', (data) => {
			
			if(data.error) {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_PERMISO_FALLO, payload: data.error })
			} else {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_PERMISO_EXITO, payload: data })
			}
		})
	}
}

export function cerrarFormularioPermiso() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_PERMISO })
	}
}

export function listarPermisos() {
	return (dispatch) => {

		dispatch({ type: LISTAR_PERMISOS_REQUEST })

		socketPermiso.emit('listar_permisos', null)

		socketPermiso.on('listar_permisos', (data) => {

			console.log('listar_permisos')
			console.log(data)

			if(data.error) {
				dispatch({ type: LISTAR_PERMISOS_FALLO, payload: data.error })
			} else {
				dispatch({ type: LISTAR_PERMISOS_EXITO, payload: data })
			}
		})
	}
}

export function crearPermiso(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: CREAR_PERMISO_REQUEST })

		socketPermiso.emit('crear_permiso', datosFormulario)

		socketPermiso.on('crear_permiso', (data) => {
			if(data.err) {
				dispatch({ type: CREAR_PERMISO_FALLO, payload: data.error })
			} else {
				dispatch({ type: CREAR_PERMISO_EXITO, payload: data })
			}
		})
	
		dispatch(reset('FormularioPermiso'))
	}
}

export function eliminarPermiso(idPermiso) {
	return (dispatch) => {

		dispatch({ type: ELIMINAR_PERMISO_REQUEST })

		socketPermiso.emit('eliminar_permiso', { 
			_id: idPermiso
		})

		socketPermiso.on('eliminar_permiso', (data) => {
			console.log(data)
			if(data.error) {
				dispatch({ type: ELIMINAR_PERMISO_FALLO, payload: data.error })
			} else {
				dispatch({ type: ELIMINAR_PERMISO_EXITO, payload: data })
			}
		})
	}
}


export function mostrarPermiso(idPermiso) {
	return (dispatch) => {
		dispatch({ type: MOSTRAR_PERMISO_REQUEST })

		socketPermiso.emit('mostrar_permiso', { _id: idPermiso })

		socketPermiso.on('mostrar_permiso', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: MOSTRAR_PERMISO_FALLO, payload: data.error })
			} else {
				dispatch({ type: MOSTRAR_PERMISO_EXITO, payload: data })
			}
		})
	}
}


export function editarPermiso(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: EDITAR_PERMISO_REQUEST })

		socketPermiso.emit('editar_permiso', datosFormulario)

		socketPermiso.on('editar_permiso', (data) => {
			if(data.error) {
				dispatch({ type: EDITAR_PERMISO_FALLO, payload: data.error })
			} else {
				dispatch({ type: EDITAR_PERMISO_EXITO, payload: data })
			}
		})

	}
}









