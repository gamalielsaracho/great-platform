import React, { Component } from 'react'
import jwtDecode from 'jwt-decode'

import moment from 'moment'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FormularioCalificacionContainer from '../Formulario'
import MostarNivelContainer from '../Mostrar'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderCalificaciones = this.renderCalificaciones.bind(this)

		this.renderBtnAgregarCalificacion = this.renderBtnAgregarCalificacion.bind(this)
		this.renderBtnsOptions = this.renderBtnsOptions.bind(this)
		
	}

	// componentWillMount() {
	// 	this.props.listarCalificaciones(this.props.idPersonal)
	// }

	// shouldComponentUpdate(nextProps) {
	// 	let condition = (
	// 		nextProps.calificacionesLista !== this.props.calificacionesLista ||
	// 		nextProps.eliminar !== this.props.eliminar
	// 	) 
		
	// 	if(condition) {
	// 		return true
	// 	}else {
	// 		return false
	// 	}
	// }	

	renderCalificaciones(calificaciones) {
		console.log(calificaciones)

		if(calificaciones) {
			return <tbody>
				{
					calificaciones.map((c) => {
						return <tr key={c._id}>
				            <td>{ c.materia.nombre }</td>
				            <td>{ c.nota }</td>
				            <td>{ c.oportunidad }</td>
				            <td>{ c.observaciones }</td>
				            <td>{ c.docente.nombres+' '+c.docente.apellidos }</td>

				            <td>{ moment(c.fechaCreacion).format('D-M-Y') }</td>
				            <td>{ moment(c.fechaActualizacion).format('D-M-Y') }</td>

				            
				            { this.renderBtnsOptions(c) }
				        </tr>		
					})
				}
			</tbody>
		} else {
			return <span></span>
		}
	}

	renderBtnAgregarCalificacion() {
		if(jwtDecode(localStorage.getItem('token')).rol == 'admin' || jwtDecode(localStorage.getItem('token')).rol == 'docente') {
			return <button onClick={ this.props.abrirFormularioCrearCalificacion } className='myBtn'>Agregar</button>
		} else {
			return <span></span>
		}
	}


	renderBtnsOptions(c) {
		if(jwtDecode(localStorage.getItem('token')).rol == 'admin' || jwtDecode(localStorage.getItem('token')).rol == 'docente') {
			return <td>
				<button type="button" onClick={() => { this.props.abrirFormularioEditarCalificacion(c._id, this.props.idAlumno) }} className="myBtn">Editar</button>
				<button type="button" onClick={() => { this.props.eliminarCalificacion(c._id, this.props.idAlumno) }} className="myBtn">Eliminar</button>
			</td>
		} else {
			return <span></span>
		}
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
						<div className='col-xs-12 col-sm-12 col-md-3 col-lg-2'>
							<FormularioCalificacionContainer 
								idAlumno={this.props.idAlumno}/>
							<br/>
							{ this.renderBtnAgregarCalificacion() }
						</div>

						<div className='col-xs-12 col-sm-12 col-md-9 col-lg-10'>
							<div className='table-responsive'>
								<table className='table table-striped'>
									<thead>
								    	<tr>
								        	<th>Materia</th>
								        	<th>Nota</th>
								        	<th>Oportunidad</th>
								        	<th>Observaciones</th>
								        	<th>Docente</th>
								        	<th>Creado</th>
								        	<th>Actualizado</th>


								        	<th>Opciones</th>
								    	</tr>
								    </thead>

								    {console.log(this.props.calificacionesLista)} 
									{ this.renderCalificaciones(this.props.calificacionesLista) }

								</table>
							</div>
						</div>

					</div>

					
				</div>
		// }

	}
}

export default Listar