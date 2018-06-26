import Usuario from './usuario.model'

import Calificacion from '../calificacion/calificacion.model'

import jwt from 'jsonwebtoken'
import config from '../../config'

const privateKey = config.key.privateKey
const tokenExpiry = config.key.tokenExpiry

// import nsp from '../nsp'

// console.log(nsp.usuarioNsp)

export default (socket, io) => {
	// var usuarioNsp = io.of('/usuario');

	// usuarioNsp.on('connection', function (socket) {
		
		console.log('Usuario Conectado.')

		function usuarios() {
			Usuario.find((err, usuarios) => {
				if(err) {
					io.sockets.emit('listar_usuarios', { error: 'Ocurrió un error, intente nuevamente.' })
					return
				}
					
				io.sockets.emit('listar_usuarios', { usuarios: usuarios })
			})
		}


		socket.on('listar_usuarios', () => {
			usuarios()
		})

		socket.on('registrar_usuario', (data) => {
			
			var usuario = new Usuario(data)			

			usuario.save((err, usuario) => {
				if(err) {
					console.log(err)
					socket.emit('registrar_usuario', { error: 'Lo sentimos, ocurrió un error. intente nuevamente.' })
					return
				}

				socket.emit('registrar_usuario', { mensaje: 'El usuario se creó exitosamente.' })
								
				usuarios()
			})

		})


		socket.on('agregar_calificacion_usuario', (data) => {
			
			Usuario.findById(data._id, (err, usuario) => {
				if(err) {
					socket.emit('agregar_calificacion_usuario', { error: 'Ocurrió un error, intente nuevamente' })
					return
				}

				var calificacion = new Calificacion(data.datosCli)

				calificacion.save((err, calificacion) => {
					if(err) {
						console.log(err)
						socket.emit('agregar_calificacion_usuario', { error: 'Lo sentimos, ocurrió un error. intente nuevamente.' })
						return
					}

					// console.log('....CALIFICACION CREADA.....')
					// console.log(calificacion)

					// console.log('....USUARIO ENCONTRADO.....')
					// console.log(usuario)

					usuario.calificaciones.push(calificacion)

					usuario.save((err) => {
						if(err) {
							console.log(err)
							socket.emit('agregar_calificacion_usuario', { error: 'Lo sentimos, ocurrió un error. intente nuevamente.' })
							return
						}

						socket.emit('agregar_calificacion_usuario', { mensaje: 'La calificación se agregó exitosamente.' })
						socket.emit('mostrar_usuario', usuario)								
					})

					// socket.emit('agregar_calificacion_usuario', { mensaje: 'La calificación se agregó exitosamente.' })
					// socket.emit('mostrar_usuario', usuario)								
				})

			})
		})


		socket.on('autenticar_usuario', (data) => {

				// console.log(data)
			Usuario.findOne({ correo: data.correo }, (err, usuario) => {

				
				if(err) {
					return socket.emit('autenticar_usuario', { error: 'Lo sentimos, ocurrió un error. intente nuevamente.' })
				}

				console.log(usuario)

				if(usuario) {

					if(usuario.contrasena != data.contrasena) {
						return socket.emit('autenticar_usuario', { error: 'La contraseña es incorrecta.' })
					}

					let datosToken = {
						_id: usuario._id,
						correo: usuario.correo,
						nombreUsuario: usuario.nombreUsuario,
						rol: usuario.rol						
					}

					const token = jwt.sign(datosToken, privateKey, { expiresIn: tokenExpiry })

					socket.emit('autenticar_usuario', { 
						token: token,
						mensaje: 'Autenticación exitosamente.' 
					})
				
				} else {
					socket.emit('autenticar_usuario', { error: 'Este correo no existe.' })
				}

			})
		})
		

		socket.on('editar_usuario', (data) => {
			
			Usuario.findByIdAndUpdate(data._id, data, (err, usuario) => {
				if(err) {
					console.log(err)
					socket.emit('editar_usuario', { error: 'Lo sentimos, ocurrió un error. intente nuevamente.' })
					return
				}

				socket.emit('editar_usuario', { mensaje: 'El usuario se actualizó exitosamente.' })
									
				usuarios()	
			})

		})


		socket.on('mostrar_usuario', (data) => {
			Usuario.findById(data._id, (err, usuario) => {
				if(err) {
					socket.emit('mostrar_usuario', { error: 'Ocurrió un error, intente nuevamente' })
					return
				}

				socket.emit('mostrar_usuario', usuario)
			})
		})


		socket.on('verificar_token', (data) => {
			const token = data.token

			console.log(token)

			if(!token) {
				return socket.emit('verificar_token', { error: 'Tú no tienes Token, Inicia sessión nuevamente.' })
			}

			jwt.verify(token, privateKey, (err, usuario) => {
				if(err) {
					console.log(err)
					return
				}

				Usuario.findOne({ correo: usuario.correo }, (err, personalFromServer) => {
					if(err) {
						console.log(err)
						return
					}

					socket.emit('verificar_token', personalFromServer)
				})
			})
		})


	// 	socket.on('disconnect', function () {
	// 		console.log('Usuario Desconectado.')
	// 	})
	// })


}