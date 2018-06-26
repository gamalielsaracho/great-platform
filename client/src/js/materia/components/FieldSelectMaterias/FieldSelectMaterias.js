import React, { Component } from 'react'


class FieldSelectMaterias extends Component {
	constructor(props) {
		super(props)
	}

	componentWillMount() {
		this.props.listarMaterias()
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
		} else {
			return <div className='form-group'>
				<label htmlFor={label}>{label}</label>
				
				<div className='form-inline'>
					<div className='form-group'>
						<select {...input} name={name} className='form-control'>
							<option value=''>Seleccionar nivel</option>
							{
								this.props.listar.materias.map((m) => {
									return <option key={m._id} value={m._id}>
										{ m.nombre }
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

export default FieldSelectMaterias