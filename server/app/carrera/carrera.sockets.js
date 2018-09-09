import Carrera from './carrera.model'

export default (socket, io) => {

		function carreras() {
			Carrera.find((err, carreras) => {
				// console.log(carreras)

				if(err) {
					console.log(err)
					return io.sockets.emit('listar_carreras', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
				}

				io.sockets.emit('listar_carreras', { carreras: carreras })
			})
		}
		
		
		socket.on('listar_carreras', function() {
			carreras()
		})


		socket.on('crear_carrera', function(data) {

			var carrera = new Carrera(data)

			carrera.save((err) => {
				if(err) {
					console.log(err)
					return socket.emit('crear_carrera', { error: 'Ocurrió un error, intente más tarde.' })
				}

				socket.emit('crear_carrera', { mensaje: 'Se agregó exitósamente.' })
						
				carreras()
			})
		})


		socket.on('eliminar_carrera', (data) => {
			Carrera.findByIdAndRemove(data._id, (err) => {
				if(err) {
					console.log(err)
					return socket.emit('eliminar_carrera', { error: 'Ocurrió un error, intente más tarde.' })
				}

				socket.emit('eliminar_carrera', { mensaje: 'Se Eliminó exitósamente.' })

				carreras()
			})
		})


		socket.on('mostrar_carrera', (data) => {
			Carrera.findById(data._id, (err, carrera) => {
				if(err) {
					console.log(err)
					return socket.emit('mostrar_carrera', { error: 'Ocurrió un error, intente más tarde.' })
				}

				if(carrera === null) {
					return socket.emit('mostrar_carrera', { error: 'No se encontró en la base de datos.' })
				}

				// console.log(carrera)
				socket.emit('mostrar_carrera', carrera)
					
			})
		})


		socket.on('editar_carrera', (data) => {
								
			Carrera.findByIdAndUpdate(data._id, data, (err) => {
				if(err) {
					console.log(err)
					return socket.emit('editar_carrera', { error: 'Ocurrió un error, intente más tarde.' })
				}

				socket.emit('editar_carrera', { mensaje: 'Se actualizó exitósamente.' })
					
				carreras()
			})
		})

}
