import express from 'express'

var app = express()

var server = require('http').Server(app)

var io = require('socket.io')(server)

import config from './config'

// Importamos la conexión de la base de datos. 
import db from './config/db'


require('././app/rol/rol.sockets')(io)

require('././app/usuario/usuario.sockets')(io)

require('././app/calificacion/calificacion.sockets')(io)


server.listen(config.server.port, function (err) {
	if(err) {
		console.log('Error al correr en el puerto 3000')
		return
	}

	console.log('Corriendo en el puerto 3000')
})