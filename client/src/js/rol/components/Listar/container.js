import { connect } from 'react-redux'

import {
	listarRoles,
	eliminarRol,
	mostrarRol,

	abrirFormularioCrearRol,
	abrirFormularioEditarRol
} from '../../actions'

import Listar from './Listar'

function mapStateToProps(state) {
	return {
		eliminar: state.rol.eliminar,
		listar: state.rol.listar,
		roles: state.rol.listar.roles
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarRoles: () => {
			dispatch(listarRoles())
		},
		eliminarRol: (idRol) => {
			var r = confirm("Está seguro que desea eliminar?");
		    if (r == true) {
				dispatch(eliminarRol(idRol))
		    }
		},
		mostrarRol: (idRol) => {
			dispatch(mostrarRol(idRol))
		},
		abrirFormularioCrearRol: () => {
			dispatch(abrirFormularioCrearRol())
		},
		abrirFormularioEditarRol: (idRol) => {
			dispatch(abrirFormularioEditarRol(idRol))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)