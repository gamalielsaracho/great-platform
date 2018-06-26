import React, { Component } from 'react'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import jwtDecode from 'jwt-decode'

import FormularioMateriaContainer from '../Formulario'
import MostarContainer from '../Mostrar'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderMaterias = this.renderMaterias.bind(this)
		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))
	}

	componentWillMount() {
		this.props.listarMaterias()
	}
 
	shouldComponentUpdate(nextProps) {
		let condition = (
			nextProps.materias !== this.props.materias ||
			nextProps.eliminar !== this.props.eliminar
		)

		if(condition) {
			return true
		}else {
			return false
		}
	}	



	renderMaterias(materias) {
		console.log(materias)

		return <tbody>
			{
				materias.map((m) => {
					return <tr key={m._id}>
			            <td>{ m.nombre }</td>

			            <td>
							<button type="button" onClick={() => { this.props.abrirFormularioEditarMateria(m._id) }} className="myBtn">Editar</button>

							<button type="button" onClick={() => { this.props.eliminarMateria(m._id) }} className="myBtn">Eliminar</button>
			            </td>
			        </tr>		
				})
			}
		</tbody>
	}

	render() {

		const { materias, cargando } = this.props.listar

		let error = this.props.listar.error ? this.props.listar.error :
			this.props.eliminar.error

		if(cargando) {
			return <Cargando/>
		} else {
				return <div className='container'>
					<h1 className='text-center'>Materias</h1>

					

					<FormularioMateriaContainer/>
						<br/>

					<MensajeOerror error={error} mensaje={null}/>

					
					<button type="button" onClick={this.props.abrirFormularioCrearMateria} className="myBtn">Agregar</button>
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

							{ this.renderMaterias(materias) }

						</table>
					</div>


				</div>
		}

	}
}

export default Listar