import Calificacion from './calificacion.model'

export default (socket, io) => {

		function calificaciones() {
			Calificacion.find((err, calificaciones) => {
				// console.log(calificaciones)

				if(err) {
					console.log(err)
					
					io.socket.emit('listar_calificaciones', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
					return
				}

				io.socket.emit('listar_calificaciones', { calificaciones: calificaciones })
			})
		}
		
		socket.on('listar_calificaciones', function(data) {
			calificaciones()
		})


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


		socket.on('mostrar_calificacion', (data) => {
								
			Calificacion.findById(data._id, (err, calificacion) => {
				if(err) {
					console.log(err)
					return socket.emit('mostrar_calificacion', { error: 'Ocurrió un error, intente más tarde.' })
				}

				socket.emit('mostrar_calificacion', calificacion)
					
			})
		})


		socket.on('editar_calificacion', (data) => {
								
			Calificacion.findByIdAndUpdate(data.datosCli._id, data.datosCli, (err) => {
				if(err) {
					console.log(err)
					return socket.emit('editar_calificacion', { error: 'Ocurrió un error, intente más tarde.' })
				}

				Usuario.findById(data._id, (err, usuario) => {
					if(err) {
						socket.emit('mostrar_usuario', { error: 'Ocurrió un error, intente nuevamente' })
						return
					}

					socket.emit('mostrar_usuario', usuario)
				})

				// socket.emit('editar_calificacion', { mensaje: 'Se actualizó exitósamente.' })
					
				// calificaciones()
			})
		})
	
}
