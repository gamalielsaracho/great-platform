import Usuario from './usuario.model'
	

export function listarUsuarios(socket, io) {
	Usuario
	.find()
	// .populate('rol')
	.then((usuarios) => {	
		console.log(usuarios)					
		io.sockets.emit('listar_usuarios', { usuarios: usuarios })
	})
	.catch((err) => {
		console.log(err)
		return io.sockets.emit('listar_usuarios', { error: 'Ocurrió un error, intente nuevamente.' })
	})
}


export function mostrarUsuario(idAlumno, socket, io) {

	Usuario
	.findById(idAlumno)
	.populate('calificaciones.materia')
	.populate('calificaciones.docente')
					
	.then((usuario) => {
		io.sockets.emit('mostrar_usuario', usuario)
	})
	.catch((err) => {
		console.log(err)
		
		return socket.emit('mostrar_usuario', { 
			error: 'Ocurrió un error, intente nuevamente' 
		})
	})
}