import React, { Component } from 'react'
import { Field, reset } from 'redux-form'
import ReactModal from 'react-modal'

import _ from 'lodash'

import Cargando from '../../../app/components/Cargando'

import MensajeOerror from '../../../app/components/MensajeOerror'

import FieldSelectPersonalesContainer from '../../../usuario/components/FieldSelectPersonales'


const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
	<div className="form-group">
	 	<label htmlFor={label}>{label}</label>
    	<input className="form-control" {...input} placeholder={label} type={type}/>
	</div>
    { touched && ((error && <label className="text-danger">{ error }</label>)) }
  </div>
)

class Formulario extends Component {
	constructor(props) {
		super(props)
		this.enviarFormulario = this.enviarFormulario.bind(this)
		this.renderCargando = this.renderCargando.bind(this)
		this.renderFieldCheckbox = this.renderFieldCheckbox.bind(this)
		this.renderFieldSelectModulos = this.renderFieldSelectModulos.bind(this)
	}

	enviarFormulario(formProps) {		
		console.log(formProps)

		if(this.props.editarContenido) {
			this.props.editarPermiso(formProps)
		} else {
			this.props.crearPermiso(formProps)
		}
	}

	renderFieldSelectModulos({ input, label, type, meta: { touched, error, warning } }) {
		let modulos = [
			{ id: 1, description: 'materias' },
			{ id: 2, description: 'usuarios' },
			{ id: 3, description: 'facultades' },
			{ id: 4, description: 'carreras' }
		]

		return <div>
			<div className='form-group'>
			    <label htmlFor={label}>{label}</label>
				<select {...input} name={name} className='form-control'>
					<option value=''>Seleccionar módulo</option>
					{
						modulos.map((m) => {
							return <option key={m.id} value={m.description}>
								{ m.description }
							</option>
						})
					}
							
				</select>
			</div>
		</div>
	}


	renderFieldCheckbox({ input, name, label, type, value, meta: { touched, error, warning } }) {
		return <div>
			<div className='form-group'>
				<label className="radio-inline">
			    	<input type={type} name={name} value={value} {...input}/>
					<strong>{label}</strong>
				</label>
				{ touched && ((error && <label className="text-danger">{ error }</label>)) }
			</div>
		</div>
	}

	componentWillMount() {
		this.props.listarPersonalesFuncion()
	}

	renderCargando(cargando) {
		if(cargando) {
			return <Cargando/>
		} else {
			return <span></span>
		}
	}

	render() {

		const { handleSubmit, pristine, reset, submitting } = this.props		
		
		const { 
			abirtoCrear, abirtoEditar, cargando 
		} = this.props.formulario

		let error = this.props.formulario.error ? this.props.formulario.error 
			: this.props.crear.error ? this.props.crear.error : this.props.editar.error 


		let abierto = abirtoEditar ? abirtoEditar : abirtoCrear

		if(abierto) {
			return <div className='container-fluid'>

					<div className='row'>
						<div className='col-xs-12 col-sm-6 col-md-4 col-lg-4'>
							<MensajeOerror error={error} mensaje={null}/>
							{ this.renderCargando(cargando) }

							<form onSubmit={handleSubmit(this.enviarFormulario)}>
								
								<Field name='usuario' type='text' 
									component={FieldSelectPersonalesContainer}
									listar={this.props.listarPersonales} 
									label='Usuario:'/>

								<Field name='modulo' 
									type='text'
									component={this.renderFieldSelectModulos} 
									label='Módulo'/>
								
								<Field name='editar' type='checkbox' component={this.renderFieldCheckbox} value='editar' label='Editar'/>
								<Field name='crear' type='checkbox' component={this.renderFieldCheckbox} value='crear' label='Crear'/>
								<Field name='eliminar' type='checkbox' component={this.renderFieldCheckbox} value='eliminar' label='Eliminar'/>
								<Field name='mostrar' type='checkbox' component={this.renderFieldCheckbox} value='mostrar' label='Mostrar'/>

														

							<div className='row end-xs'>
								<button type="submit" className="myBtn" disabled={pristine || submitting}>Guardar</button>
								<button type="button" onClick={ this.props.cerrarFormularioPermiso } className="myBtn">Cancelar</button>
							</div>
							</form>
						</div>


					</div>
				</div>
		} else {
			return <span></span>
		}
	}
}

export default Formulario
