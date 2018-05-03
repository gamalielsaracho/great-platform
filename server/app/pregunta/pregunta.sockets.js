import Pregunta from './pregunta.model'

export default (io) => {
	var preguntaNsp = io.of('/pregunta');
	
	preguntaNsp.on('connection', function (socket) {

		console.log('Pregunta Conectado.')

		function preguntas() {
			Pregunta.find((err, preguntas) => {
				// console.log(preguntas)
				if(err) {
					console.log(err)
					
					socket.emit('listar_preguntas', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
					return
				}

				preguntaNsp.emit('listar_preguntas', { preguntas: preguntas })
			})
		}
		
		preguntas()


		socket.on('crear_pregunta', function(data) {
			
			var pregunta = new Pregunta(data)

			pregunta.save((err) => {
				if(err) {
					console.log(err)
					return socket.emit('crear_pregunta', { error: 'Ocurrió un error, intente más tarde.' })
				}

				socket.emit('crear_pregunta', { mensaje: 'Se agregó exitósamente.' })
						
				preguntas()
			})
		})


		socket.on('eliminar_pregunta', (data) => {
			Accion.findByIdAndRemove(data.idPregunta, (err) => {
				if(err) {
					console.log(err)
					socket.emit('eliminar_pregunta', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('eliminar_pregunta', { mensaje: 'Se Eliminó exitósamente.' })

				preguntas()
			})
		})


		socket.on('editar_pregunta', (data) => {
								
			Accion.findByIdAndUpdate(data.idPregunta, (err) => {
				if(err) {
					console.log(err)
					return socket.emit('editar_pregunta', { error: 'Ocurrió un error, intente más tarde.' })
				}

				socket.emit('editar_pregunta', { mensaje: 'Se actualizó exitósamente.' })
					
				preguntas()
			})
		})


		socket.on('disconnect', function () {
			console.log('Pregunta Desconectado.')
		})
	})
}
