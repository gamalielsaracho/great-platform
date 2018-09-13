
export default (socket, io) => {
	require('./carrera.sockets.js')(socket, io)
	require('./materia.sockets.js')(socket, io)
}