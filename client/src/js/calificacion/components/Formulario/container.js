import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearCalificacion,
	editarCalificacion,
	cerrarFormularioCalificacion
} from '../../actions'

import Formulario from './Formulario'

const validate = (values) => {
 	var patronTexto = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/

	const errors = {}

	if(!values.descripcion) {
		errors.descripcion = 'Tienes que introducir una descripción.'
	}else {
		if(!patronTexto.test(values.descripcion)) {
        	errors.descripcion = 'Solo texto.'
      	} else if(values.descripcion.length < 3) {
   			errors.descripcion = 'Tiene que ser por lo menos 3 caracteres.'
      	}
	}

	return errors
}

function mapStateToProps(state) {
	return {
		formulario: state.calificacion.formulario,
		initialValues: state.calificacion.formulario.calificacion,
		enableReinitialize: state.calificacion.formulario.iniciarValores,
		editarContenido: state.calificacion.formulario.iniciarValores,

		// Para obtener el error al crear o editar.
		crear: state.calificacion.crear,
		editar: state.calificacion.editar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearCalificacion: (datosFormulario, idPersonal) => {
			dispatch(crearCalificacion(datosFormulario, idPersonal))
		},
		cerrarFormularioCalificacion: () => {
			// var r = confirm("Está seguro que desea cancelar?");
		    // if (r == true) {
				dispatch(cerrarFormularioCalificacion())
		    // }
		},
		editarCalificacion: (datosFormulario, idPersonal) => {
			dispatch(editarCalificacion(datosFormulario, idPersonal))
		}
	}
}

const form = reduxForm({
	form: 'FormularioCalificacion',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
