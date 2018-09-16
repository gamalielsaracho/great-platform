import React, { Component } from 'react'
import { NavLink } from 'react-router-dom' 

import jwtDecode from 'jwt-decode'

class Menu extends Component {
	constructor(props) {
		super(props)
		this.renderLinksMenuByRol = this.renderLinksMenuByRol.bind(this)
		this.renderLinksAuth = this.renderLinksAuth.bind(this)

		this.rol = this.rol
		this.usuario = this.usuario
		// this.idUsuarioLst = jwtDecode(localStorage.getItem('token'))._id
	}

	renderLinksAuth(autenticado, datosToken) {
		// let personal = datosToken.personal

		if(autenticado) {
			// Para obtener el id del usuarios logeado
			// he ir al perfil de mismo.
			this.usuario = datosToken

			return <ul className="nav navbar-nav navbar-right">
			    <li>
					<NavLink to={`/perfil/${this.usuario._id}`} className='mdl-navigation__link'>
						Perfil
					</NavLink>	
			    </li>
		        <li onClick={() => { this.props.salirPersonal() }} >
		        	<a>Salir</a>
		        </li>
		    </ul>
		}else {
			return <ul className="nav navbar-nav navbar-right">
		    	<li>
			    	<NavLink to='/entrar' className="mdl-navigation__link">
						Entrar
					</NavLink>
				</li>

		    	<li>
		    		<NavLink to='/registrarse' className="mdl-navigation__link">
						Registrarse
					</NavLink>
				</li>
		    </ul>
		}
	}

	renderLinksMenuByRol(autenticado, datosToken) {
		// .... 
		if(autenticado && datosToken) {
			// console.log('DESDE MENÚ.')
			// console.log(datosToken)

			this.rol = datosToken.rol.descripcion

			if(this.rol !== 'alumno') {
				return <ul className="nav navbar-nav">
			        <li>
						<NavLink to='/dashboard' className='mdl-navigation__link'>
							Dashboard
						</NavLink>	
			        </li>
			    </ul>
			    // ....
			} else {
				return <span></span>
			}
		}else {
			return <span>
			</span>
		}
	}


	render() {
		const { error, datosToken, autenticado } = this.props.usuarioEstado

		return <nav className="navbar navbar-inverse">
		  <div className="container-fluid">
		    <div className="navbar-header">
		      <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
		        <span className="icon-bar"></span>
		        <span className="icon-bar"></span>
		        <span className="icon-bar"></span> 
		        <span className="icon-bar"></span>                        
		      </button>

		      <NavLink to='/' className="navbar-brand">
				Calificaciones estudiantes
			  </NavLink>

		    </div>
		    <div className="collapse navbar-collapse" id="myNavbar">

		      { this.renderLinksMenuByRol(autenticado, datosToken) }

			  { this.renderLinksAuth(autenticado, datosToken) }
		      
		    </div>
		  </div>
		</nav>
		
	}
}

export default Menu