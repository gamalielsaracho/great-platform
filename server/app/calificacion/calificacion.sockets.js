import Calificacion from './calificacion.model'

export default (io) => {
	var calificacionNsp = io.of('/calificacion');
	
	calificacionNsp.on('connection', function (socket) {

		console.log('Calificacion Conectado.')

		function calificaciones() {
			Calificacion.find((err, calificaciones) => {
				// console.log(calificaciones)

				if(err) {
					console.log(err)
					
					socket.emit('listar_calificaciones', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
					return
				}

				calificacionNsp.emit('listar_calificaciones', { calificaciones: calificaciones })
			})
		}
		
		calificaciones()


		socket.on('crear_calificacion', function(data) {
			
			var calificacion = new Calificacion(data)

			calificacion.save((err) => {
				if(err) {
					console.log(err)
					return socket.emit('crear_calificacion', { error: 'Ocurrió un error, intente más tarde.' })
				}

				socket.emit('crear_calificacion', { mensaje: 'Se agregó exitósamente.' })
						
				calificaciones()
			})
		})


		socket.on('eliminar_calificacion', (data) => {
			Calificacion.findByIdAndRemove(data._id, (err) => {
				if(err) {
					console.log(err)
					socket.emit('eliminar_calificacion', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('eliminar_calificacion', { mensaje: 'Se Eliminó exitósamente.' })

				calificaciones()
			})
		})


		socket.emit('mostrar_calificacion', (data) => {
								
			Calificacion.findById(data._id, (err, pregunta) => {
				if(err) {
					console.log(err)
					return socket.emit('mostrar_calificacion', { error: 'Ocurrió un error, intente más tarde.' })
				}

				socket.emit('mostrar_calificacion', pregunta)
					
			})
		})


		socket.on('editar_calificacion', (data) => {
								
			Calificacion.findByIdAndUpdate(data._id, data, (err) => {
				if(err) {
					console.log(err)
					return socket.emit('editar_calificacion', { error: 'Ocurrió un error, intente más tarde.' })
				}

				socket.emit('editar_calificacion', { mensaje: 'Se actualizó exitósamente.' })
					
				calificaciones()
			})
		})


		socket.on('disconnect', function () {
			console.log('Calificacion Desconectado.')
		})
	})
}
