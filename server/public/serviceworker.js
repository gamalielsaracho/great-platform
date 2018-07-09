
self.addEventListener('push', function (event) {
	console.log('event.data')
	var datos
	datos = JSON.parse(event.data.text())
	
	// console.log(event)
	var title = datos.materia || 'Un mensaje.'
	var options = {
		body: 'calificacion: '+datos.nota,
		tag: 'push-simple-demo-notification-tag',
		icon: 'https://greenkeeper.io/images/logo_webtorrent.png'
	}

	event.waitUntil(self.registration.showNotification(title, options))
})