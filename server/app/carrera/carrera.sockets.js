import Carrera from './carrera.model'

import { 
	listarCarreras, 
	listarCarrerasPorIdFacultad,
	mostrarCarrera 
} from './enventsToCall'

export default (socket, io) => {
		
		socket.on('listar_carreras', function() {
			listarCarreras(socket, io)
		})


		socket.on('listar_carreras_porIdFacultad', function(data) {
			listarCarrerasPorIdFacultad(socket, io, data.idFacultad)
		})


		socket.on('crear_carrera', function(data) {

			var carrera = new Carrera(data)

			carrera.save((err) => {
				if(err) {
					console.log(err)
					return socket.emit('crear_carrera', { error: 'Ocurrió un error, intente más tarde.' })
				}

				socket.emit('crear_carrera', { mensaje: 'Se agregó exitósamente.' })
						
				listarCarrerasPorIdFacultad(socket, io, data.facultad)

			})
		})


		socket.on('eliminar_carrera', (data) => {
			Carrera.findByIdAndRemove(data._id, (err) => {
				if(err) {
					console.log(err)
					return socket.emit('eliminar_carrera', { error: 'Ocurrió un error, intente más tarde.' })
				}

				socket.emit('eliminar_carrera', { mensaje: 'Se Eliminó exitósamente.' })

				listarCarrerasPorIdFacultad(socket, io, data.idFacultad)

			})
		})


		socket.on('mostrar_carrera', (data) => {
			mostrarCarrera(data._id, socket, io)
		})


		socket.on('editar_carrera', (data) => {
					
			Carrera.findByIdAndUpdate(data._id, data, (err) => {
				if(err) {
					console.log(err)
					return socket.emit('editar_carrera', { error: 'Ocurrió un error, intente más tarde.' })
				}

				socket.emit('editar_carrera', { mensaje: 'Se actualizó exitósamente.' })
					
				listarCarrerasPorIdFacultad(socket, io, data.facultad)

			})
		})

}
