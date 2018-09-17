import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import Cargando from '../../../app/components/Cargando'

import MensajeOerror from '../../../app/components/MensajeOerror'

import { NavLink } from 'react-router-dom'

import jwtDecode from 'jwt-decode'
import FiltroContainer from '../Filtro'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderPersonales = this.renderPersonales.bind(this)
		this.renderPersonalesContainer = this.renderPersonalesContainer.bind(this)

		this.handleChange = this.handleChange.bind(this)

		this.renderUsuarioDatos = this.renderUsuarioDatos.bind(this)
		
		// Usuario logueado desde el servidor.
		this.usuario = this.usuario,

		// botones.
		this.renderBtnMostrar = this.renderBtnMostrar.bind(this)
	}

	componentWillMount() {
		const nombreModulo = 'usuarios'
		this.props.obtenerPermisoNombreModuloIdUsuario(nombreModulo)

		this.props.listarPersonales()
	}

	renderUsuarioDatos(i) {
		console.log(i)
		// if(jwtDecode(localStorage.getItem('token'))._id != i._id) {
			return <tr key={i._id}>
				<td>{ i.nroDocumento }</td>
				<td>{ i.nombres+' '+i.apellidos }</td>
				<td>{ i.rol.descripcion }</td>
				<td>{ i.correo }</td>

				<td>
					{ this.renderBtnMostrar(i) }
				</td>
			</tr>
		// }
	}

	// shouldComponentUpdate(nextProps) {
	// 	let condition = (
	// 		nextProps.niveles !== this.props.niveles ||
	// 		nextProps.eliminar !== this.props.eliminar
	// 	)
		
	// 	if(condition) {
	// 		return true
	// 	}else {
	// 		return false
	// 	}
	// }

	handleChange(e) {
		let valoresInputActualizando = {
			nombres: ReactDOM.findDOMNode(this.refs.nombres).value,
			apellidos: ReactDOM.findDOMNode(this.refs.apellidos).value,
			correo: ReactDOM.findDOMNode(this.refs.correo).value
		}

		this.props.actualizarFormularioFiltro(valoresInputActualizando)
	}

	renderBtnMostrar(i) {
		let condition = (
			(this.permisos && this.permisos.mostrar) ||
			(this.usuario && this.usuario.rol.descripcion == 'admin')
		)

		if (condition) {
			return <NavLink to={`/dashboard/usuarios/${i._id}`}>
				<button type="button" className="myBtn">Mostrar</button>
			</NavLink>
		} else {
			return <span></span>
		}
	}

	renderPersonalesContainer(personales, error) {
		return <div className='container-fluid'>
			<h1 className='text-center'>Personas registradas</h1>

			<MensajeOerror error={error} mensaje={null}/>
			<br/>

			<div className='table-responsive'>
				<table className='table table-striped'>
					<thead>
						<tr>
							<th>CI</th>
							<th>Usuario</th>
							<th>Rol</th>
							<th>Correo</th>

							<th>Opciones</th>
						</tr>
					</thead>

					{ this.renderPersonales(personales) }

				</table>
			</div>

		</div>
	}

	renderPersonales(personales) {

		let filtro = this.props.filtro

		let con = { // Condiciones.
			nombres: filtro.nombres.trim().toLowerCase(),
			apellidos: filtro.apellidos.trim().toLowerCase(),
			correo: filtro.correo.trim().toLowerCase()
		}

		// console.log(con)


		if(con.nombres.length > 0 || con.apellidos.length > 0 || con.correo.length > 0){
			personales = this.props.filtrarPersonales(personales, con)
		}

		console.log(personales)

		if(personales) {
			return <tbody>
				{
				  personales.map((i) => {
					return this.renderUsuarioDatos(i)	
				  })
			    }
			</tbody>
		} else {
			return <span></span>
		}
		
	}


	render() { 

		const { personales, cargando, error } = this.props.listar
		let filtro = this.props.filtro

		// Desde el servidor.
		this.usuario = this.props.usuarioEstado.datosToken

		// los permisos del usuario que NO es admin
		// pero tiene algunos permisos.
		this.permisos = this.props.obtenerPermisoVerificacion.permiso

		// console.log(this.props.listar)
		// console.log(this.props.filtro)

			// <div className='row'>
			// 		<div className='col-lg-4'>
			// 			<div className="input-group">
			// 				<input className='form-control' type='text' placeholder='Nombre'
			// 				value={filtro.nombres} ref='nombres'
			// 				onChange={this.handleChange} />
			// 				</div> 
			// 			</div>
			// 		<div className='col-lg-4'>
			// 			<div className="input-group">
			// 				<input className='form-control' type='text' placeholder='Apellido'
			// 				value={filtro.apellidos} ref='apellidos'
			// 				onChange={this.handleChange}/>
			// 			</div>
			// 		</div>
			// 		<div className='col-lg-4'>
			// 			<div className="input-group">
			// 				<input className='form-control' type='text' placeholder='Correo'
			// 				value={filtro.correo} ref='correo'
			// 				onChange={this.handleChange}/>
			// 			</div>
			// 		</div>
			// 	</div>


		if(cargando) {
			return <Cargando/>
		} else {
			if(this.usuario && this.usuario.rol.descripcion == 'admin') {
				return this.renderPersonalesContainer(personales, error)
			} else if(this.permisos && this.permisos.privado) {				
				return <div className='container'>
					<h1 className='text-center'>No tienes permiso para ver este módulo</h1>
					<p>Comunicar con el admin</p>
				</div>
			} else {
				return this.renderPersonalesContainer(personales, error)
			}
		}

	}
}

export default Listar