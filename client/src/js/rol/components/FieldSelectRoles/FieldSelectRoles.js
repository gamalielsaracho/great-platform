import React, { Component } from 'react'


class FieldSelectRoles extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		const { input, label, type, meta: { touched, error, warning } } = this.props

		if(this.props.listar.cargando) {
			return <div className='form-group'>
				<label htmlFor={label}>{label}</label>
				
				<div className='form-inline'>
					<div className='form-group'>
						<span className="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> Cargando niveles...
					</div>
				</div>
			</div>
		} else if(this.props.listar.roles) {
			return <div className='form-group'>
				<label htmlFor={label}>{label}</label>
				
				<div className='form-inline'>
					<div className='form-group'>
						<select {...input} name={name} className='form-control'>
							<option value=''>Seleccionar</option>
							{
								this.props.listar.roles.map((r) => {
									return <option key={r._id} value={r._id}>
										{ r.descripcion }
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

export default FieldSelectRoles