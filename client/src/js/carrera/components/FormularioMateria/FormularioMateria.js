import React, { Component } from 'react'
import { Field, reset } from 'redux-form'

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

class FormularioMateria extends Component {
	constructor(props) {
		super(props)
		this.enviarFormulario = this.enviarFormulario.bind(this)
		this.renderFormulario = this.renderFormulario.bind(this)
	}

	enviarFormulario(formProps) {		
		console.log(formProps)

		if(this.props.editarContenido) {
			this.props.editarMateriaCarrera(formProps, this.props.idCarrera)
		} else {
			this.props.crearMateriaCarrera(formProps, this.props.idCarrera)
		}
	}


	componentWillMount() {
		this.props.listarMaterias()
	}

	renderFormulario(cargando) {
		const { handleSubmit, pristine, reset, submitting } = this.props		

		if(cargando) {
			return <Cargando/>
		} else {
			return <div className='row'>
				<div className='col-xs-12 col-sm-6 col-md-4 col-lg-4'>
					<form onSubmit={handleSubmit(this.enviarFormulario)}>
						
						<Field name='materia' type='text' 
							component={FieldSelectMateriasContainer}
							listar={this.props.listar} 
							label='Materia:'/>

						<div className='row end-xs'>
							<button type="submit" className="myBtn" disabled={pristine || submitting}>Guardar</button>
							<button type="button" onClick={ this.props.cerrarFormularioMateriaCarrera } className="myBtn">Cancelar</button>
						</div>
					</form>
				</div>
			</div>
		}
	}

	render() {
		
		const { 
			abirtoCrear, abirtoEditar, cargando 
		} = this.props.formularioMateria

		let error = this.props.formularioMateria.error ? this.props.formularioMateria.error 
			: this.props.crear.error ? this.props.crear.error : this.props.editar.error 


		let abierto = abirtoEditar ? abirtoEditar : abirtoCrear

		if(abierto) {
			return <div className='container'>

				<MensajeOerror error={error} mensaje={null}/>

				{ this.renderFormulario(cargando) }
			</div>
		} else {
			return <span></span>
		}
	}
}

export default FormularioMateria
