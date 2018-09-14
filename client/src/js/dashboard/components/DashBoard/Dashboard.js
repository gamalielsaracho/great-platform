import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import MenuContainer from '../Menu'

import MateriaRoutes from '../../../materia/components/MateriaRoutes'
import UsuarioRoutes from '../../../usuario/components/UsuarioRoutes'

import MostrarUsuarioContainer from '../../../usuario/components/Mostrar'

import ListarFacultadesContainer from '../../../facultad/components/Listar'
import MostarFacultadContainer from '../../../facultad/components/Mostrar'

import ListarPermisosContainer from '../../../permiso/components/Listar'

import ListarRolesContainer from '../../../rol/components/Listar'


class DashBoard extends Component {
	render() {

		return <div className="container-fluid">
			<div className="row">
				<MenuContainer/>

				<div className='col-xs-12 col-sm-12 col-md-10 col-lg-10 back-green'>

					<Switch>
					

						<Route path='/dashboard/permisos' component={ListarPermisosContainer} />

						<Route path='/dashboard/materias' component={MateriaRoutes} />

						<Route exact path='/dashboard/usuarios' component={UsuarioRoutes} />
						<Route path='/dashboard/usuarios/:idPersonal' component={MostrarUsuarioContainer} />


						<Route exact path='/dashboard/facultades' component={ListarFacultadesContainer} />

						<Route path='/dashboard/facultades/:idFacultad/carreras' component={MostarFacultadContainer} />
						
						<Route path='/dashboard/roles' component={ListarRolesContainer} />
					</Switch>

				</div>
			</div>
		</div>					
	}
}

export default DashBoard