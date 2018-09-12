import { connect } from 'react-redux'

import {
	mostrarCarrera
} from '../../actions'

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
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Mostrar)


