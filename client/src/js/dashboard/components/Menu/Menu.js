import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'


import $ from 'jquery'

import jwtDecode from 'jwt-decode'

class Menu extends Component {
	constructor(props) {
		super(props)
	}


	// componentDidMount() {

	// }

	

	render() {
		return <div className='col-xs-12 col-sm-12 col-md-2 col-lg-2 back-green no-print-data'>
			<strong className='text-center'>Menú</strong>	

			<ul className="">
			    <li>
					<NavLink to='/dashboard/materias' className='mdl-navigation__link'>
						Materias
					</NavLink>	
			    </li>

			    <li>
					<NavLink to='/dashboard/usuarios' className='mdl-navigation__link'>
						Usuarios
					</NavLink>
			    </li>
			    <li>
					<NavLink to='/dashboard/facultades' className='mdl-navigation__link'>
						Facultades
					</NavLink>
			    </li>
			     <li>
					<NavLink to='/dashboard/permisos' className='mdl-navigation__link'>
						Permisos
					</NavLink>
			    </li>

			</ul>
		</div>
		
	}
}

export default Menu