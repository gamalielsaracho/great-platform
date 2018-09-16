import { connect } from 'react-redux'

import {
	listarMaterias,
	eliminarMateria,
	mostrarMateria,

	abrirFormularioCrearMateria,
	abrirFormularioEditarMateria
} from '../../actions'

import {
	obtenerPermisoNombreModuloIdUsuario
} from '../../../permiso/actions'


import Listar from './Listar'

function mapStateToProps(state) {
	return {
		eliminar: state.materia.eliminar,
		listar: state.materia.listar,
		materias: state.materia.listar.materias,

		// datos del usuario logueado. 
    	usuarioEstado: state.personal.usuarioEstado,

    	obtenerPermisoVerificacion: state.permiso.obtenerPermisoVerificacion
	}
}

function mapDispatchToProps(dispatch) {
	return {
		obtenerPermisoNombreModuloIdUsuario: (nombreModulo) => {
			dispatch(obtenerPermisoNombreModuloIdUsuario(nombreModulo))
		},

		listarMaterias: () => {
			dispatch(listarMaterias())
		},
		eliminarMateria: (idMateria) => {
			var r = confirm("Está seguro que desea eliminar?");
		    if (r == true) {
				dispatch(eliminarMateria(idMateria))
		    }
		},
		mostrarMateria: (idMateria) => {
			dispatch(mostrarMateria(idMateria))
		},
		abrirFormularioCrearMateria: () => {
			dispatch(abrirFormularioCrearMateria())
		},
		abrirFormularioEditarMateria: (idMateria) => {
			dispatch(abrirFormularioEditarMateria(idMateria))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)