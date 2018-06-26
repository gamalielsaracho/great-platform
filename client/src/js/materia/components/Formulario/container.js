import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearMateria,
	editarMateria,
	cerrarFormularioMateria
} from '../../actions'

import Formulario from './Formulario'

const validate = (values) => {
	const errors = {}

	if(!values.descripcion) {
		errors.descripcion = 'Tienes que introducir una descripción.'
	}else if (values.descripcion.length < 5) {
		values.descripcion.toLowerCase()
   		errors.descripcion = 'Tiene que ser por lo menos 5 characteres.'
	}

	return errors
}

function mapStateToProps(state) {
	return {
		formulario: state.materia.formulario,
		initialValues: state.materia.formulario.materia,
		enableReinitialize: state.materia.formulario.iniciarValores,
		editarContenido: state.materia.formulario.iniciarValores,

		// Para obtener el error al crear o editar.
		crear: state.materia.crear,
		editar: state.materia.editar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearMateria: (datosFormulario) => {
			dispatch(crearMateria(datosFormulario))
		},
		cerrarFormularioMateria: () => {
			// var r = confirm("Está seguro que desea cancelar?");
		    // if (r == true) {
				dispatch(cerrarFormularioMateria())
		    // }
		},
		editarMateria: (datosFormulario) => {
			dispatch(editarMateria(datosFormulario))
		}
	}
}

const form = reduxForm({
	form: 'FormularioMateria',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
