import express from 'express'

var app = express()

var server = require('http').Server(app)

var io = require('socket.io')(server)

export default io

import config from './config'

// Importamos la conexión de la base de datos. 
import db from './config/db'





io.on('connection', function (socket) {
	console.log('Usuario Conectado.')

	require('././app/usuario/usuario.sockets')(socket, io)
	require('././app/calificacion/calificacion.sockets')(socket, io)
	require('././app/materia/materia.sockets')(socket, io)

	socket.on('disconnect', function () {
		console.log('Usuario Desconectado.')
	})
})


server.listen(config.server.port, function (err) {
	if(err) {
		console.log('Error al correr en el puerto 3000')
		return
	}

	console.log('Corriendo en el puerto 3000')
})