import React, { Component } from 'react'
import { Field, reset } from 'redux-form'
import ReactModal from 'react-modal'

import _ from 'lodash'

import Cargando from '../../../app/components/Cargando'

import MensajeOerror from '../../../app/components/MensajeOerror'

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
	}

	enviarFormulario(formProps) {		
		console.log(formProps)

		if(this.props.editarContenido) {
			this.props.editarFacultad(formProps)
		} else {
			this.props.crearFacultad(formProps)
		}
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
			return <div className='container'>
					<h4 className='text-center'></h4>

					<div className='row'>
						<div className='col-xs-12 col-sm-6 col-md-4 col-lg-4'>
							<MensajeOerror error={error} mensaje={null}/>
							{ this.renderCargando(cargando) }

							<form onSubmit={handleSubmit(this.enviarFormulario)}>
								
								<Field name='descripcion' type='text' component={renderField} label='Nombre'/>
														

							<div className='row end-xs'>
								<button type="submit" className="myBtn" disabled={pristine || submitting}>Guardar</button>
								<button type="button" onClick={ this.props.cerrarFormularioFacultad } className="myBtn">Cancelar</button>
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
