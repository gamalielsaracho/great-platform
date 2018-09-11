import { connect } from 'react-redux'

import {
	listarFacultades,
	eliminarFacultad,
	mostrarFacultad,

	abrirFormularioCrearFacultad,
	abrirFormularioEditarFacultad
} from '../../actions'

import Listar from './Listar'

function mapStateToProps(state) {
	return {
		eliminar: state.facultad.eliminar,
		listar: state.facultad.listar,
		facultades: state.facultad.listar.facultades
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarFacultades: () => {
			dispatch(listarFacultades())
		},
		eliminarFacultad: (idFacultad) => {
			var r = confirm("Está seguro que desea eliminar?");
		    if (r == true) {
				dispatch(eliminarFacultad(idFacultad))
		    }
		},
		mostrarFacultad: (idFacultad) => {
			dispatch(mostrarFacultad(idFacultad))
		},
		abrirFormularioCrearFacultad: () => {
			dispatch(abrirFormularioCrearFacultad())
		},
		abrirFormularioEditarFacultad: (idFacultad) => {
			dispatch(abrirFormularioEditarFacultad(idFacultad))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)