import { connect } from 'react-redux'

import {
	listarMaterias
} from '../../actions'

import FieldSelectMaterias from './FieldSelectMaterias'

function mapStateToProps(state) {
	return {
		listar: state.materia.listar
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarMaterias: () => {
			dispatch(listarMaterias())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldSelectMaterias)