import Usuario from './usuario.model'

import { listarUsuarios, mostrarUsuario } from './enventsToCall'


export default (socket, io) => {
	listarUsuarios(socket, io)


	socket.on('crear_calificacion', function(data) {

		 Usuario.findByIdAndUpdate(
	     data.idAlumno,
	     { $push: {"calificaciones": data.datosCli}},
	     {  safe: true, upsert: true},
	       function(err, usuario) {
	         if(err){
	        	console.log(err);

				return socket.emit('crear_calificacion', { error: 'Ocurrió un error, intente más tarde.' })
	         }

			 mostrarUsuario(data.idAlumno)		        
		        
	      })
			
	})


		
	socket.on('eliminar_calificacion', function(data) {
		// console.log("EL ID idAlumno-->: "+data.idAlumno)
		// console.log("EL ID calificacion -->: "+data._id)

		Usuario.findByIdAndUpdate(
	    data.idAlumno,
	    { $pull: { 'calificaciones': {  _id: data._id } } },function(err, usuarioSinDato){
	      	if(err){
	       		console.log(err);
				return socket.emit('eliminar_calificacion', { error: 'Ocurrió un error, intente más tarde.' })
	        }

			mostrarUsuario(data.idAlumno)		        
	    });
	})



	socket.on('mostrar_calificacion_editar', (data) => {
			
		Usuario.findOne({"_id": data.idAlumno}, {calificaciones: {$elemMatch: { _id: data._id }}})
		.then((dato) => {
			// console.log("LA Calificacion--->")
			// console.log(dato.calificaciones[0])

			return socket.emit('mostrar_calificacion_editar', dato.calificaciones[0])
		})
		.catch((err) => {
			console.log(err)
			return socket.emit('mostrar_calificacion_editar', { error: 'Ocurrió un error, intente más tarde.' })
		})
	})


	socket.on('editar_calificacion', (data) => {
		// 'calificaciones.$.': "this is Update comment",
		
		Usuario.update({'calificaciones._id': data.datosCli._id},
		{'$set': {
			'calificaciones.$.materia':data.datosCli.materia,
			'calificaciones.$.oportunidad':data.datosCli.oportunidad,
			'calificaciones.$.nota':data.datosCli.nota,
			'calificaciones.$.fechaExamen':data.datosCli.fechaExamen,
			'calificaciones.$.observaciones':data.datosCli.observaciones,
			'calificaciones.$.fechaActualizacion':data.datosCli.fechaActualizacion
		}}, function(err, model) {
			if(err){
		    	console.log(err);
				return socket.emit('editar_calificacion', { error: 'Ocurrió un error, intente más tarde.' })
		    }

			mostrarUsuario(data.idAlumno)
		});
	})

}