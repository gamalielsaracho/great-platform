import React, { Component }  from 'react'
import { Switch, Route } from 'react-router-dom'

import ListarUsuariosContainer from '../Listar'

import MostrarUsuarioContainer from '../Mostrar'


class UsuarioRoutes extends Component {

	render() {
		return <main>
			<Switch>
				<Route exact path='/dashboard/usuarios' component={ListarUsuariosContainer} />
				<Route path='/dashboard/usuarios/:idPersonal' component={MostrarUsuarioContainer} />
				
			</Switch>
		</main>
	}
}

export default UsuarioRoutes