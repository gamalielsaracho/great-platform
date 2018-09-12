import Carrera from './carrera.model'

export function listarCarreras(socket, io) {
	Carrera.find((err, carreras) => {
		// console.log(carreras)

		if(err) {
			console.log(err)
			return io.sockets.emit('listar_carreras', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
		}

		io.sockets.emit('listar_carreras', { carreras: carreras })
	})
}


export function listarCarrerasPorIdFacultad(socket, io, idFacultad) {
	Carrera.find({ facultad: idFacultad }, (err, carreras) => {
		// console.log(carreras)

		if(err) {
			console.log(err)
			return io.sockets.emit('listar_carreras_porIdFacultad', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
		}

		io.sockets.emit('listar_carreras_porIdFacultad', { carreras: carreras })
	})
}

export function mostrarCarrera(idCarrera, socket, io) {
	Carrera
	.findById(idCarrera)
	.populate('materias.materia')
	.then((carrera) => {
		if(carrera === null) {
			return socket.emit('mostrar_carrera', { error: 'No se encontró en la base de datos.' })
		}

		socket.emit('mostrar_carrera', carrera)
	})
	.catch((err) => {
		console.log(err)
		return socket.emit('mostrar_carrera', { error: 'Ocurrió un error, intente más tarde.' })

	})
}