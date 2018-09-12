import { connect } from 'react-redux'

import {
	listarCarrerasPorIdFacultad,
	eliminarCarrera,
	mostrarCarrera,

	abrirFormularioCrearCarrera,
	abrirFormularioEditarCarrera
} from '../../actions'

import Listar from './Listar'

function mapStateToProps(state) {
	return {
		eliminar: state.carrera.eliminar,
		listar: state.carrera.listar,
		carreras: state.carrera.listar.carreras
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarCarrerasPorIdFacultad: (idFacultad) => {
			dispatch(listarCarrerasPorIdFacultad(idFacultad))
		},
		eliminarCarrera: (idCarrera, idFacultad) => {
			var r = confirm("Está seguro que desea eliminar?");
		    if (r == true) {
				dispatch(eliminarCarrera(idCarrera, idFacultad))
		    }
		},
		mostrarCarrera: (idCarrera) => {
			dispatch(mostrarCarrera(idCarrera))
		},
		abrirFormularioCrearCarrera: () => {
			dispatch(abrirFormularioCrearCarrera())
		},
		abrirFormularioEditarCarrera: (idCarrera) => {
			dispatch(abrirFormularioEditarCarrera(idCarrera))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)