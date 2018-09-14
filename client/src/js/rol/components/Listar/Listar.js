import React, { Component } from 'react'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import jwtDecode from 'jwt-decode'

import FormularioContainer from '../Formulario'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderRoles = this.renderRoles.bind(this)
		this.renderBtnByRoles = this.renderBtnByRoles.bind(this)

		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))
	}

	componentWillMount() {
		this.props.listarRoles()
	}

	renderBtnByRoles(rol) {
		const descripcion = rol.descripcion

		if(descripcion === 'admin' || descripcion === 'alumno' || descripcion === 'docente') {
			return <span></span>
		} else {
			return <span>
				<button type="button" onClick={() => { this.props.abrirFormularioEditarRol(rol._id) }} className="myBtn">Editar</button>
				<button type="button" onClick={() => { this.props.eliminarRol(rol._id) }} className="myBtn">Eliminar</button>
			</span>
		}
	}

	shouldComponentUpdate(nextProps) {
		let condition = (
			nextProps.roles !== this.props.roles ||
			nextProps.eliminar !== this.props.eliminar
		)

		if(condition) {
			return true
		}else {
			return false
		}
	}	



	renderRoles(roles) {
		if(roles) {
			return <tbody>
				{
					roles.map((rol) => {
						return <tr key={rol._id}>
				            <td>{ rol.descripcion }</td>
				            <td>
				            	{ this.renderBtnByRoles(rol) }
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

		const { roles, cargando } = this.props.listar

		let error = this.props.listar.error ? this.props.listar.error :
			this.props.eliminar.error

		if(cargando) {
			return <Cargando/>
		} else {
				return <div className='container-fluid'>
					<h1 className='text-center'>Roles</h1>
					
					<FormularioContainer/>

					<MensajeOerror error={error} mensaje={null}/>

					<div className='row'>
						<div className='col-xs-12 col-sm-8 col-md-6 col-lg-4'>
							<button type="button" onClick={this.props.abrirFormularioCrearRol} className="myBtn">Agregar</button>
						</div>
					</div>
					<br/>
					<br/>

					{/*
					*/}

					<div className='table-responsive'>
						<table className='table table-striped'>
							<thead>
						    	<tr>
						        	<th>Nombre</th>
						        	<th>Opciones</th>
						    	</tr>
						    </thead>

							{ this.renderRoles(roles) }

						</table>
					</div>
				</div>
		}

	}
}

export default Listar