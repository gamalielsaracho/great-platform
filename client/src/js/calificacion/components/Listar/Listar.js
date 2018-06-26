import React, { Component } from 'react'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FormularioCalificacionContainer from '../Formulario'
import MostarNivelContainer from '../Mostrar'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderCalificaciones = this.renderCalificaciones.bind(this)
	}

	// componentWillMount() {
	// 	this.props.listarCalificaciones()
	// }

	shouldComponentUpdate(nextProps) {
		let condition = (
			nextProps.calificaciones !== this.props.calificaciones ||
			nextProps.eliminar !== this.props.eliminar
		) 
		
		if(condition) {
			return true
		}else {
			return false
		}
	}	

	renderCalificaciones(calificaciones) {

		return <tbody>
			{
				calificaciones.map((c) => {
					return <tr key={c._id}>
			            <td>{ c.nota }</td>
			            <td>
							<button type="button" onClick={() => { this.props.mostrarCalificacion(c._id) }} className="btn btn-info btn-space">Mostrar</button>
							<button type="button" onClick={() => { this.props.abrirFormularioEditarCalificacion(c._id) }} className="btn btn-warning btn-space">Editar</button>
							<button type="button" onClick={() => { this.props.eliminarCalificacion(c._id) }} className="btn btn-danger btn-space">Eliminar</button>
			            </td>
			        </tr>		
				})
			}
		</tbody>
	}

	render() {

		// const { calificaciones, cargando } = this.props.listar

		// let error = this.props.listar.error ? this.props.listar.error :
		// 	this.props.eliminar.error

		// if(cargando) {
		// 	return <Cargando/>
		// } else {
				return <div>
					<h1 className='text-center'>Calificaciones</h1>
					
					{/*
						<MostarNivelContainer/>
					<MensajeOerror error={error} mensaje={null}/>
					*/}


					

					<div className='row between-xs'>
						<div className='col-xs-12 col-sm-12 col-md-6 col-lg-4'>
							<FormularioCalificacionContainer 
								idPersonal={this.props.idPersonal}/>
							<button onClick={ this.props.abrirFormularioCrearCalificacion } className='myBtn'>Agregar</button>
							<br/>
							<br/>
						</div>

						<div className='col-xs-12 col-sm-12 col-md-6 col-lg-7'>
							<div className='table-responsive'>
								<table className='table table-striped'>
									<thead>
								    	<tr>
								        	<th>Nombre</th>
								        	<th>Opciones</th>
								    	</tr>
								    </thead>

									{ this.renderCalificaciones(this.props.calificaciones) }

								</table>
							</div>
						</div>

					</div>

					
				</div>
		// }

	}
}

export default Listar