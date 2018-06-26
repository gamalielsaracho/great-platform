import io from '../../app'

import nsp from '../nsp'

var socketsAll = {

	calificacionSocket: nsp.materiaNsp.on('connection', function (socket) {
		
		return socket

		socket.on('disconnect', function () {
			console.log('Materia Desconectado.')
		})
	})
}

export default socketsAll