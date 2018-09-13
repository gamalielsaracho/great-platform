import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearMateriaCarrera,
	editarMateriaCarrera,
	cerrarFormularioMateriaCarrera
} from '../../actions/materiaActions'

import {
	listarMaterias
} from '../../../materia/actions'

import FormularioMateria from './FormularioMateria'

const validate = (values) => {
	const errors = {}

	if(!values.materia) {
		errors.materia = 'Tienes que introducir una descripción.'
	}

	return errors
}

function mapStateToProps(state) {
	return {
		formularioMateria: state.carrera.formularioMateria,
		initialValues: state.carrera.formularioMateria.materia,
		enableReinitialize: state.carrera.formularioMateria.iniciarValores,
		editarContenido: state.carrera.formularioMateria.iniciarValores,

		// select Materias.
		listar: state.materia.listar,

		// Para obtener el error al crear o editar.
		crear: state.carrera.crear,
		editar: state.carrera.editar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearMateriaCarrera: (datosFormulario, idCarrera) => {
			dispatch(crearMateriaCarrera(datosFormulario, idCarrera))
		},
		cerrarFormularioMateriaCarrera: () => {
			dispatch(cerrarFormularioMateriaCarrera())
		},
		editarMateriaCarrera: (datosFormulario, idCarrera) => {
			dispatch(editarMateriaCarrera(datosFormulario, idCarrera))
		},

		// select materias.
		listarMaterias: () => {
			dispatch(listarMaterias())
		}
	}
}

const form = reduxForm({
	form: 'FormularioMateriaCarrera',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(FormularioMateria))
