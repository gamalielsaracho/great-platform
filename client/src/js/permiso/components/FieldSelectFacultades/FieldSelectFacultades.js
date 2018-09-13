import React, { Component } from 'react'


class FieldSelectFacultades extends Component {
	constructor(props) {
		super(props)
	}

	componentWillMount() {
		this.props.listarFacultades()
	}


	render() {
		const { input, label, type, meta: { touched, error, warning } } = this.props

		if(this.props.listar.cargando) {
			return <div className='form-group'>
				<label htmlFor={label}>{label}</label>
				
				<div className='form-inline'>
					<div className='form-group'>
						<span className="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> Cargando facultades...
					</div>
				</div>
			</div>
		} else {
			return <div className='form-group'>
				<label htmlFor={label}>{label}</label>
				
				<div className='form-inline'>
					<div className='form-group'>
						<select {...input} name={name} className='form-control'>
							<option value=''>Seleccionar</option>
							{
								this.props.listar.facultades.map((f) => {
									return <option key={f._id} value={f._id}>
										{ f.descripcion }
									</option>
								})
							}
						</select>
					</div>

			    	{ touched && ((error && <div><br/><label className="text-danger">{ error }</label></div>)) }
				</div>
			</div>
		}
	}
}

export default FieldSelectFacultades