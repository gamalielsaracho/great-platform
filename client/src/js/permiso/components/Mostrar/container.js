import { connect } from 'react-redux'

import {
	mostrarFacultad
} from '../../actions'

import Mostrar from './Mostrar'

function mapStateToProps(state) {
	return {
		mostrar: state.facultad.mostrar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		mostrarFacultad: (idFacultad) => {
			dispatch(mostrarFacultad(idFacultad))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Mostrar)


