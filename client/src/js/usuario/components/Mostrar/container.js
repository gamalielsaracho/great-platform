import { connect } from 'react-redux'

import {
	mostrarPersonal,
	abrirFormularioEditarPersonal
} from '../../actions'

import {
	obtenerPermisoNombreModuloIdUsuario
} from '../../../permiso/actions'

import Mostrar from './Mostrar'

function mapStateToProps(state, ownProps) {
	return {
		mostrar: state.personal.mostrar,

		// datos del usuario logueado. 
    	usuarioEstado: state.personal.usuarioEstado,

    	obtenerPermisoVerificacion: state.permiso.obtenerPermisoVerificacion,    	
    	
		// guardamos todos los parametros de la url.
		urls: ownProps.params
	}
}


function mapDispatchToProps(dispatch) {
	return {
		obtenerPermisoNombreModuloIdUsuario: (nombreModulo) => {
			dispatch(obtenerPermisoNombreModuloIdUsuario(nombreModulo))
		},

		mostrarPersonal: (idPersonal) => {
			dispatch(mostrarPersonal(idPersonal))
		},
		abrirFormularioEditarPersonal: (idPersonal) => {
			dispatch(abrirFormularioEditarPersonal(idPersonal))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Mostrar)


