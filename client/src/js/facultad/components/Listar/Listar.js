import React, { Component } from 'react'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import jwtDecode from 'jwt-decode'

import { NavLink } from 'react-router-dom'

import FormularioFacultadContainer from '../Formulario'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderFacultades = this.renderFacultades.bind(this)
		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))
	}

	componentWillMount() {
		this.props.listarFacultades()
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



	renderFacultades(facultades) {
		// console.log(facultades)

		if (facultades) {
			return <tbody>
				{
					facultades.map((f) => {
						return <tr key={f._id}>
				            <td>{ f.descripcion }</td>

				            <td>
								<button type="button" onClick={() => { this.props.abrirFormularioEditarFacultad(f._id) }} className="myBtn">Editar</button>

								<button type="button" onClick={() => { this.props.eliminarFacultad(f._id) }} className="myBtn">Eliminar</button>
								
								<NavLink to={`/dashboard/facultades/${f._id}/carreras`}>
									<button type="button" className="myBtn">Mostrar</button>
								</NavLink>
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

		const { facultades, cargando } = this.props.listar

		let error = this.props.listar.error ? this.props.listar.error :
			this.props.eliminar.error

		if(cargando) {
			return <Cargando/>
		} else {
				return <div className='container'>
					<h1 className='text-center'>Facultades</h1>


					<FormularioFacultadContainer/>
					<br/>

					<MensajeOerror error={error} mensaje={null}/>

					
					<button type="button" onClick={this.props.abrirFormularioCrearFacultad} className="myBtn">Agregar</button>
					<br/>
					<br/>
						
					<div className='table-responsive'>
						<table className='table table-striped'>
							<thead>
								<tr>
									<th>Nombre</th>

									<th>Opciones</th>
								</tr>
							</thead>

							{ this.renderFacultades(facultades) }

						</table>
					</div>

				</div>
		}

	}
}

export default Listar