// --------------------
import React, { Component } from 'react'
import { Field, reset } from 'redux-form'
import ReactModal from 'react-modal'

import _ from 'lodash'

import Cargando from '../../../app/components/Cargando'

import MensajeOerror from '../../../app/components/MensajeOerror'


class Registrar extends Component {
	constructor(props) {
		super(props)
		this.enviarFormulario = this.enviarFormulario.bind(this)
		this.renderFormulario = this.renderFormulario.bind(this)

		this.renderFieldInput = this.renderFieldInput.bind(this)
		this.renderFieldSelectCurso = this.renderFieldSelectCurso.bind(this)

	}


	enviarFormulario(formProps) {				
		console.log(formProps)

		if(this.props.editarContenido) {
			this.props.editarPersonal(formProps)
		} else {
			this.props.registrarPersonal(formProps)
		}
	}


	renderFormulario(cargando) {
		const { handleSubmit, pristine, reset, submitting } = this.props		

		if(cargando) {
			return <Cargando/>
		} else {
			return <form onSubmit={handleSubmit(this.enviarFormulario)}>
				<div className='row center-xs'>
					<div className='col-xs-12 col-sm-12 col-md-7 col-lg-7'>
						<div className='row'>
							<div className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>

								<Field name="nroDocumento" type="number" component={this.renderFieldInput} label="Número de documento"/>
								<Field name="nombres" type="text" component={this.renderFieldInput} label="Nombres"/>
								<Field name="apellidos" type="text" component={this.renderFieldInput} label="Apellidos"/>
								<Field name="curso" type="text" component={this.renderFieldSelectCurso} label="Curso"/>
								<Field name="correo" type="email" component={this.renderFieldInput} label="Correo"/>
								<Field name="contrasena" type="password" component={this.renderFieldInput} label="Contrasena"/>
								
							</div>
						</div>
					
						<div className='row end-lg end-md end-sm end-xs'>
							<button type="submit" disabled={pristine || submitting} className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
								Enviar
							</button>
						</div>
					</div>
				</div>
			</form>
		}
	}



	renderFieldInput({ input, label, type, meta: { touched, error, warning } }) {

		return <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
			<input className="mdl-textfield__input" {...input} type={type}  id={label}/>

			<label className="mdl-textfield__label" htmlFor={label}>{label}</label>
			
			{ touched && ((error && <p>{ error }</p>)) }
	  	</div>
	}


	renderFieldSelectCurso({ input, label, listaRoles, type, meta: { touched, error, warning } }) {
		return <div className="mdl-textfield">
			
			<select className="" {...input} name={name} className='form-control'>
				<option value=''>Selecionar curso</option>
				<option value={1}>1°</option>
				<option value={2}>2°</option>
				<option value={3}>3°</option>
				<option value={4}>4°</option>
				<option value={5}>5°</option>
			</select>
			<label className="mdl-textfield__label" htmlFor={label}>{label}</label>

		   	{ touched && ((error && <p>{ error }</p>)) }
		</div>
	}


	render() {
		const customStyles = {
		    content : {
		  		height: '95vh',
		  		position: 'none'
		  	}
		}
		
		const { 
			abirtoCrear, abirtoEditar, personal 
		} = this.props.formulario

		const { cargando } = this.props.crear


		let error = this.props.formulario.error ? this.props.formulario.error 
			: this.props.crear.error ? this.props.crear.error : this.props.editar.error 


		let abierto = abirtoEditar ? abirtoEditar : abirtoCrear

		// if(abierto) {
			return <div className='container'>
				<h4 className='text-center'>Formulario Personal</h4>

				<MensajeOerror error={error} mensaje={null}/>
					
				{ this.renderFormulario(cargando) }
			</div>
		// } else {
		// 	return <span></span>
		// }
	}
}

export default Registrar
