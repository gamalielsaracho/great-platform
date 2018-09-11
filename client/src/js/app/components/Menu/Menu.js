import React, { Component } from 'react'
import { NavLink } from 'react-router-dom' 

import jwtDecode from 'jwt-decode'

class Menu extends Component {
	constructor(props) {
		super(props)
		this.renderLinksMenuByRol = this.renderLinksMenuByRol.bind(this)
		this.renderLinksAuth = this.renderLinksAuth.bind(this)

		// this.idUsuarioLst = jwtDecode(localStorage.getItem('token'))._id
	}

	renderLinksAuth(autenticado, datosToken) {
		let personal = datosToken.personal
		let rol = datosToken.rol

		if(autenticado) {
			return <ul className="nav navbar-nav navbar-right">
		        <li onClick={() => { this.props.salirPersonal() }} >
		        	<a>Salir</a>
		        </li>
		    </ul>

		    {/*

				<NavLink to='/alumnos' className='mdl-navigation__link'>
					Alumnos
				</NavLink>

				<NavLink to='/dashboard/materias' className='mdl-navigation__link'>
					Materias
				</NavLink>	

				<NavLink to='/dashboard/usuarios' className='mdl-navigation__link'>
					Usuarios
				</NavLink>	

			    <NavLink to={`/perfil`} className='mdl-navigation__link'>Perfil</NavLink>	

			
				<a onClick={() => { this.props.salirPersonal() }} 
			    	className="mdl-navigation__link">Salir</a>
		    */}


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


			{/*					
			*/}
		}
	}

	renderLinksMenuByRol(autenticado, datosToken) {
		let personal = datosToken.personal
		let rol = datosToken.rol

		console.log("EL ROL ES -> ")
		console.log(personal)

		if(autenticado) {
			if(rol == "docente" || rol == "admin") {
				return <ul className="nav navbar-nav">
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
					    <NavLink to={`/perfil/${jwtDecode(localStorage.getItem('token'))._id}`} className='mdl-navigation__link'>
					    	Perfil
					    </NavLink>	
			        </li>
			    	
			    </ul>
			} else if(rol == "alumno") {
				return <ul className="nav navbar-nav">

			        <li>
					    <NavLink to={`/perfil/${jwtDecode(localStorage.getItem('token'))._id}`} className='mdl-navigation__link'>
					    	Perfil
					    </NavLink>	
			        </li>
			    </ul>
			}
		}else {
			return <span>
			</span>
		}
	}


	render() {
		const { error, datosToken, autenticado } = this.props.usuarioEstado


		// console.log('this.props.usuarioEstado')

		// console.log(this.props.usuarioEstado)

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