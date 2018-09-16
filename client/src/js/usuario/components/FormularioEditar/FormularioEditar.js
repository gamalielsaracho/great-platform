// --------------------
import React, { Component } from 'react'
import { Field, reset } from 'redux-form'
import ReactModal from 'react-modal'

import _ from 'lodash'

import Cargando from '../../../app/components/Cargando'

import MensajeOerror from '../../../app/components/MensajeOerror'

import FieldSelectRolesContainer from '../../../rol/components/FieldSelectRoles'

import jwtDecode from 'jwt-decode'

class FormularioEditar extends Component {
	constructor(props) {
		super(props)
		this.enviarFormulario = this.enviarFormulario.bind(this)
		this.renderFormulario = this.renderFormulario.bind(this)

		this.renderFieldInput = this.renderFieldInput.bind(this)
		this.renderFieldSelectCurso = this.renderFieldSelectCurso.bind(this)

		this.renderFieldSelectRol = this.renderFieldSelectRol.bind(this)
	
		this.usuario = null
		this.usuarioLst = jwtDecode(localStorage.getItem('token'))
		this.renderSelectRolesInputByRol = this.renderSelectRolesInputByRol.bind(this)
	}


	componentWillMount() {
		this.props.listarRolesFuncion()
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
				<div className='container'>
						
						<div className='row'>
							<div className='col-xs-12 col-sm-12 col-md-3 col-lg-3'>
								<Field name="nroDocumento" type="number" component={this.renderFieldInput} label="Número de documento"/>
							</div>
							<div className='col-xs-12 col-sm-12 col-md-3 col-lg-3'>
								<Field name="nombres" type="text" component={this.renderFieldInput} label="Nombres"/>
							</div>
							<div className='col-xs-12 col-sm-12 col-md-3 col-lg-3'>
								<Field name="apellidos" type="text" component={this.renderFieldInput} label="Apellidos"/>
							</div>
							<div className='col-xs-12 col-sm-12 col-md-3 col-lg-3'>
								<Field name="curso" type="text" component={this.renderFieldSelectCurso} label="Curso"/>
							</div>
						</div>

						<div className='row'>
							<div className='col-xs-12 col-sm-12 col-md-3 col-lg-3'>
								<Field name="correo" type="email" component={this.renderFieldInput} label="Correo"/>
							</div>
							<div className='col-xs-12 col-sm-12 col-md-3 col-lg-3'>
								<Field name="contrasena" type="text" component={this.renderFieldInput} label="Contrasena"/>
							</div>
							{ this.renderSelectRolesInputByRol() }
						</div>

						<br/>
						<div className='row end-xs'>
							<div className='col-xs-12 col-sm-12 col-md-3 col-lg-3'>
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

	renderSelectRolesInputByRol() {
		var testRol = 'docente'

		var codition = (
			this.usuario.rol.descripcion == 'admin' && 
			this.props.idPersonalParam !== this.usuarioLst._id
		)

		if(codition) {
			return <div className='col-xs-12 col-sm-12 col-md-3 col-lg-3'>
				<Field name='rol' type='text' 
					component={FieldSelectRolesContainer}
					listar={this.props.listarRoles} 
					label='Rol:'/>
			</div>			 
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
		const { datosToken } = this.props.usuarioEstado

		this.usuario = datosToken

		let error = this.props.formulario.error ? this.props.formulario.error 
			: this.props.crear.error ? this.props.crear.error : this.props.editar.error 


		let abierto = abirtoEditar ? abirtoEditar : abirtoCrear

		if(abierto) {
			return <div className="main-container-modal">
				<div className="main-container-modal__content">
					<MensajeOerror error={error} mensaje={null}/>
					
					{ this.renderFormulario(cargando) }
				</div>
			</div>
		} else {
			return <span></span>
		}
	}
}

export default FormularioEditar
