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
			
			Usuario.find((err, usuariosLista) => {
				if(err) {
					io.sockets.emit('registrar_usuario', { error: 'Ocurrió un error, intente nuevamente.' })
					return
				}
					
				if(usuariosLista.length == 0) {
					data.rol = 'admin'
				}

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


		})

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjM0MzlhNGFlOTNiOTFlMGM2ZTdkZDQ
// iLCJjb3JyZW8iOiJnYW1hQGdtYWlsLmNvbSIsInJvbCI6ImFkbWluIiwiaWF0IjoxNTMxMDg3NDU3LCJ
// leHAiOjE1MzM2Nzk0NTd9.jF_FkcUoGI4c4QoVxFyT8KfbH0PEDCerMS5MR-UNG5U

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

				mostrarUsuario(data._id)

				// socket.emit('editar_usuario', { mensaje: 'El usuario se actualizó exitosamente.' })
									
				usuarios()	
			})

		})

		


		socket.on('crear_calificacion', function(data) {

			 Usuario.findByIdAndUpdate(
		     data.idAlumno,
		     { $push: {"calificaciones": data.datosCli}},
		     {  safe: true, upsert: true},
		       function(err, usuario) {
		         if(err){
		        	console.log(err);
		        	return res.send(err);
		         }

				 mostrarUsuario(data.idAlumno)		        
		        
		      })
			
		})


		
		socket.on('eliminar_calificacion', function(data) {
			console.log("EL ID idAlumno-->: "+data.idAlumno)
			console.log("EL ID calificacion -->: "+data._id)


			Usuario.findByIdAndUpdate(
		    data.idAlumno,
		    { $pull: { 'calificaciones': {  _id: data._id } } },function(err, usuarioSinDato){
		      	if(err){
		       	console.log(err);
		       	return res.send(err);
		        }

				mostrarUsuario(data.idAlumno)		        
		    });
		})


		function mostrarUsuario(idAlumno) {
				// console.log("EL DATO ES--->"+idAlumno)
				
				Usuario
				.findById(idAlumno)
				.populate('calificaciones.materia')
				.populate('calificaciones.docente')
				
				.then((usuario) => {
					io.sockets.emit('mostrar_usuario', usuario)
				})
				.catch((err) => {
					console.log(err)
					return socket.emit('mostrar_usuario', { 
						error: 'Ocurrió un error, intente nuevamente' 
					})
				})
		}

		socket.on('mostrar_usuario', (data) => {
			mostrarUsuario(data._id)
		})


		socket.on('mostrar_calificacion_editar', (data) => {
			
			Usuario.findOne({"_id": data.idAlumno}, {calificaciones: {$elemMatch: { _id: data._id }}})
			.then((dato) => {
				// console.log("LA Calificacion--->")
				// console.log(dato.calificaciones[0])

				return socket.emit('mostrar_calificacion_editar', dato.calificaciones[0])
			})
			.catch((err) => {
				console.log(err)
				return socket.emit('mostrar_calificacion_editar', { error: 'Ocurrió un error, intente más tarde.' })
			})
		})


		socket.on('editar_calificacion', (data) => {
				// 'calificaciones.$.': "this is Update comment",
			Usuario.update({'calificaciones._id': data.datosCli._id},
			{'$set': {
				'calificaciones.$.materia':data.datosCli.materia,
				'calificaciones.$.oportunidad':data.datosCli.oportunidad,
				'calificaciones.$.nota':data.datosCli.nota,
				'calificaciones.$.fechaExamen':data.datosCli.fechaExamen,
				'calificaciones.$.observaciones':data.datosCli.observaciones,
				'calificaciones.$.fechaActualizacion':data.datosCli.fechaActualizacion
			}}, function(err, model) {
				if(err){
			    	console.log(err);
			    	return res.send(err);
			    }

				mostrarUsuario(data.idAlumno)
			});
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