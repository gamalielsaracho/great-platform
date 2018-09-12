import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearCarrera,
	editarCarrera,
	cerrarFormularioCarrera
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
		formulario: state.carrera.formulario,
		initialValues: state.carrera.formulario.carrera,
		enableReinitialize: state.carrera.formulario.iniciarValores,
		editarContenido: state.carrera.formulario.iniciarValores,

		// Para obtener el error al crear o editar.
		crear: state.carrera.crear,
		editar: state.carrera.editar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearCarrera: (datosFormulario) => {
			dispatch(crearCarrera(datosFormulario))
		},
		cerrarFormularioCarrera: () => {
			dispatch(cerrarFormularioCarrera())
		},
		editarCarrera: (datosFormulario) => {
			dispatch(editarCarrera(datosFormulario))
		}
	}
}

const form = reduxForm({
	form: 'FormularioCarrera',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
