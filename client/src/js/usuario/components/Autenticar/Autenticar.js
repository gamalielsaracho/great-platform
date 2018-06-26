import React, { Component } from 'react'

import { Field, reduxForm } from 'redux-form'

import Cargando from '../../../app/components/Cargando'

import MensajeOerror from '../../../app/components/MensajeOerror'


const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
	<input className="mdl-textfield__input" {...input} type={type}  id={label}/>

	<label className="mdl-textfield__label" htmlFor={label}>{label}</label>
	
	{ touched && ((error && <p>{ error }</p>)) }
  </div>
)

class Autenticar extends Component {
	constructor(props) {
		super(props)
		this.enviarFormulario = this.enviarFormulario.bind(this)
		this.renderFormulario = this.renderFormulario.bind(this)
	}

	enviarFormulario(formProps) {
		this.props.autenticarPersonal(formProps)
	}


	renderFormulario(cargando) {
		const { handleSubmit, pristine, reset, submitting } = this.props		

		if(cargando) {
			return <Cargando/>
		} else {
			return <div className="row center-xs">
				<div className='col-xs-11 col-sm-6 col-md-4 col-lg-4'>
					<form onSubmit={handleSubmit(this.enviarFormulario)}>
						<Field name="correo" type="email" component={renderField} label="Correo"/>
						<br/>
						<Field name="contrasena" type="password" component={renderField} label="Contraseña"/>
						<br/>

						<div className='row end-lg end-md end-sm end-xs'>
							<div className='col-xs-11 col-sm-6 col-md-4 col-lg-4'>
								<button type="submit" disabled={pristine || submitting} className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
									Enviar
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>

		}
	}



	render() {
		const { cargando, error } = this.props.autenticacion
		
		// console.log(this.props.autenticacion)

		return <div className='container'>

			<MensajeOerror error={error} mensaje={null}/>
			<br/>
			{ this.renderFormulario(cargando) }
			
		</div>
	}
}

export default Autenticar