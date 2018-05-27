import Rol from './rol.model'


export default (io) => {
	var rolNsp = io.of('/rol');

	rolNsp.on('connection', function (socket) {

		console.log('Rol Conectado.')

		function roles() {
			Rol.find((err, roles) => {
				if(err) {
					console.log(err)
				
					socket.emit('listar_roles', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
					return
				}

				// console.log(roles)

				rolNsp.emit('listar_roles', { roles: roles })
			})
		}
	
		roles()


		socket.on('listar_roles', function() {
			roles()
		})


		socket.on('crear_rol', function(data) {
			// console.log(data)
			var rol = new Rol(data)

			rol.save(data, (err, rol) => {
				if(err) {
					console.log(rol)
					return socket.emit('crear_rol', { error: 'Ocurrió un error, intente más tarde.' })
				}

				socket.emit('crear_rol', { mensaje: 'Se agregó exitósamente.' })
			
				roles()
			})
		})


		socket.on('mostrar_rol', (data) => {
			Rol.findById(data._id, (err, rol) => {
				if(err) {
					console.log(err)
					socket.emit('mostrar_rol', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('mostrar_rol', rol)
			})
		})


		socket.on('eliminar_rol', (data) => {

			Rol.findByIdAndRemove(data.id_rol, (err) => {
				if(err) {
					console.log(err)
					socket.emit('eliminar_rol', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('eliminar_rol', { mensaje: 'Se Eliminó exitósamente.' })
				roles()
			})

		})


		socket.on('editar_rol', (data) => {

			Rol.findByIdAndUpdate(data._id, data , (err) => {
				if(err) {
					console.log(err)
					return socket.emit('editar_rol', { error: 'Ocurrió un error, intente más tarde.' })
				}

				socket.emit('editar_rol', { mensaje: 'Se actualizó exitósamente.' })
			
				roles()
			})
		})

		socket.on('disconnect', function () {
			console.log('Rol Desconectado.')
		})
	})


}
