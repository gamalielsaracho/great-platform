import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearFacultad,
	editarFacultad,
	cerrarFormularioFacultad
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
		formulario: state.facultad.formulario,
		initialValues: state.facultad.formulario.facultad,
		enableReinitialize: state.facultad.formulario.iniciarValores,
		editarContenido: state.facultad.formulario.iniciarValores,

		// Para obtener el error al crear o editar.
		crear: state.facultad.crear,
		editar: state.facultad.editar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearFacultad: (datosFormulario) => {
			dispatch(crearFacultad(datosFormulario))
		},
		cerrarFormularioFacultad: () => {
			dispatch(cerrarFormularioFacultad())
		},
		editarFacultad: (datosFormulario) => {
			dispatch(editarFacultad(datosFormulario))
		}
	}
}

const form = reduxForm({
	form: 'FormularioFacultad',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
