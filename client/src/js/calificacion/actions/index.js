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
import $ from 'jquery'

import io from 'socket.io-client'

import { browserHistory } from 'react-router'
import { reset } from 'redux-form'

var calificacionSocket = io.connect('http://localhost:3000');

export function agregarNota() {
	return (dispatch) => {
		calificacionSocket.emit('agregar_nota_usuario', {
			materia: 'Ingestigación de operaciones',
			nota: 4
		})


		calificacionSocket.on('enviar-notificacion', function (data) {
			console.log(data)
			navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
			    serviceWorkerRegistration.pushManager.getSubscription()
			    .then((subscription) => {
			    	console.log('subscription ----->')
			    	console.log(subscription)
			      $.post('http://localhost:3000/push', {
			        subscription: subscription.toJSON(),
			        // message: 'You clicked a button!'
			        datos: data
			      });
			  });
			});
		})
	}
}

// ---------------------

export function abrirFormularioCrearCalificacion() {
	return (dispatch) => {
		dispatch(reset('FormularioCalificacion'))

		dispatch({ type: ABRIR_FORMULARIO_CREAR_CALIFICACION })
	}
}

export function abrirFormularioEditarCalificacion(idCalificacion, idAlumno) {
	return (dispatch) => {
		dispatch({ type: ABRIR_FORMULARIO_EDITAR_CALIFICACION_REQUEST })

		calificacionSocket.emit('mostrar_calificacion_editar', { 
			_id: idCalificacion,
			idAlumno: idAlumno
		})

		calificacionSocket.on('mostrar_calificacion_editar', (data) => {
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

export function listarCalificaciones(idAlumno) {
	return (dispatch) => {

		dispatch({ type: LISTAR_CALIFICACIONES_REQUEST })

		calificacionSocket.emit('listar_calificaciones', {
			idAlumno: idAlumno
		})

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

export function crearCalificacion(datosFormulario, idDocente, idAlumno) {
	return (dispatch) => {

		// var usuarioSocket = io.connect('http://localhost:3000');

		// console.log('datosFormulario')
		// console.log(datosFormulario)

		dispatch({ type: CREAR_CALIFICACION_REQUEST })

		datosFormulario.docente = idDocente
		datosFormulario.fechaCreacion = new Date()

		console.log(datosFormulario)

		let datos = {
			idAlumno: idAlumno,
			datosCli: datosFormulario 
		}


		calificacionSocket.emit('crear_calificacion', datos)

		calificacionSocket.on('crear_calificacion', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: CREAR_CALIFICACION_FALLO, payload: data.error })
			} else {
				dispatch({ type: CREAR_CALIFICACION_EXITO, payload: data })
			}
			
		})
		
		dispatch(cerrarFormularioCalificacion())
	}
}

export function eliminarCalificacion(idCalificacion, idAlumno) {
	return (dispatch) => {
		// alert(idCalificacion)

		dispatch({ type: ELIMINAR_CALIFICACION_REQUEST })

		let datos = {
			_id: idCalificacion,
			idAlumno: idAlumno 
		}

		calificacionSocket.emit('eliminar_calificacion', datos)

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

export function editarCalificacion(datosFormulario, idAlumno) {
	return (dispatch) => {
		dispatch({ type: EDITAR_CALIFICACION_REQUEST })

		// var usuarioSocket = io.connect('http://localhost:3000/usuario');

		datosFormulario.fechaActualizacion = new Date()

		let datos = {
			idAlumno: idAlumno,
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

		dispatch(cerrarFormularioCalificacion())

	}
}









