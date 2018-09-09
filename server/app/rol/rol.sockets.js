import Rol from './rol.model'

export default (socket, io) => {

		function roles() {
			Rol.find((err, roles) => {
				// console.log(roles)

				if(err) {
					console.log(err)
					return io.sockets.emit('listar_roles', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
				}

				io.sockets.emit('listar_roles', { roles: roles })
			})
		}
		
		
		socket.on('listar_roles', function() {
			roles()
		})


		socket.on('crear_rol', function(data) {

			var rol = new Rol(data)

			rol.save((err) => {
				if(err) {
					console.log(err)
					return socket.emit('crear_rol', { error: 'Ocurrió un error, intente más tarde.' })
				}

				socket.emit('crear_rol', { mensaje: 'Se agregó exitósamente.' })
						
				roles()
			})
		})


		socket.on('eliminar_rol', (data) => {
			Rol.findByIdAndRemove(data._id, (err) => {
				if(err) {
					console.log(err)
					return socket.emit('eliminar_rol', { error: 'Ocurrió un error, intente más tarde.' })
				}

				socket.emit('eliminar_rol', { mensaje: 'Se Eliminó exitósamente.' })

				roles()
			})
		})


		socket.on('mostrar_rol', (data) => {
			Rol.findById(data._id, (err, rol) => {
				if(err) {
					console.log(err)
					return socket.emit('mostrar_rol', { error: 'Ocurrió un error, intente más tarde.' })
				}

				if(rol === null) {
					return socket.emit('mostrar_rol', { error: 'No se encontró en la base de datos.' })
				}

				// console.log(rol)
				socket.emit('mostrar_rol', rol)
					
			})
		})


		socket.on('editar_rol', (data) => {
								
			Rol.findByIdAndUpdate(data._id, data, (err) => {
				if(err) {
					console.log(err)
					return socket.emit('editar_rol', { error: 'Ocurrió un error, intente más tarde.' })
				}

				socket.emit('editar_rol', { mensaje: 'Se actualizó exitósamente.' })
					
				roles()
			})
		})

}
