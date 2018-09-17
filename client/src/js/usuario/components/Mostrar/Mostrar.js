import React, { Component } from 'react'

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

		this.permisos = this.permisos

		// Usuario Local.
		this.usuarioLst = jwtDecode(localStorage.getItem('token'))

		this.renderBtnEditar = this.renderBtnEditar.bind(this)
	}
	
	componentWillMount() {
		const nombreModulo = 'usuarios'
		this.props.obtenerPermisoNombreModuloIdUsuario(nombreModulo)

		this.props.mostrarPersonal(this.props.match.params.idPersonal)
	}

	renderBtnEditar(i) {
		let condition = (
			(this.permisos && this.permisos.editar) ||
			(this.usuario && this.usuario.rol.descripcion == 'admin') ||
			(this.usuarioLst._id === this.props.match.params.idPersonal)
		)

		if(condition) {
			return <button onClick={()=> { this.props.abrirFormularioEditarPersonal(i._id) }} className='myBtn'>Editar</button>
		} else {
			return <span></span>
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

						{ this.renderBtnEditar(personal) }
					</div>

				</div>

				<ListarCalificacionesContainer 
					idAlumno={this.props.match.params.idPersonal}
					calificacionesLista={personal.calificaciones}/>
			</div>

		}
	}

	render() {

		const { cargando, personal, error } = this.props.mostrar
		const { datosToken } = this.props.usuarioEstado

		this.usuario = datosToken

		// Desde el servidor.
		this.usuario = this.props.usuarioEstado.datosToken

		// los permisos del usuario que NO es admin
		// pero tiene algunos permisos.
		this.permisos = this.props.obtenerPermisoVerificacion.permiso

		return <div className='container'>

			<MensajeOerror error={error} mensaje={null}/>

			{ this.renderPersonal(cargando, personal) }

		</div>

	}
}

export default Mostrar