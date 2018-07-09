import React, { Component } from 'react'
import { Link } from 'react-router'
import removeAccents from 'remove-accents'

import $ from 'jquery'

import jwtDecode from 'jwt-decode'

class Menu extends Component {
	constructor(props) {
		super(props)
		this.isRole = this.isRole.bind(this)

		this.adminMenu = this.adminMenu.bind(this)
		this.ventanillaMenu = this.ventanillaMenu.bind(this)
		this.enfermeriaMenu = this.enfermeriaMenu.bind(this)
		this.medicinaMenu = this.medicinaMenu.bind(this)
		this.farmaciaMenu = this.farmaciaMenu.bind(this)
		this.laboratorioMenu = this.laboratorioMenu.bind(this)

		this.state = {
			shown: true,
		};
	}

	toggle() {
		this.setState({
			shown: !this.state.shown
		});
	}

	// componentDidMount() {

	// }

	isRole(roleToCheck, toRender) {
		// let rolUsuario = 'administracion' // localStorage.
		// let rolUsuario = 'ventanilla'
		let rolUsuario = removeAccents(jwtDecode(localStorage.getItem('token')).rol)

		console.log(rolUsuario)

		if(rolUsuario == roleToCheck) {
			return toRender
		}

		return false
	}

	adminMenu() {
		

		return <div>
			<nav className="navbar navbar-inverse ">
			  <div className="container-fluid">
			    <div className="navbar-header">
			      <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span> 
			      </button>
			      <a className="navbar-brand" href="#">Más módulos</a>
			    </div>
			    <div className="collapse navbar-collapse" id="myNavbar">
			      <ul className="nav navbar-nav">
			         	<li><Link to='/dashboard/modulos-auditados'>Auditoría</Link></li>

						<li><Link to='/dashboard/personales'>Usuarios</Link></li>
						
						<li><Link to='/dashboard/tipos-documentos'>tipos documentos</Link></li>

						<li><Link to='/roles'>Roles </Link></li>
						<li><Link to='/especialidades'>Especialidades </Link></li>
						<li><Link to='/dashboard/ciudades'>Ciudades </Link></li>
						<li><Link to='/dashboard/departamentos'>Departamentos </Link></li>
						<li><Link to='/dashboard/areas'>Areas </Link></li>
						<li><Link to='/dashboard/alergias'>Alergias </Link></li>
						<li><Link to='/dashboard/pacientes'>Pacientes </Link></li>
						<li><Link to='/dashboard/niveles'>Niveles </Link></li>
						<li><Link to='/dashboard/unidades-medidas'>Unidades Medidas </Link></li>
						
						<li><Link to='/dashboard/parametros-preconsulta'>Parametros pre-consulta </Link></li>			
						<li><Link to='/dashboard/diagnosticos'>Diagnosticos </Link></li>			
						<li><Link to='/dashboard/sintomas'>Síntomas </Link></li>			
						
						<li><Link to='/dashboard/pre-consultas'>Pre-consultas </Link></li>			

						<li><Link to='/dashboard/consultas'>Consultas </Link></li>			

			      </ul>
			     
			    </div>
			  </div>
			</nav>


			<br/>
			<nav className="navbar navbar-inverse ">
			  <div className="container-fluid">
			    <div className="navbar-header">
			      <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#farmaciaAdmin">
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span> 
			      </button>
			      <a className="navbar-brand">Farmacia</a>
			    </div>
			    <div className="collapse navbar-collapse" id="farmaciaAdmin">
			      <ul className="nav navbar-nav">
					<li><Link to='/dashboard/farmaceuticas'>Farmacéuticas</Link></li>			
					<li><Link to='/dashboard/medicamentos'>Medicamentos</Link></li>			
					<li><Link to='/dashboard/drogas'>Drogas</Link></li>					
					
					<li><Link to='/dashboard/medicamentos-entregados'>Medicamentos entregados</Link></li>					

					<li><Link to='/dashboard/nombres-medicamentos'>Nombres medicamentos</Link></li>

					<li><Link to='/dashboard/presentaciones'>Presentaciones</Link></li>
		
			      </ul>
			    </div>
			  </div>
			</nav>


			<br/>
			<nav className="navbar navbar-inverse ">
			  <div className="container-fluid">
			    <div className="navbar-header">
			      <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#laboratorioAdmin">
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span> 
			      </button>
			      <a className="navbar-brand">Laboratorio</a>
			    </div>
			    <div className="collapse navbar-collapse" id="laboratorioAdmin">
			      <ul className="nav navbar-nav">
					<li><Link to='/dashboard/tipos-examenes'>Tipos examenes </Link></li>
					<li><Link to='/dashboard/unidades-medidas'>Unidades Medidas </Link></li>
					<li><Link to='/dashboard/tipos-analisis'>Tipos análisis </Link></li>
					
					<li><Link to='/dashboard/solicitudes-laboratorio'>Solicitudes </Link></li>

			      </ul>
			    </div>
			  </div>
			</nav>

		</div>
	}

