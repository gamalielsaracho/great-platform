import {
	REGISTRAR_PERSONAL_REQUEST,
	REGISTRAR_PERSONAL_EXITO,
	REGISTRAR_PERSONAL_FALLO,

	AUTENTICAR_PERSONAL_REQUEST,
	AUTENTICAR_PERSONAL_EXITO,
	AUTENTICAR_PERSONAL_FALLO,

	VERIFICAR_TOKEN_PERSONAL_EXITO,
	VERIFICAR_TOKEN_PERSONAL_FALLO,

	SALIR_PERSONAL,

	LISTAR_PERSONALES_REQUEST,
	LISTAR_PERSONALES_EXITO,
	LISTAR_PERSONALES_FALLO,

	LISTAR_MEDICOS_REQUEST,
	LISTAR_MEDICOS_EXITO,
	LISTAR_MEDICOS_FALLO,

	ACTUALIZAR_FORMULARIO_FILTRO,


	ABRIR_FORMULARIO_EDITAR_PERSONAL_REQUEST,
	ABRIR_FORMULARIO_EDITAR_PERSONAL_EXITO,
	ABRIR_FORMULARIO_EDITAR_PERSONAL_FALLO,

	EDITAR_PERSONAL_REQUEST,
	EDITAR_PERSONAL_EXITO,
	EDITAR_PERSONAL_FALLO,

	ABRIR_FORMULARIO_CREAR_PERSONAL,

	CERRAR_FORMULARIO_PERSONAL,

	MOSTRAR_PERSONAL_REQUEST,
	MOSTRAR_PERSONAL_EXITO,
	MOSTRAR_PERSONAL_FALLO
} from './types'

import io from 'socket.io-client'
import { reset } from 'redux-form'
import $ from 'jquery'

import { browserHistory } from 'react-router'

import moment from 'moment'

var socketPersonal = io('http://localhost:3000')


export function suscribirUsuarioAlServiceWorker() {
	return (dispatch) => {
		var vapidServerPublicKey

		var swRegistration = null
		// var webPushButton = document.querySelector('.webpush-button')
		// var guardarNotaButton = document.querySelector('.guardarNota')



		function urlB64ToUint8Array(base64String) {
		  var padding = '='.repeat((4 - base64String.length % 4) % 4);
		  var base64 = (base64String + padding)
		    .replace(/\-/g, '+')
		    .replace(/_/g, '/');

		  var rawData = window.atob(base64);
		  var outputArray = new Uint8Array(rawData.length);

		  for (var i = 0; i < rawData.length; ++i) {
		    outputArray[i] = rawData.charCodeAt(i);
		  }
		  return outputArray;
		}


		if ('serviceWorker' in navigator && 'PushManager' in window) {
		  console.log('Service Worker and Push is supported');

		  navigator.serviceWorker.register('serviceworker.js')
		  .then(function(swReg) {
		  	console.log('estado permiso: '+Notification.permission)

		  	if (Notification.permission === "granted") {
			  console.log("Permission to receive notifications has been granted");
			}else {
			  console.log("PUEDES ACTIVAR LAS NOTIFICACIONES");
			}

		    console.log('Service Worker is registered', swReg);

		    swRegistration = swReg;

			subscribeUser()
		  })
		  .catch(function(error) {
		    console.error('Service Worker Error', error);
		  });
		} else {
		  console.warn('Push messaging is not supported')
		}


		function subscribeUser() {
		  // var applicationServerKey = urlB64ToUint8Array(response.publicKey)

			$.get('http://localhost:3000/publickey')
			.then(function (response) {
				// vapidServerPublicKey = response.publicKey

			  	swRegistration.pushManager.subscribe({
			    	userVisibleOnly: true,
			    	applicationServerKey: urlB64ToUint8Array(response.publicKey)
			  	})
			  	.then(function (subscription) {
			    	console.log('User is subscribed:', subscription)
			  	})
			  	.catch(function(err) {
			    	console.log('Failed to subscribe the user: ', err);
			  	})
			})
			.catch(function(error) {
				console.log(error)
			})

		}

		// dispatch({ type: ABRIR_FORMULARIO_CREAR_PERSONAL })
	}
}

// export function agregarAdminPersonal(idPersonal) {
// 	return (dispatch) => {

// 		socketPersonal.emit('agregar_admin_usuario', {
// 			_id: idPersonal,
// 			rol: 'admin'
// 		})

// 		socketPersonal.on('agregar_admin_usuario', (data) => {
// 			if(data.error) {
// 				dispatch({ type: EDITAR_PERSONAL_FALLO, payload: data.error })
// 			} else {
// 				dispatch({ type: EDITAR_PERSONAL_EXITO, payload: data })
// 			}
// 		})

// 	}
// }



export function abrirFormularioCrearPersonal() {
	return (dispatch) => {
		dispatch(reset('FormularioPersonal'))

		dispatch({ type: ABRIR_FORMULARIO_CREAR_PERSONAL })
	}
}


