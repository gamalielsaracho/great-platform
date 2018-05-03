import express from 'express'

var app = express()

var server = require('http').Server(app)

var io = require('socket.io')(server)

// Importamos la conexión de la base de datos. 
import db from './config/db'


require('././app/pregunta/pregunta.sockets')(io)


server.listen(3000, function (err) {
	if(err) {
		console.log('Error al correr en el puerto 3000')
		return
	}

	console.log('Corriendo en el puerto 3000')
})