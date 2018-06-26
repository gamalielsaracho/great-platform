import React, { Component } from 'react'

// import {  } from '../../../globalActions'

import moment from 'moment'

import ReactModal from 'react-modal'

import MensajeOerror from '../../../app/components/MensajeOerror'
import Cargando from '../../../app/components/Cargando'


import ListarCalificacionesContainer from '../../../calificacion/components/Listar'

class Mostrar extends Component {
	constructor(props) {
		super(props)
		this.renderPersonal = this.renderPersonal.bind(this)
	}
	
	componentWillMount() {
		this.props.mostrarPersonal(this.props.urls.idPersonal)
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
				</div>

				<ListarCalificacionesContainer 
					idPersonal={this.props.urls.idPersonal}
					calificaciones={personal.calificaciones}/>
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