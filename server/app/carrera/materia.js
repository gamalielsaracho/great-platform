import Carrera from './carrera.model'

import { mostrarCarrera } from './enventsToCall'

export default (socket, io) => {

	socket.on('crear_materia_carrera', function(data) {

		 Carrera.findByIdAndUpdate(
	     data.idCarrera,
	     { $push: {"materias": data.datosCli}},
	     {  safe: true, upsert: true},
	       function(err, carrera) {
	         if(err){
	        	console.log(err);

				return socket.emit('crear_materia_carrera', { error: 'Ocurrió un error, intente más tarde.' })
	         }

		     mostrarCarrera(data.idCarrera, socket, io)
	      })
			
	})


		
	socket.on('eliminar_materia_carrera', function(data) {

		Carrera.findByIdAndUpdate(
	    data.idCarrera,
	    { $pull: { 'materias': {  _id: data._id } } },function(err, carreraSinMateria){
	      	if(err){
	       		console.log(err);
				return socket.emit('eliminar_materia_carrera', { error: 'Ocurrió un error, intente más tarde.' })
	        }

		    mostrarCarrera(data.idCarrera, socket, io)

	    });
	})



	socket.on('mostrar_materia_carrera_editar', (data) => {
			
		Carrera.findOne({"_id": data.idCarrera}, {materias: {$elemMatch: { _id: data._id }}})
		.then((dato) => {

			return socket.emit('mostrar_materia_carrera_editar', dato.materias[0])
		})
		.catch((err) => {
			console.log(err)
			return socket.emit('mostrar_materia_carrera_editar', { error: 'Ocurrió un error, intente más tarde.' })
		})
	})


	socket.on('editar_materia_carrera', (data) => {
		
		Carrera.update({'materias._id': data.datosCli._id},
		{'$set': {
			'materias.$.materia':data.datosCli.materia,
		}}, function(err, model) {
			if(err){
		    	console.log(err);
				return socket.emit('editar_materia_carrera', { error: 'Ocurrió un error, intente más tarde.' })
		    }

		    mostrarCarrera(data.idCarrera, socket, io)
		});
	})

}