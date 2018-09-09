import Oportunidad from './oportunidad.model'

export default (socket, io) => {

		function oportunidades() {
			Oportunidad.find((err, oportunidades) => {
				// console.log(oportunidades)

				if(err) {
					console.log(err)
					return io.sockets.emit('listar_oportunidades', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
				}

				io.sockets.emit('listar_oportunidades', { oportunidades: oportunidades })
			})
		}
		
		
		socket.on('listar_oportunidades', function() {
			oportunidades()
		})


		socket.on('crear_oportunidad', function(data) {

			var oportunidad = new Oportunidad(data)

			oportunidad.save((err) => {
				if(err) {
					console.log(err)
					return socket.emit('crear_oportunidad', { error: 'Ocurrió un error, intente más tarde.' })
				}

				socket.emit('crear_oportunidad', { mensaje: 'Se agregó exitósamente.' })
						
				oportunidades()
			})
		})


		socket.on('eliminar_oportunidad', (data) => {
			Oportunidad.findByIdAndRemove(data._id, (err) => {
				if(err) {
					console.log(err)
					return socket.emit('eliminar_oportunidad', { error: 'Ocurrió un error, intente más tarde.' })
				}

				socket.emit('eliminar_oportunidad', { mensaje: 'Se Eliminó exitósamente.' })

				oportunidades()
			})
		})


		socket.on('mostrar_oportunidad', (data) => {
			Oportunidad.findById(data._id, (err, oportunidad) => {
				if(err) {
					console.log(err)
					return socket.emit('mostrar_oportunidad', { error: 'Ocurrió un error, intente más tarde.' })
				}

				if(oportunidad === null) {
					return socket.emit('mostrar_oportunidad', { error: 'No se encontró en la base de datos.' })
				}

				// console.log(oportunidad)
				socket.emit('mostrar_oportunidad', oportunidad)
					
			})
		})


		socket.on('editar_oportunidad', (data) => {
								
			Oportunidad.findByIdAndUpdate(data._id, data, (err) => {
				if(err) {
					console.log(err)
					return socket.emit('editar_oportunidad', { error: 'Ocurrió un error, intente más tarde.' })
				}

				socket.emit('editar_oportunidad', { mensaje: 'Se actualizó exitósamente.' })
					
				oportunidades()
			})
		})

}
