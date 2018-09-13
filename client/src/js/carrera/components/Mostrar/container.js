import { connect } from 'react-redux'

import {
	mostrarCarrera
} from '../../actions'

import {
	abrirFormularioCrearMateriaCarrera,
	abrirFormularioEditarMateriaCarrera,
	eliminarMateriaCarrera
} from '../../actions/materiaActions'

import Mostrar from './Mostrar'

function mapStateToProps(state) {
	return {
		mostrar: state.carrera.mostrar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		mostrarCarrera: (idCarrera) => {
			dispatch(mostrarCarrera(idCarrera))
		},
		
		abrirFormularioCrearMateriaCarrera: () => {
			dispatch(abrirFormularioCrearMateriaCarrera())
		},

		abrirFormularioEditarMateriaCarrera: (idMateria, idCarrera) => {
			dispatch(abrirFormularioEditarMateriaCarrera(idMateria, idCarrera))
		},

		eliminarMateriaCarrera: (idMateria, idCarrera) => {
			dispatch(eliminarMateriaCarrera(idMateria, idCarrera))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Mostrar)


