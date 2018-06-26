import Materia from './materia.model'

export default (socket, io) => {

		function materias() {
			Materia.find((err, materias) => {
				// console.log(materias)

				if(err) {
					console.log(err)
					
					io.sockets.emit('listar_materias', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
					return
				}

				io.sockets.emit('listar_materias', { materias: materias })
			})
		}
		
		
		socket.on('listar_materias', function() {
			materias()
		})


		socket.on('crear_materia', function(data) {

			var materia = new Materia(data)

			materia.save((err) => {
				if(err) {
					console.log(err)
					return socket.emit('crear_materia', { error: 'Ocurrió un error, intente más tarde.' })
				}

				socket.emit('crear_materia', { mensaje: 'Se agregó exitósamente.' })
						
				materias()
			})
		})


		socket.on('eliminar_materia', (data) => {
			Materia.findByIdAndRemove(data._id, (err) => {
				if(err) {
					console.log(err)
					socket.emit('eliminar_materia', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('eliminar_materia', { mensaje: 'Se Eliminó exitósamente.' })

				materias()
			})
		})


		socket.on('mostrar_materia', (data) => {
			Materia.findById(data._id, (err, materia) => {
				if(err) {
					console.log(err)
					return socket.emit('mostrar_materia', { error: 'Ocurrió un error, intente más tarde.' })
				}

				console.log(materia)
				socket.emit('mostrar_materia', materia)
					
			})
		})


		socket.on('editar_materia', (data) => {
								
			Materia.findByIdAndUpdate(data._id, data, (err) => {
				if(err) {
					console.log(err)
					return socket.emit('editar_materia', { error: 'Ocurrió un error, intente más tarde.' })
				}

				socket.emit('editar_materia', { mensaje: 'Se actualizó exitósamente.' })
					
				materias()
			})
		})

}
