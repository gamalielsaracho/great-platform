import { connect } from 'react-redux'

import {
	listarCalificaciones,
	eliminarCalificacion,
	mostrarCalificacion,

	abrirFormularioCrearCalificacion,
	abrirFormularioEditarCalificacion
} from '../../actions'

import Listar from './Listar'

function mapStateToProps(state) {
	return {
		eliminar: state.calificacion.eliminar,
		listar: state.calificacion.listar,
		calificaciones: state.calificacion.listar.calificaciones
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarCalificaciones: () => {
			dispatch(listarCalificaciones())
		},
		eliminarCalificacion: (idCalificacion) => {
			var r = confirm("Está seguro que desea eliminar ?");
		    if (r == true) {
				dispatch(eliminarCalificacion(idCalificacion))
		    }
		},
		mostrarCalificacion: (idCalificacion) => {
			dispatch(mostrarCalificacion(idCalificacion))
		},
		abrirFormularioCrearCalificacion: () => {
			dispatch(abrirFormularioCrearCalificacion())
		},
		abrirFormularioEditarCalificacion: (idCalificacion) => {
			dispatch(abrirFormularioEditarCalificacion(idCalificacion))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)