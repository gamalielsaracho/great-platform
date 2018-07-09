import { connect } from 'react-redux'

import { 
	listarPreguntas,
	eliminarPregunta,
	mostrarPregunta,

	abrirFormularioCrearPregunta,
	abrirFormularioEditarPregunta
} from '../../actions'

import Listar from './Listar'

function mapStateToProps(state) {
	return {
		eliminar: state.pregunta.eliminar,
		listar: state.pregunta.listar,
		preguntas: state.pregunta.listar.preguntas
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarPreguntas: () => {
			dispatch(listarPreguntas())
		},
		eliminarPregunta: (idPregunta) => {
			var r = confirm("Está seguro que desea eliminar?");
		    if (r == true) {
				dispatch(eliminarPregunta(idPregunta))
		    }
		},
		mostrarPregunta: (idPregunta) => {
			dispatch(mostrarPregunta(idPregunta))
		},
		abrirFormularioCrearPregunta: () => {
			dispatch(abrirFormularioCrearPregunta())
		},
		abrirFormularioEditarPregunta: (idPregunta) => {
			dispatch(abrirFormularioEditarPregunta(idPregunta))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)