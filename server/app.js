import express from 'express'

var app = express()

var server = require('http').Server(app)

var io = require('socket.io')(server)

import config from './config'

// Importamos la conexión de la base de datos. 
import db from './config/db'

app.use(express.static('public'));


io.on('connection', function (socket) {
	console.log('Usuario Conectado.')

	require('././app/usuario/allEvents.sockets')(socket, io)
	require('././app/materia/materia.sockets')(socket, io)
	require('././app/facultad/facultad.sockets')(socket, io)


	socket.on('disconnect', function () {
		console.log('Usuario Desconectado.')
	})
})


app.get('/', function (req, res) {
	res.sendfile('./public/index.html')
})

app.get('/entrar', function (req, res) {
	res.sendfile('./public/index.html')
})

app.get('/registrarse', function (req, res) {
	res.sendfile('./public/index.html')
})

app.get('/materias', function (req, res) {
	res.sendfile('./public/index.html')
})

app.get('/usuarios', function (req, res) {
	res.sendfile('./public/index.html')
})

app.get('/perfil/:idUsuario', function (req, res) {
	console.log(req.params)
	res.sendfile('./public/index.html')
})

server.listen(config.server.port, function (err) {
	if(err) {
		console.log('Error al correr en el puerto 3000')
		return
	}

	console.log('Corriendo en el puerto 3000')
})