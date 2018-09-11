import { connect } from 'react-redux'

import {
	listarFacultades
} from '../../actions'

import FieldSelectFacultades from './FieldSelectFacultades'

function mapStateToProps(state) {
	return {
		listar: state.facultad.listar
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarFacultades: () => {
			dispatch(listarFacultades())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldSelectFacultades)