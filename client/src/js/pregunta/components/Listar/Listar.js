import React, { Component } from 'react'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FormularioContainer from '../Formulario'
import MostarContainer from '../Mostrar'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderPreguntas = this.renderPreguntas.bind(this)
	}

	componentWillMount() {
		this.props.listarPreguntas()
	}

	shouldComponentUpdate(nextProps) {
		let condition = (
			nextProps.preguntas !== this.props.preguntas ||
			nextProps.eliminar !== this.props.eliminar
		)
		
		if(condition) {
			return true
		}else {
			return false
		}
	}	

	renderPreguntas(preguntas) {

		return <tbody>
			{
				preguntas.map((pregunta) => {
					return <tr key={pregunta.id_pregunta}>
			            <td>{ pregunta.descripcion }</td>
			            <td>
							<button type="button" onClick={() => { this.props.abrirFormularioEditarPregunta(departamento.id_pregunta) }} className="btn btn-warning btn-space">Editar</button>
							<button type="button" onClick={() => { this.props.eliminarPregunta(departamento.id_pregunta) }} className="btn btn-danger btn-space">Eliminar</button>
			            </td>
			        </tr>	
				})
			}
		</tbody>
	}

	render() {

		const { preguntas, cargando } = this.props.listar

		let error = this.props.listar.error ? this.props.listar.error :
			this.props.eliminar.error

		if(cargando) {
			return <Cargando/>
		} else {
				return <div>
					<h1 className='text-center'>Preguntas</h1>

					<FormularioContainer/>
					<MostarContainer/>

					<MensajeOerror error={error} mensaje={null}/>

					<div className='row'>
						<div className='col-xs-12 col-sm-8 col-md-6 col-lg-4'>
							<button onClick={ this.props.abrirFormularioCrearPregunta } className='btn btn-success'>Agregar</button>
						</div>
					</div>
					<br/>
					
					<div className='table-responsive'>

						<table className='table table-striped'>
							<thead>
						    	<tr>
						        	<th className='center'>Descripción</th>
						        	<th className='center'>Opciones</th>
						    	</tr>
						    </thead>

							{ this.renderPreguntas(departamentos) }

						</table>
					</div>
				</div>
		}

	}
}

export default Listar