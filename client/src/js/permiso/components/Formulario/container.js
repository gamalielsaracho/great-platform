import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearPermiso,
	editarPermiso,
	cerrarFormularioPermiso
} from '../../actions'

import {
	listarPersonales
} from '../../../usuario/actions'


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
		formulario: state.permiso.formulario,
		initialValues: state.permiso.formulario.permiso,
		enableReinitialize: state.permiso.formulario.iniciarValores,
		editarContenido: state.permiso.formulario.iniciarValores,


		listarPersonales: state.personal.listar,

		// Para obtener el error al crear o editar.
		crear: state.permiso.crear,
		editar: state.permiso.editar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearPermiso: (datosFormulario) => {
			dispatch(crearPermiso(datosFormulario))
		},
		cerrarFormularioPermiso: () => {
			dispatch(cerrarFormularioPermiso())
		},
		editarPermiso: (datosFormulario) => {
			dispatch(editarPermiso(datosFormulario))
		},


		listarPersonalesFuncion: () => {
			dispatch(listarPersonales())
		}
	}
}

const form = reduxForm({
	form: 'FormularioPermiso',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
