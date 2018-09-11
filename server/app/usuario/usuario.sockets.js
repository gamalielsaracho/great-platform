import Usuario from './usuario.model'

import jwt from 'jsonwebtoken'
import config from '../../config'

const privateKey = config.key.privateKey
const tokenExpiry = config.key.tokenExpiry

import { listarUsuarios, mostrarUsuario } from './enventsToCall'

export default (socket, io) => {


	socket.on('listar_usuarios', () => {
		listarUsuarios(socket, io)
	})


	socket.on('registrar_usuario', (data) => {
			
		Usuario.find((err, usuariosLista) => {
			if(err) {
				return io.sockets.emit('registrar_usuario', { error: 'Ocurrió un error, intente nuevamente.' })
			}
					
			if(usuariosLista.length == 0) {
				data.rol = 'admin'
			}

			var usuario = new Usuario(data)			

			usuario.save((err, usuario) => {
				if(err) {
					console.log(err)
					return socket.emit('registrar_usuario', { error: 'Lo sentimos, ocurrió un error. intente nuevamente.' })
				}

				socket.emit('registrar_usuario', { mensaje: 'El usuario se creó exitosamente.' })
									
				listarUsuarios(socket, io)
			})

		})

	})

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjM0MzlhNGFlOTNiOTFlMGM2ZTdkZDQ
// iLCJjb3JyZW8iOiJnYW1hQGdtYWlsLmNvbSIsInJvbCI6ImFkbWluIiwiaWF0IjoxNTMxMDg3NDU3LCJ
// leHAiOjE1MzM2Nzk0NTd9.jF_FkcUoGI4c4QoVxFyT8KfbH0PEDCerMS5MR-UNG5U

	socket.on('autenticar_usuario', (data) => {

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
		

	socket.on('mostrar_usuario', (data) => {
		mostrarUsuario(data._id)
	})


	socket.on('mostrar_usuario_editar', (data) => {
		Usuario.findById(data._id, (err, usuario) => {
			if(err) {
				console.log(err)
				socket.emit('mostrar_usuario_editar', { error: 'Lo sentimos, ocurrió un error. intente nuevamente.' })
				return
			}

			console.log(usuario)

			socket.emit('mostrar_usuario_editar', usuario)									
		})
	})


	socket.on('editar_usuario', (data) => {
		Usuario.findByIdAndUpdate(data._id, data, (err, usuario) => {
			if(err) {
				console.log(err)
				socket.emit('editar_usuario', { error: 'Lo sentimos, ocurrió un error. intente nuevamente.' })
				return
			}

			mostrarUsuario(data._id, socket, io)

			// socket.emit('editar_usuario', { mensaje: 'El usuario se actualizó exitosamente.' })
									
			listarUsuarios(socket, io)	
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
				return socket.emit('verificar_token', { error: 'Lo sentimos, ocurrió un error. intente nuevamente.' })
			}

			Usuario.findOne({ correo: usuario.correo }, (err, userFromServer) => {
				if(err) {
					console.log(err)
					return socket.emit('verificar_token', { error: 'Lo sentimos, ocurrió un error. intente nuevamente.' })
				}

				socket.emit('verificar_token', userFromServer)
			})
		})
	})

}