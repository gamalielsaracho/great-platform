import React, { Component } from 'react'

import ReactModal from 'react-modal'

import MensajeOerror from '../../../app/components/MensajeOerror'
import Cargando from '../../../app/components/Cargando'

class Mostrar extends Component {
	constructor(props) {
		super(props)
		this.renderCarrera = this.renderCarrera.bind(this)
		this.idCarrera = this.props.match.params.idCarrera
		this.idFacultad = this.props.match.params.idFacultad
	}

	static getIdCarrera() {
		return this.idCarrera
	}

	componentWillMount() {
		this.props.mostrarCarrera(this.idCarrera)
	}

	renderCarrera(cargando, carrera) {
		if(cargando) {
			return <Cargando/>
		} else if(carrera) {
			console.log('carrera')

			console.log(carrera)
			return <div>
				<br/>
				<h4><strong>Nombre:</strong> { carrera.descripcion }</h4>
			
				<h1 className='text-center'>Materias</h1>

			</div>
		}
	}

	render() {

		const { cargando, carrera, error, abierto } = this.props.mostrar
		
		return <div className='container'>
			<div className='row'>
				<div className='col-xs-12 col-sm-6 col-md-6 col-lg-6 col-centered'>
					<MensajeOerror error={error} mensaje={null}/>

					{ this.renderCarrera(cargando, carrera) }
				</div>
			</div>
		</div>
	}
}

export default Mostrar