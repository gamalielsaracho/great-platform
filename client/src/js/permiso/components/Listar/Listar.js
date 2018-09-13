import React, { Component } from 'react'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import jwtDecode from 'jwt-decode'

import { NavLink } from 'react-router-dom'

import FormularioPermisoContainer from '../Formulario'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderPermisos = this.renderPermisos.bind(this)
		this.renderConfirmation = this.renderConfirmation.bind(this)
		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))
	}

	componentWillMount() {
		this.props.listarPermisos()
	}
 
	renderConfirmation(confirmation) {
		if (confirmation) {
			return <p>Sí</p>
		} else {
			return <p>No</p>
		}
	}

	// shouldComponentUpdate(nextProps) {
	// 	let condition = (
	// 		nextProps.materias !== this.props.materias ||
	// 		nextProps.eliminar !== this.props.eliminar
	// 	)

	// 	if(condition) {
	// 		return true
	// 	}else {
	// 		return false
	// 	}
	// }	



	renderPermisos(permisos) {
		// console.log(permisos)

		if (permisos) {
			return <tbody>
				{
					permisos.map((p) => {
						return <tr key={p._id}>
				            <td>{ p.usuario.nombres + p.usuario.apellidos}</td>
				            <td>{ p.modulo }</td>


				            <td>{ this.renderConfirmation(p.mostrar) }</td>
							<td>{ this.renderConfirmation(p.editar) }</td>
							<td>{ this.renderConfirmation(p.eliminar) }</td>
							<td>{ this.renderConfirmation(p.crear) }</td>
				            
				            <td>
								<button type="button" onClick={() => { this.props.abrirFormularioEditarPermiso(p._id) }} className="myBtn">Editar</button>
								<button type="button" onClick={() => { this.props.eliminarPermiso(p._id) }} className="myBtn">Eliminar</button>
				            </td>
				        </tr>		
					})
				}
			</tbody>
		} else {
			return <tbody></tbody>
		}
	}

	render() {

		const { permisos, cargando } = this.props.listar

		let error = this.props.listar.error ? this.props.listar.error :
			this.props.eliminar.error

		if(cargando) {
			return <Cargando/>
		} else {
				return <div className='container-fluid'>
					<h1 className='text-center'>Permisos</h1>

					<FormularioPermisoContainer/>
					<br/>

					<MensajeOerror error={error} mensaje={null}/>
					
					<button type="button" onClick={this.props.abrirFormularioCrearPermiso} className="myBtn">Agregar</button>
					<br/>
					<br/>
						
					<div className='table-responsive'>
						<table className='table table-striped'>
							<thead>
								<tr>
									<th>Usuario</th>
									<th>Módulo</th>

									<th>Mostrar</th>
									<th>Editar</th>
									<th>Eliminar</th>
									<th>Crear</th>


									<th>Opciones</th>
								</tr>
							</thead>

							{ this.renderPermisos(permisos) }

						</table>
					</div>

				</div>
		}

	}
}

export default Listar