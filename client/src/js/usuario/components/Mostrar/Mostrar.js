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

		// Usuario logueado desde el servidor.
		this.usuario = this.usuario

		// Usuario Local.
		this.usuarioLst = jwtDecode(localStorage.getItem('token'))

		this.renderBtnEditByRol = this.renderBtnEditByRol.bind(this)
		this.renderCalificacionesByRolAndId = this.renderCalificacionesByRolAndId.bind(this)
	}
	
	componentWillMount() {
		// console.log('this.props.match.params.idPersonal')
		// console.log(this.props.match.params.idPersonal)
		
		this.props.mostrarPersonal(this.props.match.params.idPersonal)
	}

	renderCalificacionesByRolAndId(idAlumnoParam, calificacionesListaParam) {
		if(this.usuarioLst.rol == 'admin' || this.usuarioLst.rol == 'docente') {
			return <ListarCalificacionesContainer 
					idAlumno={idAlumnoParam}
					calificacionesLista={calificacionesListaParam}/>
		} else {
			if(this.usuarioLst._id == this.props.match.params.idPersonal) {
				return <ListarCalificacionesContainer 
					idAlumno={idAlumnoParam}
					calificacionesLista={calificacionesListaParam}/>
			} else {
				return <span></span>
			}
		}
	}


	renderBtnEditByRol(personal) {

		if(this.usuario.rol.descripcion == 'admin') {
			return <button onClick={()=> { this.props.abrirFormularioEditarPersonal(personal._id) }} className='myBtn'>Editar</button>
		} else {
			if(this.usuarioLst._id === this.props.match.params.idPersonal) {
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
						<FormularioEditarPersonalContainer
							idPersonalParam={this.props.match.params.idPersonal}/>

						{ this.renderBtnEditByRol(personal) }
					</div>

				</div>

				{ this.renderCalificacionesByRolAndId(this.props.match.params.idPersonal, personal.calificaciones) }
				
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
		const { datosToken } = this.props.usuarioEstado

		this.usuario = datosToken
		// ...

		return <div className='container'>

			<MensajeOerror error={error} mensaje={null}/>

			{ this.renderPersonal(cargando, personal) }

		</div>

	}
}

export default Mostrar