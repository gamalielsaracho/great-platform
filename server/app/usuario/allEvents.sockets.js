
export default (socket, io) => {
	require('./usuario.sockets')(socket, io)
	require('./calificacion.sockets')(socket, io)
}