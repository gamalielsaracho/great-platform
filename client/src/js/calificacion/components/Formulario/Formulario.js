import React, { Component } from 'react'
import { Field, reset } from 'redux-form'
import ReactModal from 'react-modal'

import _ from 'lodash'

import Cargando from '../../../app/components/Cargando'

import MensajeOerror from '../../../app/components/MensajeOerror'

import FieldSelectMateriasContainer from '../../../materia/components/FieldSelectMaterias'

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
		this.renderFormulario = this.renderFormulario.bind(this)

		this.renderFieldOptionsOportunidades = this.renderFieldOptionsOportunidades.bind(this)

	}

	enviarFormulario(formProps) {				
		console.log(formProps)

		if(this.props.editarContenido) {
			this.props.editarCalificacion(formProps, this.props.idPersonal)
		} else {
			this.props.crearCalificacion(formProps, this.props.idPersonal)
		}
	}

	renderFieldOptionsOportunidades({ input, label, type, meta: { touched, error, warning } }) {
		return <div className='form-group'>
			<label htmlFor={label}>{label}</label>
				
			<div className='form-inline'>
				<div className='form-group'>
					<select {...input} name={name} className='form-control'>
						<option value='1°'>1°</option>
						<option value='2°'>2°</option>
						<option value='3°'>3°</option>
						<option value='extraordinario'>extraordinario</option>
					</select>
				</div>

			   	{ touched && ((error && <div><br/><label className="text-danger">{ error }</label></div>)) }
			</div>
		</div>
	}

	renderFormulario(cargando) {
		const { handleSubmit, pristine, reset, submitting } = this.props		

		if(cargando) {
			return <Cargando/>
		} else {
			return <div className='row'>
				<div className='col-xs-12 col-sm-6 col-md-6 col-lg-4'>
					<form onSubmit={handleSubmit(this.enviarFormulario)}>
						
						<Field name='_id' type='text' component={FieldSelectMateriasContainer} label='Materia'/>
						
						<Field name='oportunidad' type='text' component={this.renderFieldOptionsOportunidades} label='Oportunidad'/>

						<Field name='nota' type='text' component={renderField} label='Nota'/>
							
						<div className='row end-xs'>							
							<button type="submit" className="myBtn" disabled={pristine || submitting}>Guardar</button>
							<button type="button" onClick={() => { this.props.cerrarFormularioCalificacion() }} className="myBtn">Cancelar</button>
						</div>
					</form>
				</div>
			</div>
		}
	}

	render() {
		// const customStyles = {
		//     content : {
		//   		height: '40vh',
		//   		position: 'none'
		//   	}
		// }
		
		const { 
			abirtoCrear, abirtoEditar, cargando, nivel 
		} = this.props.formulario

		let error = this.props.formulario.error ? this.props.formulario.error 
			: this.props.crear.error ? this.props.crear.error : this.props.editar.error 


		let abierto = abirtoEditar ? abirtoEditar : abirtoCrear

		if(abierto) {
			return <div className='container'>
				<h4 className='text-center'></h4>

				<MensajeOerror error={error} mensaje={null}/>
					
				{ this.renderFormulario(cargando) }
			</div>
		} else {
			return <span></span>
		}
	}
}

export default Formulario
