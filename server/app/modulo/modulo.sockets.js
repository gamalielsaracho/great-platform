import Modulo from './modulo.model'

export default (socket, io) => {

		function modulos() {
			Modulo.find((err, modulos) => {
				// console.log(modulos)

				if(err) {
					console.log(err)
					return io.sockets.emit('listar_modulos', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
				}

				io.sockets.emit('listar_modulos', { modulos: modulos })
			})
		}
		
		
		socket.on('listar_modulos', function() {
			modulos()
		})


		socket.on('crear_modulo', function(data) {

			var modulo = new Modulo(data)

			modulo.save((err) => {
				if(err) {
					console.log(err)
					return socket.emit('crear_modulo', { error: 'Ocurrió un error, intente más tarde.' })
				}

				socket.emit('crear_modulo', { mensaje: 'Se agregó exitósamente.' })
						
				modulos()
			})
		})


		socket.on('eliminar_modulo', (data) => {
			Modulo.findByIdAndRemove(data._id, (err) => {
				if(err) {
					console.log(err)
					return socket.emit('eliminar_modulo', { error: 'Ocurrió un error, intente más tarde.' })
				}

				socket.emit('eliminar_modulo', { mensaje: 'Se Eliminó exitósamente.' })

				modulos()
			})
		})


		socket.on('mostrar_modulo', (data) => {
			Modulo.findById(data._id, (err, modulo) => {
				if(err) {
					console.log(err)
					return socket.emit('mostrar_modulo', { error: 'Ocurrió un error, intente más tarde.' })
				}

				if(modulo === null) {
					return socket.emit('mostrar_modulo', { error: 'No se encontró en la base de datos.' })
				}

				// console.log(modulo)
				socket.emit('mostrar_modulo', modulo)
					
			})
		})


		socket.on('editar_modulo', (data) => {
								
			Modulo.findByIdAndUpdate(data._id, data, (err) => {
				if(err) {
					console.log(err)
					return socket.emit('editar_modulo', { error: 'Ocurrió un error, intente más tarde.' })
				}

				socket.emit('editar_modulo', { mensaje: 'Se actualizó exitósamente.' })
					
				modulos()
			})
		})

}
