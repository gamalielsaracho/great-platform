import React, { Component } from 'react'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import jwtDecode from 'jwt-decode'

import FormularioMateriaContainer from '../Formulario'
import MostarContainer from '../Mostrar'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderMateriasContainer = this.renderMateriasContainer.bind(this)

		this.renderMaterias = this.renderMaterias.bind(this)
		// this.personalLocalSt = jwtDecode(localStorage.getItem('token'))

		// Usuario logueado desde el servidor.
		this.usuario = this.usuario
		
		// botones.
		this.renderBtnCrear = this.renderBtnCrear.bind(this)
		this.renderBtnEditar = this.renderBtnEditar.bind(this)
		this.renderBtnEliminar = this.renderBtnEliminar.bind(this)
	}

	componentWillMount() {
		const nombreModulo = 'materias'
		this.props.obtenerPermisoNombreModuloIdUsuario(nombreModulo)
		this.props.listarMaterias()
	}

	renderBtnCrear(habilitado) {
		if (habilitado) {
			return <button type="button" onClick={this.props.abrirFormularioCrearMateria} className="myBtn">Agregar</button>
		} else {
			return <span></span>
		}
	}

	renderBtnEditar(habilitado, m) {
		if (habilitado) {
			return <button type="button" onClick={() => { this.props.abrirFormularioEditarMateria(m._id) }} className="myBtn">Editar</button>
		} else {
			return <span></span>
		}
	}

	renderBtnEliminar(habilitado, m) {
		if (habilitado) {
			return <button type="button" onClick={() => { this.props.eliminarMateria(m._id) }} className="myBtn">Eliminar</button>
		} else {
			return <span></span>
		}
	}
 

	// shouldComponentUpdate(nextProps) {
	// 	let condition = (
	// 		nextProps.materias !== this.props.materias ||
	// 		nextProps.eliminar !== this.props.eliminar
	// 	)

	// 	if(condition) {
	// 		return true
	// 	}else {
	// 		return false
	// 	}
	// }	

	renderMateriasContainer(materias, error) {
		return <div className='container'>
			<h1 className='text-center'>Materias</h1>

			<FormularioMateriaContainer/>
			<br/>

			<MensajeOerror error={error} mensaje={null}/>

			{ this.renderBtnCrear(this.permisos.crear) }			
			
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


	renderMaterias(materias) {
		// console.log(materias)
		if (materias) {
			return <tbody>
				{
					materias.map((m) => {
						return <tr key={m._id}>
				            <td>{ m.nombre }</td>

				            <td>
				            	{ this.renderBtnEditar(this.permisos.editar, m) }

				            	{ this.renderBtnEliminar(this.permisos.eliminar, m) }

				            </td>
				        </tr>		
					})
				}
			</tbody>
		} else {
			return <tbody></tbody>
		}
	}

	render() {
		const { materias, cargando } = this.props.listar

		// Desde el servidor.
		this.usuario = this.props.usuarioEstado.datosToken

		let error = this.props.listar.error ? this.props.listar.error :
			this.props.eliminar.error

		if(cargando) {
			return <Cargando/>
		} else {
			if(this.usuario && this.usuario.rol.descripcion == 'admin') {
				return this.renderMateriasContainer(materias, error)
			} else {
				// los permisos del usuario que NO es admin
				// pero tiene algunos permisos.
				this.permisos = this.props.obtenerPermisoVerificacion.permiso
				
				if (this.permisos) {
					if(this.permisos.privado) {
						return <div className='container'>
							<h1 className='text-center'>No tienes permiso para ver este módulo</h1>
							<p>Comunicar con el admin</p>
						</div>
					} else {
						console.log('<----- this.permisos ------>')
						console.log(this.permisos)
						return this.renderMateriasContainer(materias, error)
					}
				} else {
					return <span></span>
				}
			}
		}

	}
}

export default Listar