import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

// import { 
// } from '../../actions'

import FieldSelectUsuarios from './FieldSelectUsuarios'

function mapStateToProps(state) {
	return {
		usuarioEstado: state.personal.usuarioEstado
	}
}


function mapDispatchToProps(dispatch) {
	return {
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(FieldSelectUsuarios)