import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import Cargando from '../../../app/components/Cargando'

import { NavLink } from 'react-router-dom'

import jwtDecode from 'jwt-decode'

import FiltroContainer from '../Filtro'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderPersonales = this.renderPersonales.bind(this)
		this.handleChange = this.handleChange.bind(this)

		this.renderUsuarioDatos = this.renderUsuarioDatos.bind(this)

		// this.idUsuarioLst = jwtDecode(localStorage.getItem('token'))._id
	}

	componentWillMount() {
		this.props.listarPersonales()
	}

	renderUsuarioDatos(i) {
		console.log(i)
		// if(jwtDecode(localStorage.getItem('token'))._id != i._id) {
			return <tr key={i._id}>
				<td>{ i.nroDocumento }</td>
				<td>{ i.nombres+' '+i.apellidos }</td>
				<td>{ i.correo }</td>

				<td>
					<NavLink to={`/dashboard/usuarios/${i._id}`}>
						<button type="button" className="myBtn">Mostrar</button>
					</NavLink>
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

		console.log(this.props.listar)
		console.log(this.props.filtro)
		

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
		}else {
			return <div className='container'>
				<h1 className='text-center'>Personas registradas</h1>

						
					<div className='table-responsive'>
						<table className='table table-striped'>
							<thead>
								<tr>
									<th>CI</th>
									<th>Nombre</th>
									<th>Correo</th>

									<th>Opciones</th>
								</tr>
							</thead>

							{ this.renderPersonales(personales) }

						</table>
					</div>

			</div>
		}
	}
}

export default Listar