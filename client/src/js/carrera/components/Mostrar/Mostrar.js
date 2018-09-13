import React, { Component } from 'react'

import ReactModal from 'react-modal'

import MensajeOerror from '../../../app/components/MensajeOerror'
import Cargando from '../../../app/components/Cargando'

import FormularioMateriaCarreraContainer from '../FormularioMateria'

class Mostrar extends Component {
	constructor(props) {
		super(props)
		this.renderCarrera = this.renderCarrera.bind(this)
		this.renderMaterias = this.renderMaterias.bind(this)

		this.idCarrera = this.props.match.params.idCarrera
		this.idFacultad = this.props.match.params.idFacultad
	}

	renderMaterias(materias) {
		return <div className='container'>
			<h1 className='text-center'>Materias</h1>

			<FormularioMateriaCarreraContainer
					idCarrera={this.idCarrera}/>

			<button type="button" onClick={this.props.abrirFormularioCrearMateriaCarrera} className="myBtn">Agregar</button>

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

					<tbody>
						{
							materias.map((i) => {
								return <tr key={i._id}>
									<td>{ i.materia.nombre }</td>

									<td>
										<button type="button" onClick={() => { this.props.abrirFormularioEditarMateriaCarrera(i._id, this.idCarrera) }} className="myBtn">Editar</button>
										<button type="button" onClick={() => { this.props.eliminarMateriaCarrera(i._id, this.idCarrera) }} className="myBtn">Eliminar</button>
									</td>
								</tr>		
							})
						}
					</tbody>
				</table>
			</div>


		</div>
	}

	componentWillMount() {
		this.props.mostrarCarrera(this.idCarrera)
	}

	renderCarrera(cargando, carrera) {
		if(cargando) {
			return <Cargando/>
		} else if(carrera) {
			// console.log('carrera')
			// console.log(carrera)

			return <div>
				<br/>
				<h4><strong>Nombre:</strong> { carrera.descripcion }</h4>

				{ this.renderMaterias(carrera.materias) }
			</div>
		}
	}

	render() {
		const { cargando, carrera, error, abierto } = this.props.mostrar
		console.log(carrera)
		
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