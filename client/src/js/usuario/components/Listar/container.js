import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import { 
	listarPersonales,
	actualizarFormularioFiltro,

	abrirFormularioCrearPersonal,
	abrirFormularioEditarPersonal
} from '../../actions'

import {
	obtenerPermisoNombreModuloIdUsuario
} from '../../../permiso/actions'

import Listar from './Listar'


function mapStateToProps(state) {
	return {
		listar: state.personal.listar,

		// datos del usuario logueado. 
    	usuarioEstado: state.personal.usuarioEstado,

    	obtenerPermisoVerificacion: state.permiso.obtenerPermisoVerificacion,    	
    	
		filtro: state.personal.filtro
	}
}


function mapDispatchToProps(dispatch) {
	return {
		obtenerPermisoNombreModuloIdUsuario: (nombreModulo) => {
			dispatch(obtenerPermisoNombreModuloIdUsuario(nombreModulo))
		},

		abrirFormularioEditarPersonal: (idPersonal) => {
			dispatch(abrirFormularioEditarPersonal(idPersonal))
		},
		abrirFormularioCrearPersonal: () => {
			dispatch(abrirFormularioCrearPersonal())
		},
		listarPersonales: () => {
			dispatch(listarPersonales())
		},
		actualizarFormularioFiltro: (valores) => {
			dispatch(actualizarFormularioFiltro(valores))
		},
		filtrarPersonales: (personales, valores) => {
 			console.log("el apellido es: "+valores.apellidos)
 			
 			personales = personales.filter((dato) => {
 				return dato.personal.apellidos.toLowerCase().match(valores.apellidos) &&
 					dato.personal.nombres.toLowerCase().match(valores.nombres) &&
 					dato.personal.correo.toLowerCase().match(valores.correo)
 			})
 
 			// console.log(personales)
 
 			return personales
 		}
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Listar)