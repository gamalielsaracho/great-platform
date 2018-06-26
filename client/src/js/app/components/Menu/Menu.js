import React, { Component } from 'react'
import { Link } from 'react-router' 


class Menu extends Component {
	constructor(props) {
		super(props)
		this.renderLinksMenuByRol = this.renderLinksMenuByRol.bind(this)
		this.renderLinksAuth = this.renderLinksAuth.bind(this)

	}

	renderLinksAuth(autenticado, datosToken) {
		let personal = datosToken.personal
		let rol = datosToken.rol

		if(autenticado) {
			return <ul className="nav navbar-nav navbar-right">
		        <li onClick={() => { this.props.salirPersonal() }} >
		        	<a href="#"><span className="glyphicon glyphicon-user"></span>Salir</a>
		        </li>
		    </ul>

		    {/*

				<Link to='/alumnos' className='mdl-navigation__link'>
					Alumnos
				</Link>

				<Link to='/materias' className='mdl-navigation__link'>
					Materias
				</Link>	

				<Link to='/usuarios' className='mdl-navigation__link'>
					Usuarios
				</Link>	

			    <Link to={`/perfil`} className='mdl-navigation__link'>Perfil</Link>	

			
				<a onClick={() => { this.props.salirPersonal() }} 
			    	className="mdl-navigation__link">Salir</a>
		    */}


		}else {
			return <ul className="nav navbar-nav navbar-right">
		    	<li>
			    	<Link to='/entrar' className="mdl-navigation__link">
						<span className="glyphicon glyphicon-user"></span>Entrar
					</Link>
				</li>

		    	<li>
		    		<Link to='/registrarse' className="mdl-navigation__link">
						<span className="glyphicon glyphicon-log-in"></span> Registrarse
					</Link>
				</li>
		    </ul>


			{/*					
			*/}
		}
	}

	renderLinksMenuByRol(autenticado, datosToken) {
		let personal = datosToken.personal
		let rol = datosToken.rol

		console.log("EL ROL ES -> "+rol)

		if(autenticado) {
			if(rol == "docente") {
				return <ul className="nav navbar-nav">

			    	<li className="active">
						<Link to='/dashboard' className='mdl-navigation__link'>
							dashboard
						</Link>
			    	</li>
			        <li>
					    <Link to={`/perfil`} className='mdl-navigation__link'>
					    	Perfil
					    </Link>	
			        </li>
			    </ul>
			} else if(rol == "alumno") {
				return <ul className="nav navbar-nav">
					<Link to='/alumnos' className='mdl-navigation__link'>
					Alumnos
				</Link>

				<Link to='/materias' className='mdl-navigation__link'>
					Materias
				</Link>	

				<Link to='/usuarios' className='mdl-navigation__link'>
					Usuarios
				</Link>

			        <li>
					    <Link to={`/perfil`} className='mdl-navigation__link'>
					    	Perfil
					    </Link>	
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

		      <Link to='/' className="navbar-brand">
				Sistema Notas
			  </Link>

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