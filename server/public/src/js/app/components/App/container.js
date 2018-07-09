import { connect } from 'react-redux'

import App from './App'

import {
	verificarTokenPersonal
} from '../../../usuario/actions'


function mapStateToProps(state) {
	return {
		usuarioEstado: state.personal.usuarioEstado
	}
}

function mapDispatchToProps(dispatch) {
	return {
		verificarTokenPersonal: (token) => {
			dispatch(verificarTokenPersonal(token))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)