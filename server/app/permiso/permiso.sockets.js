import Permiso from './permiso.model'

export default (socket, io) => {

		function permisos() {
			Permiso.find()
			.populate('usuario')
			.then((permisos) => {
				// console.log(permisos)
				
				io.sockets.emit('listar_permisos', { permisos: permisos })
			})
			.catch((err) => {
				console.log(err)
				return io.sockets.emit('listar_permisos', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
			})
		}
		
		
		socket.on('listar_permisos', function() {
			permisos()
		})


		socket.on('crear_permiso', function(data) {

			var permiso = new Permiso(data)

			permiso.save((err) => {
				if(err) {
					console.log(err)
					return socket.emit('crear_permiso', { error: 'Ocurrió un error, intente más tarde.' })
				}

				socket.emit('crear_permiso', { mensaje: 'Se agregó exitósamente.' })
						
				permisos()
			})
		})


		socket.on('eliminar_permiso', (data) => {
			Permiso.findByIdAndRemove(data._id, (err) => {
				if(err) {
					console.log(err)
					return socket.emit('eliminar_permiso', { error: 'Ocurrió un error, intente más tarde.' })
				}

				socket.emit('eliminar_permiso', { mensaje: 'Se Eliminó exitósamente.' })

				permisos()
			})
		})


		socket.on('mostrar_permiso_editar', (data) => {
			Permiso.findById(data._id, (err, permiso) => {
				if(err) {
					console.log(err)
					return socket.emit('mostrar_permiso_editar', { error: 'Ocurrió un error, intente más tarde.' })
				}

				if(permiso === null) {
					return socket.emit('mostrar_permiso_editar', { error: 'No se encontró en la base de datos.' })
				}

				// console.log(permiso)
				socket.emit('mostrar_permiso_editar', permiso)
					
			})
		})


		socket.on('editar_permiso', (data) => {
								
			Permiso.findByIdAndUpdate(data._id, data, (err) => {
				if(err) {
					console.log(err)
					return socket.emit('editar_permiso', { error: 'Ocurrió un error, intente más tarde.' })
				}

				socket.emit('editar_permiso', { mensaje: 'Se actualizó exitósamente.' })
					
				permisos()
			})
		})

}
