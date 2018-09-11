import React, { Component } from 'react'

// import {  } from '../../../globalActions'

import moment from 'moment'

import jwtDecode from 'jwt-decode'

import ReactModal from 'react-modal'

import MensajeOerror from '../../../app/components/MensajeOerror'
import Cargando from '../../../app/components/Cargando'

import FormularioEditarPersonalContainer from '../FormularioEditar'

import ListarCalificacionesContainer from '../../../calificacion/components/Listar'

class Mostrar extends Component {
	constructor(props) {
		super(props)
		this.renderPersonal = this.renderPersonal.bind(this)

		// this.rolLst = jwtDecode(localStorage.getItem('token')).rol
		// this.idUsuarioLst = jwtDecode(localStorage.getItem('token'))._id

		this.renderBtnEditByRol = this.renderBtnEditByRol.bind(this)

		this.renderCalificacionesByRolAndId = this.renderCalificacionesByRolAndId.bind(this)
	}
	
	componentWillMount() {
			console.log('this.props.urls.idPersonal')

			console.log(this.props.match.params.idPersonal)
		
		this.props.mostrarPersonal(this.props.urls.idPersonal)
	}

	renderCalificacionesByRolAndId(idAlumnoParam, calificacionesListaParam) {
		if(jwtDecode(localStorage.getItem('token')).rol == 'admin' || jwtDecode(localStorage.getItem('token')).rol == 'docente') {
			return <ListarCalificacionesContainer 
					idAlumno={idAlumnoParam}
					calificacionesLista={calificacionesListaParam}/>
		} else {
			// console.log('this.props.urls.idPersonal')
			// console.log(this.props.match.params.idPersonal)

			// console.log('this.idUsuarioLst')
			// console.log(jwtDecode(localStorage.getItem('token'))._id)

			if(jwtDecode(localStorage.getItem('token'))._id == this.props.urls.idPersonal) {
				return <ListarCalificacionesContainer 
					idAlumno={idAlumnoParam}
					calificacionesLista={calificacionesListaParam}/>
			} else {
				return <span></span>
			}
		}
	}

	renderBtnEditByRol(personal) {
		if(jwtDecode(localStorage.getItem('token')).rol == 'admin') {
			return <button onClick={()=> { this.props.abrirFormularioEditarPersonal(personal._id) }} className='myBtn'>Editar</button>
		} else {
			// console.log('this.props.urls.idPersonal')
			// console.log(this.props.urls.idPersonal)

			// console.log('this.idUsuarioLst')
			// console.log(this.idUsuarioLst)

			if(jwtDecode(localStorage.getItem('token'))._id == this.props.urls.idPersonal) {
				return <button onClick={()=> { this.props.abrirFormularioEditarPersonal(personal._id) }} className='myBtn'>Editar</button>
			} else {
				return <span></span>
			}
		}
	}

	renderPersonal(cargando, personal) {
		// console.log(paciente)

		if(cargando) {
			return <Cargando/>
		} else if (personal){
			console.log(personal)

			return <div>
				<div className='row'>
					<div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
						<p><strong>Número de Documento:</strong> { personal.nroDocumento }</p>
						<p><strong>Nombres:</strong> { personal.nombres }</p>
						<p><strong>Apellidos:</strong> { personal.apellidos }</p>
						<p><strong>Correo:</strong> { personal.correo }</p>
						<p><strong>Curso:</strong> { personal.curso }</p>

						<br/>
					</div>
					<div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
						<FormularioEditarPersonalContainer/>

						{ this.renderBtnEditByRol(personal) }
					</div>

				</div>

				{ this.renderCalificacionesByRolAndId(this.props.urls.idPersonal, personal.calificaciones) }
				
			</div>

		}
	}

	render() {
		const customStyles = {
		    content : {
		  		height: '50vh',
		  		position: 'none'
		  	}
		}


		const { cargando, personal, error } = this.props.mostrar
		// ...
		return <div className='container'>

			<MensajeOerror error={error} mensaje={null}/>

			{ this.renderPersonal(cargando, personal) }

		</div>

	}
}

export default Mostrar