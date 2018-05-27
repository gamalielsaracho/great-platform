import Usuario from './usuario.model'

import jwt from 'jsonwebtoken'
import config from '../../config'

const privateKey = config.key.privateKey
const tokenExpiry = config.key.tokenExpiry

export default (io) => {
	var usuarioNsp = io.of('/usuario');

	usuarioNsp.on('connection', function (socket) {
		
		console.log('Usuario Conectado.')

		function usuarios() {
			Usuario.find((err, usuarios) => {
				if(err) {
					socket.emit('listar_usuarios', { error: 'Ocurrió un error, intente nuevamente.' })
					return
				}
					
				usuarioNsp.emit('listar_usuarios', { usuarios: usuarios })
			})
		}

		usuarios()


		socket.on('registrar_usuario', (data) => {
			
			var usuario = new Usuario(data)			

			usuario.save(data, (err, usuario) => {
				if(err) {
					console.log(err)
					socket.emit('registrar_usuario', { error: 'Lo sentimos, ocurrió un error. intente nuevamente.' })
					return
				}

				socket.emit('registrar_usuario', { mensaje: 'El usuario se creó exitosamente.' })
								
				usuarios()
			})

		})


		socket.on('autenticar_usuario', (data) => {

			Usuario.findOne({ correo: data.correo }, (err, usuario) => {

				
				// console.log(dato)
				if(err) {
					return socket.emit('autenticar_usuario', { error: 'Lo sentimos, ocurrió un error. intente nuevamente.' })
				}

				if(usuario.correo) {

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

				socket.emit('mostrar_usuario', personal)
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


		socket.on('disconnect', function () {
			console.log('Usuario Desconectado.')
		})
	})


}