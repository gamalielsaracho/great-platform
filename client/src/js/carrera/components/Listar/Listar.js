import React, { Component } from 'react'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import jwtDecode from 'jwt-decode'

import { NavLink } from 'react-router-dom'

import FormularioCarreraContainer from '../Formulario'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderCarreras = this.renderCarreras.bind(this)
		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))
		this.idFacultad = this.props.match.params.idFacultad
	}

	componentWillMount() {
		this.props.listarCarrerasPorIdFacultad(this.idFacultad)
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



	renderCarreras(carreras) {
		// console.log(carreras)

		if(carreras) {
			return <tbody>
				{
					carreras.map((c) => {
						return <tr key={c._id}>
				            <td>{ c.descripcion }</td>

				            <td>
								<button type="button" onClick={() => { this.props.abrirFormularioEditarCarrera(c._id) }} className="myBtn">Editar</button>
								<button type="button" onClick={() => { this.props.eliminarCarrera(c._id, this.idFacultad) }} className="myBtn">Eliminar</button>
				            	
				            	<NavLink to={`/dashboard/facultades/${this.idFacultad}/carreras/${c._id}`}>
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

		const { carreras, cargando } = this.props.listar

		let error = this.props.listar.error ? this.props.listar.error :
			this.props.eliminar.error

		if(cargando) {
			return <Cargando/>
		} else {
				return <div className='container'>
					<h1 className='text-center'>Carreras</h1>
					

					<FormularioCarreraContainer 
						idFacultad={this.idFacultad}/>
					<br/>

					<MensajeOerror error={error} mensaje={null}/>
					
					<button type="button" onClick={this.props.abrirFormularioCrearCarrera} className="myBtn">Agregar</button>
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

							{ this.renderCarreras(carreras) }

						</table>
					</div>


				</div>
		}

	}
}

export default Listar