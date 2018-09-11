import React, { Component }  from 'react'
import { Switch, Route } from 'react-router-dom'

import HomePage from '../../../app/pages/HomePage'

import RegistrarPersonalContainer from '../../../usuario/components/Registrar'
import AutenticarContainer from '../../../usuario/components/Autenticar'

import MateriaRoutes from '../../../materia/components/MateriaRoutes'
import UsuarioRoutes from '../../../usuario/components/UsuarioRoutes'

class MainRoutes extends Component {

	render() {
		return <main>
			<Switch>
				<Route exact path='/' component={HomePage} />
				<Route path='/registrarse' component={RegistrarPersonalContainer} />
				<Route path='/entrar' component={AutenticarContainer} />
				
				<Route exact path='/dashboard/materias' component={MateriaRoutes} />

				<Route exact path='/dashboard/usuarios' component={UsuarioRoutes} />

			</Switch>
		</main>
	}
}

export default MainRoutes