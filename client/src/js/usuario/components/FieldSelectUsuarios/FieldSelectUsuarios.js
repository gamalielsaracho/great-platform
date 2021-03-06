import React, { Component } from 'react'

class FieldSelectUsuarios extends Component {
	constructor(props) {
		super(props)
		this.dataUserFormServer = this.props.usuarioEstado.datosToken 
	}

	render() {
		const { input, valoresFiltro, label, listar, 
			type, meta: { touched, error, warning } } = this.props
			

		if(listar.cargando) {
			return <p>Cargando Personales..</p>
		} else {

			let personales = listar.personales

			if(valoresFiltro != null) {
				personales = personales.filter((i) => {
					return i.especialidad.id_especialidad == valoresFiltro.id_especialidad
				})
			}

			return <div>
				<div className='form-group'>
					<label htmlFor={label}>{label}</label>

					<select {...input} name={name} className='form-control'>
						<option value=''>Seleccionar usuario</option>
						
						{
							personales.map((i) => {
								if(i._id !== this.dataUserFormServer._id || i.rol !== 'admin') {
									return <option key={i._id} value={i._id}>
										{ i.nombres+ i.apellidos } 
									</option>
								}
							})
						}
					</select>
				</div>
			   	{ touched && ((error && <label className="text-danger text-center">{ error }</label>)) }
			</div>
		}
	}
}

export default FieldSelectUsuarios