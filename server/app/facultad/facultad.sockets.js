import Facultad from './facultad.model'

export default (socket, io) => {

		function facultades() {
			Facultad.find((err, facultades) => {
				// console.log(facultades)

				if(err) {
					console.log(err)
					return io.sockets.emit('listar_facultades', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
				}

				io.sockets.emit('listar_facultades', { facultades: facultades })
			})
		}
		
		
		socket.on('listar_facultades', function() {
			facultades()
		})


		socket.on('crear_facultad', function(data) {

			var facultad = new Facultad(data)

			facultad.save((err) => {
				if(err) {
					console.log(err)
					return socket.emit('crear_facultad', { error: 'Ocurrió un error, intente más tarde.' })
				}

				socket.emit('crear_facultad', { mensaje: 'Se agregó exitósamente.' })
						
				facultades()
			})
		})


		socket.on('eliminar_facultad', (data) => {
			Facultad.findByIdAndRemove(data._id, (err) => {
				if(err) {
					console.log(err)
					return socket.emit('eliminar_facultad', { error: 'Ocurrió un error, intente más tarde.' })
				}

				socket.emit('eliminar_facultad', { mensaje: 'Se Eliminó exitósamente.' })

				facultades()
			})
		})


		socket.on('mostrar_facultad', (data) => {
			Facultad.findById(data._id, (err, facultad) => {
				if(err) {
					console.log(err)
					return socket.emit('mostrar_facultad', { error: 'Ocurrió un error, intente más tarde.' })
				}

				if(facultad === null) {
					return socket.emit('mostrar_facultad', { error: 'No se encontró en la base de datos.' })
				}

				// console.log(facultad)
				socket.emit('mostrar_facultad', facultad)
					
			})
		})


		socket.on('editar_facultad', (data) => {
								
			Facultad.findByIdAndUpdate(data._id, data, (err) => {
				if(err) {
					console.log(err)
					return socket.emit('editar_facultad', { error: 'Ocurrió un error, intente más tarde.' })
				}

				socket.emit('editar_facultad', { mensaje: 'Se actualizó exitósamente.' })
					
				facultades()
			})
		})

}
