import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import MenuContainer from '../Menu'
import HomePage from '../../pages/HomePage'

// import RegistrarPersonalContainer from '../../../usuario/components/Registrar'

import MainRoutes from '../MainRoutes'

class App extends Component {
	constructor(props) {
		super(props)
	}

	componentWillMount() {
		const token = localStorage.getItem('token')
		console.log("Token -------------------->"+ token)

		if(token) {
			this.props.verificarTokenPersonal(token)
			
			console.log("hola de el punto de entrada.")
		}else {
			console.log("no hay token..")
		}
	}

	render() {
		return <div>
			<MenuContainer/>

			<MainRoutes/>

		</div>
	}
}

export default App