	ventanillaMenu() {
		return <nav className="navbar navbar-inverse ">
			<div className="container-fluid">
			    <div className="navbar-header">
			      <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span> 
			      </button>
			      <a className="navbar-brand" href="#"></a>
			    </div>
			    <div className="collapse navbar-collapse" id="myNavbar">
			      <ul className="nav navbar-nav">
						<li><Link to='/dashboard/ciudades'>Ciudades (Ven) </Link></li>
						<li><Link to='/dashboard/tipos-documentos'>tipos documentos (Ven)</Link></li>
					
						<li><Link to='/dashboard/departamentos'>Departamentos (Ven) </Link></li>
						<li><Link to='/dashboard/areas'>Areas (Ven) </Link></li>
						<li><Link to='/dashboard/pacientes'>Pacientes (Ven) </Link></li>
			      </ul>
			    </div>
			</div>
		</nav>
	}

	enfermeriaMenu() {
			return <nav className="navbar navbar-inverse ">
			  <div className="container-fluid">
			    <div className="navbar-header">
			      <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span> 
			      </button>
			      <a className="navbar-brand" href="#"></a>
			    </div>
			    <div className="collapse navbar-collapse" id="myNavbar">
			      <ul className="nav navbar-nav">
						<li><Link to='/dashboard/ciudades'>Ciudades </Link></li>

						<li><Link to='/dashboard/departamentos'>Departamentos </Link></li>

						<li><Link to='/dashboard/areas'>Areas </Link></li>

						<li><Link to='/dashboard/pacientes'>Pacientes </Link></li>

						<li><Link to='/dashboard/unidades-medidas'>Unidades Medidas </Link></li>

						<li><Link to='/dashboard/parametros-preconsulta'>Parametros pre-consulta </Link></li>			

						<li><Link to='/dashboard/pre-consultas'>Pre-consultas </Link></li>			
			      	
			      </ul>
			    </div>
			  </div>
			</nav>
	}

	medicinaMenu() {
			return <nav className="navbar navbar-inverse ">
			  <div className="container-fluid">
			    <div className="navbar-header">
			      <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span> 
			      </button>
			      <a className="navbar-brand" href="#"></a>
			    </div>
			    <div className="collapse navbar-collapse" id="myNavbar">
			      <ul className="nav navbar-nav">
						<li><Link to='/dashboard/alergias'>Alergias (Med) </Link></li>
						<li><Link to='/dashboard/pacientes'>Pacientes (Med) </Link></li>
						<li><Link to='/dashboard/diagnosticos'>Diagnosticos (Med) </Link></li>			
						<li><Link to='/dashboard/sintomas'>Síntomas (Med) </Link></li>			
						<li><Link to='/dashboard/pre-consultas'>Pre-consultas </Link></li>			
						<li><Link to='/dashboard/consultas'>Consultas (Med) </Link></li>			
			      </ul>
			    </div>
			  </div>
			</nav>
	}

	farmaciaMenu() {
			return <nav className="navbar navbar-inverse ">
			  <div className="container-fluid">
			    <div className="navbar-header">
			      <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span> 
			      </button>
			      <a className="navbar-brand" href="#"></a>
			    </div>
			    <div className="collapse navbar-collapse" id="myNavbar">
			      <ul className="nav navbar-nav">
						<li><Link to='/dashboard/farmaceuticas'>Farmacéuticas (Farm)</Link></li>			

						<li><Link to='/dashboard/medicamentos'>Medicamentos (Farm)</Link></li>			

						<li><Link to='/dashboard/drogas'>Drogas (Farm)</Link></li>

						<li><Link to='/dashboard/medicamentos-entregados'>Medicamentos entregados (Farm)</Link></li>					

						<li><Link to='/dashboard/nombres-medicamentos'>Nombres medicamentos (Farm)</Link></li>

						<li><Link to='/dashboard/presentaciones'>Presentaciones (Farm)</Link></li>
			      </ul>
			    </div>
			  </div>
			</nav>
	}	

	laboratorioMenu() {
		return <nav className="navbar navbar-inverse ">
			<div className="container-fluid">
			    <div className="navbar-header">
			      <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span> 
			      </button>
			      <a className="navbar-brand" href="#"></a>
			    </div>
			    <div className="collapse navbar-collapse" id="myNavbar">
			      <ul className="nav navbar-nav">
					<li><Link to='/dashboard/tipos-examenes'>Tipos examenes </Link></li>
					<li><Link to='/dashboard/unidades-medidas'>Unidades Medidas </Link></li>
					<li><Link to='/dashboard/tipos-analisis'>Tipos análisis </Link></li>
					<li><Link to='/dashboard/solicitudes-laboratorio'>Solicitudes </Link></li>

			      </ul>
			    </div>
			</div>
		</nav>
	}


	render() {
		const { error, datosToken, autenticado } = this.props.usuarioEstado

		let personal = datosToken.personal
		let rol = datosToken.rol

		console.log(rol)

		if(personal) {

			return <div className='col-xs-12 col-sm-12 col-md-2 col-lg-2 back-green no-print-data'>
				<br/>
				<h4 className='text-center'>{ personal.nombres }</h4>
				<br/>
				<button type="button" className="btn btn-default btn-sm">
		          <span className="glyphicon glyphicon-exclamation-sign"></span> Ayuda
		        </button>
				<br/>
				<br/>
				

				{ this.isRole('administracion', this.adminMenu()) }
				{ this.isRole('ventanilla', this.ventanillaMenu()) }
				{ this.isRole('enfermeria', this.enfermeriaMenu()) }
				{ this.isRole('medico', this.medicinaMenu()) }
				{ this.isRole('farmacia', this.farmaciaMenu()) }
				{ this.isRole('laboratorio', this.laboratorioMenu()) }

			</div>
		} else {
			return <span></span>
		}
	}
}

export default Menu