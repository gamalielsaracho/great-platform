// --------------------
import React, { Component } from 'react'
import { Field, reset } from 'redux-form'
import ReactModal from 'react-modal'

import _ from 'lodash'

import Cargando from '../../../app/components/Cargando'

import MensajeOerror from '../../../app/components/MensajeOerror'

import jwtDecode from 'jwt-decode'

class FormularioEditar extends Component {
	constructor(props) {
		super(props)
		this.enviarFormulario = this.enviarFormulario.bind(this)
		this.renderFormulario = this.renderFormulario.bind(this)

		this.renderFieldInput = this.renderFieldInput.bind(this)
		this.renderFieldSelectCurso = this.renderFieldSelectCurso.bind(this)

		this.renderFieldSelectRol = this.renderFieldSelectRol.bind(this)
	
		// this.rolLst = jwtDecode(localStorage.getItem('token')).rol
		this.renderSelectInputByRol = this.renderSelectInputByRol.bind(this)
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
							<div className='col-xs-12 col-sm-12 col-md-10 col-lg-10'>

								<Field name="nroDocumento" type="number" component={this.renderFieldInput} label="Número de documento"/>
								<Field name="nombres" type="text" component={this.renderFieldInput} label="Nombres"/>
								<Field name="apellidos" type="text" component={this.renderFieldInput} label="Apellidos"/>
								<Field name="curso" type="text" component={this.renderFieldSelectCurso} label="Curso"/>
								
								{ this.renderSelectInputByRol() }

								<Field name="correo" type="email" component={this.renderFieldInput} label="Correo"/>
								<Field name="contrasena" type="text" component={this.renderFieldInput} label="Contrasena"/>
								
							</div>
						</div>
						<br/>
						<div className='row end-xs'>							
							<button type="submit" className="myBtn" disabled={pristine || submitting}>Guardar</button>
							<button type="button" onClick={() => { this.props.cerrarFormularioPersonal() }} className="myBtn">Cancelar</button>
						</div>
						
					</div>
				</div>
			</form>
		}
	}



	renderFieldInput({ input, label, type, meta: { touched, error, warning } }) {

		return <div>
			<div className="form-group">
			 	<label htmlFor={label}>{label}</label>
		    	<input className="form-control" {...input} placeholder={label} type={type}/>
			</div>
		    { touched && ((error && <label className="text-danger">{ error }</label>)) }
		</div>
	}

	renderSelectInputByRol() {
		// console.log('localStorage FROM rol ----->')
		// console.log(this.rolLst)

		var testRol = 'docente'

		if(jwtDecode(localStorage.getItem('token')).rol == 'admin') {
			return <Field name="rol" type="text" component={this.renderFieldSelectRol} label="Rol"/>
		} else {
			return <span></span>
		}
	}


	renderFieldSelectCurso({ input, label, listaRoles, type, meta: { touched, error, warning } }) {
		return <div>
			<div className="form-group">
			 	<label htmlFor={label}>{label}</label>
		    	<select className="" {...input} name={name} className='form-control'>
					<option value=''>Selecionar curso</option>
					<option value={1}>1°</option>
					<option value={2}>2°</option>
					<option value={3}>3°</option>
					<option value={4}>4°</option>
					<option value={5}>5°</option>
				</select>
			</div>
		    { touched && ((error && <label className="text-danger">{ error }</label>)) }
		</div>
	}

	
	renderFieldSelectRol({ input, label, listaRoles, type, meta: { touched, error, warning } }) {
		return <div>
			<div className="form-group">
			 	<label htmlFor={label}>{label}</label>
		    	<select className="" {...input} name={name} className='form-control'>
					<option value=''>Selecionar rol</option>
					<option value='alumno'>alumno</option>
					<option value='docente'>docente</option>
					<option value='admin'>admin</option>
				</select>
			</div>
		    { touched && ((error && <label className="text-danger">{ error }</label>)) }
		</div>
	}



	render() {
		
		const { 
			abirtoCrear, abirtoEditar 
		} = this.props.formulario

		const { cargando } = this.props.crear


		let error = this.props.formulario.error ? this.props.formulario.error 
			: this.props.crear.error ? this.props.crear.error : this.props.editar.error 


		let abierto = abirtoEditar ? abirtoEditar : abirtoCrear

		if(abierto) {
			return <div className=''>
				<h4 className='text-center'></h4>

				<MensajeOerror error={error} mensaje={null}/>
					
				{ this.renderFormulario(cargando) }
			</div>
		} else {
			return <span></span>
		}
	}
}

export default FormularioEditar
