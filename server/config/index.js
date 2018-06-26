export default {

	server: {
		host: 'localhost',
		port: 3000
	},
	database: {
		host: 'localhost',
		post: 27017,
		db: 'notastudent',
		url: 'mongodb://127.0.0.1:27017/notastudent'
	},
	key: {
		privateKey: 'mysupersecretkey',
		tokenExpiry: '30d'
	},
	email: {
		username: '*****@gmail.com',
		password: '*****'
	}
}