export function abrirFormularioEditarPersonal(idPersonal) {
	return (dispatch) => {
		dispatch({ type: ABRIR_FORMULARIO_EDITAR_PERSONAL_REQUEST })

		socketPersonal.emit('mostrar_usuario_editar', { _id: idPersonal })

		socketPersonal.on('mostrar_usuario_editar', (data) => {
			if(data.error) {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_PERSONAL_FALLO, payload: data.error })
			} else {
				// data.fecha_nacimiento = moment(data.fecha_nacimiento).format('YYYY-MM-DD')
				
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_PERSONAL_EXITO, payload: data })
			}
		})
	}
}


export function editarPersonal(datosFormulario) {
	return (dispatch) => {
		// datosFormulario.idPersonal = jwtDecode(localStorage.getItem('token'))._id

		dispatch({ type: EDITAR_PERSONAL_REQUEST })

		socketPersonal.emit('editar_usuario', datosFormulario)

		socketPersonal.on('editar_usuario', (data) => {
			console.log(data)
			if(data.error) {
				dispatch({ type: EDITAR_PERSONAL_FALLO, payload: data.error })
			} else {
				dispatch({ type: EDITAR_PERSONAL_EXITO, payload: data })
			}
		})

	}
}

export function cerrarFormularioPersonal() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_PERSONAL })
	}
}


export function mostrarPersonal(idPersonal) {
	return (dispatch) => {
		dispatch({ type: MOSTRAR_PERSONAL_REQUEST })

		var socketPersonal = io.connect('http://localhost:3000');


		socketPersonal.emit('mostrar_usuario', { _id: idPersonal })

		socketPersonal.on('mostrar_usuario', (data) => {
			console.log(data)
			if(data.error) {
				dispatch({ type: MOSTRAR_PERSONAL_FALLO, payload: data.error })
			} else {
				dispatch({ type: MOSTRAR_PERSONAL_EXITO, payload: data })
			}
		})
	}
}



export function registrarPersonal(datosFormulario) {

	return (dispatch) => {
		dispatch({ type: REGISTRAR_PERSONAL_REQUEST })

		socketPersonal.emit('registrar_usuario', datosFormulario)

		socketPersonal.on('registrar_usuario', (data) => {
			console.log(data)
			if(data.error) {
				dispatch({ type: REGISTRAR_PERSONAL_FALLO, payload: data.error })
			} else {
				dispatch({ type: REGISTRAR_PERSONAL_EXITO, payload: data })
				browserHistory.push('entrar')
			}
		})
	}
}

export function autenticarPersonal(datosFormulario) {

	return (dispatch) => {
		dispatch({ type: AUTENTICAR_PERSONAL_REQUEST })

		socketPersonal.emit('autenticar_usuario', datosFormulario)

		socketPersonal.on('autenticar_usuario', (data) => {
			if(data.error) {
				dispatch({ type: AUTENTICAR_PERSONAL_FALLO, payload: data.error })
			} else {
				console.log(token)

				dispatch({ type: AUTENTICAR_PERSONAL_EXITO, payload: data })
				
				localStorage.setItem('token', data.token)

				const token = localStorage.getItem('token')

				dispatch(verificarTokenPersonal(token))

				// Se registra el service Worker después de
				// autenticarse.
				// dispatch(suscribirUsuarioAlServiceWorker())

				// enviar al perfil del Personal. cool.!
				browserHistory.push(`/`)
			}
		})
	}
}

export function verificarTokenPersonal(token) {

	return (dispatch) => {

		socketPersonal.emit('verificar_token', { token: token })
		
		socketPersonal.on('verificar_token', (data) => {
			if(data.error) {
				dispatch({ type: VERIFICAR_TOKEN_PERSONAL_FALLO, payload: data.error })
			} else {
				dispatch({ type: VERIFICAR_TOKEN_PERSONAL_EXITO, payload: data })
			}
		})
	}
}

export function salirPersonal() {

	return (dispatch) => {
		dispatch({ type: SALIR_PERSONAL })

		localStorage.removeItem('token')

		browserHistory.push(`/entrar`)
		window.location.reload()

	}
}

export function listarPersonales() {
	return (dispatch) => {

		dispatch({ type: LISTAR_PERSONALES_REQUEST })

		
		socketPersonal.emit('listar_usuarios', null)


		socketPersonal.on('listar_usuarios', function(data) {
			if(data.error) {
				dispatch({ type: LISTAR_PERSONALES_FALLO, payload: data.error })
			} else {	
				dispatch({ type: LISTAR_PERSONALES_EXITO, payload: data })
			}
		})

	}
}


export function listarMedicos() {
	return (dispatch) => {

		dispatch({ type: LISTAR_MEDICOS_REQUEST })

		// var socketPersonal = io.connect('http://localhost:3000')

		socketPersonal.on('listar_personales_medicos', function(data) {
			if(data.error) {
				dispatch({ type: LISTAR_MEDICOS_FALLO, payload: data.error })
			} else {	
				dispatch({ type: LISTAR_MEDICOS_EXITO, payload: data })
			}
		})

	}
}

export function actualizarFormularioFiltro(valoresInput) {
	return (dispatch) => {
		// console.log(valoresInput)
		dispatch({ type: ACTUALIZAR_FORMULARIO_FILTRO, valores: valoresInput  })
	}
}




