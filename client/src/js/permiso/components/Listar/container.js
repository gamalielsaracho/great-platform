import { connect } from 'react-redux'

import {
	listarPermisos,
	eliminarPermiso,
	mostrarPermiso,

	abrirFormularioCrearPermiso,
	abrirFormularioEditarPermiso
} from '../../actions'

import Listar from './Listar'

function mapStateToProps(state) {
	return {
		eliminar: state.permiso.eliminar,
		listar: state.permiso.listar,
		permisos: state.permiso.listar.permisos
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarPermisos: () => {
			dispatch(listarPermisos())
		},
		eliminarPermiso: (idPermiso) => {
			var r = confirm("Está seguro que desea eliminar?");
		    if (r == true) {
				dispatch(eliminarPermiso(idPermiso))
		    }
		},
		mostrarPermiso: (idPermiso) => {
			dispatch(mostrarPermiso(idPermiso))
		},
		abrirFormularioCrearPermiso: () => {
			dispatch(abrirFormularioCrearPermiso())
		},
		abrirFormularioEditarPermiso: (idPermiso) => {
			dispatch(abrirFormularioEditarPermiso(idPermiso))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)