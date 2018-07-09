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
					<div className='col-xs-12 col-sm-6 col-md-4 col-lg-4'>

						<Field name="nroDocumento" type="number" component={this.renderFieldInput} label="Número de documento"/>
						<Field name="nombres" type="text" component={this.renderFieldInput} label="Nombres"/>
						<Field name="apellidos" type="text" component={this.renderFieldInput} label="Apellidos"/>
						<Field name="curso" type="text" component={this.renderFieldSelectCurso} label="Curso"/>
						<Field name="correo" type="email" component={this.renderFieldInput} label="Correo"/>
						<Field name="contrasena" type="password" component={this.renderFieldInput} label="Contrasena"/>
								
					
						<div className='row end-lg end-md end-sm end-xs'>
							<div className='col-xs-12'>
								<button type="submit" disabled={pristine || submitting} className="myBtn">
									Enviar
								</button>
							</div>
						</div>
					</div>
				</div>
			</form>
		}
	}



	renderFieldInput({ input, label, type, meta: { touched, error, warning } }) {

		// <div>
		// 	<div className="form-group">
		// 	 	<label htmlFor={label}>{label}</label>
		//     	<input className="form-control" {...input} placeholder={label} type={type}/>
		// 	</div>
		//     { touched && ((error && <label className="text-danger">{ error }</label>)) }
		// </div>

		return <div>
			<div className="form-group">
			 	<label className='text-left' htmlFor={label}>{label}</label>

				<input className="form-control" {...input} type={type}  id={label}/>

		    	{ touched && ((error && <label className="text-danger">{ error }</label>)) }
		  	</div>
		</div>
	}


	renderFieldSelectCurso({ input, label, listaRoles, type, meta: { touched, error, warning } }) {
		return <div>
			<div className="form-group">
			 	<label className='text-left' htmlFor={label}>{label}</label>
				 	<select className="form-control" {...input} name={name} className='form-control'>
						<option value=''>Selecionar curso</option>
						<option value={1}>1°</option>
						<option value={2}>2°</option>
						<option value={3}>3°</option>
						<option value={4}>4°</option>
						<option value={5}>5°</option>
					</select>

		    	{ touched && ((error && <label className="text-danger">{ error }</label>)) }
		  	</div>
		</div>
	}


	render() {
			
		const { 
			abirtoCrear, abirtoEditar, personal 
		} = this.props.formulario

		const { cargando } = this.props.crear


		let error = this.props.formulario.error ? this.props.formulario.error 
			: this.props.crear.error ? this.props.crear.error : this.props.editar.error 


		// let abierto = abirtoEditar ? abirtoEditar : abirtoCrear

		// if(abierto) {
			return <div className='container'>

				<MensajeOerror error={error} mensaje={null}/>
					
				{ this.renderFormulario(cargando) }
			</div>
		// } else {
		// 	return <span></span>
		// }
	}
}

export default Registrar
