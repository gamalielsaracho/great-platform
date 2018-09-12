import React, { Component }  from 'react'
import { Switch, Route } from 'react-router-dom'

import HomePage from '../../../app/pages/HomePage'

import RegistrarPersonalContainer from '../../../usuario/components/Registrar'
import AutenticarContainer from '../../../usuario/components/Autenticar'

import MateriaRoutes from '../../../materia/components/MateriaRoutes'
import UsuarioRoutes from '../../../usuario/components/UsuarioRoutes'

import MostrarUsuarioContainer from '../../../usuario/components/Mostrar'

import ListarFacultadesContainer from '../../../facultad/components/Listar'
import MostarFacultadContainer from '../../../facultad/components/Mostrar'


class MainRoutes extends Component {

	render() {
		return <main>
			<Switch>
				<Route exact path='/' component={HomePage} />
				<Route path='/registrarse' component={RegistrarPersonalContainer} />
				<Route path='/entrar' component={AutenticarContainer} />
				
				<Route exact path='/dashboard/materias' component={MateriaRoutes} />

				<Route exact path='/dashboard/usuarios' component={UsuarioRoutes} />
				<Route path='/dashboard/usuarios/:idPersonal' component={MostrarUsuarioContainer} />


				<Route exact path='/dashboard/facultades' component={ListarFacultadesContainer} />

				<Route path='/dashboard/facultades/:idFacultad/carreras' component={MostarFacultadContainer} />

			</Switch>
		</main>
	}
}

export default MainRoutes