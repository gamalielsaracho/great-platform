import React, { Component } from 'react'
import { Switch, Route, NavLink } from 'react-router-dom'


import ReactModal from 'react-modal'

import MensajeOerror from '../../../app/components/MensajeOerror'
import Cargando from '../../../app/components/Cargando'


import ListarCarrerasContainer from '../../../carrera/components/Listar'
import MostrarCarreraContainer from '../../../carrera/components/Mostrar'


class Mostrar extends Component {
	constructor(props) {
		super(props)
		this.renderFacultad = this.renderFacultad.bind(this)
		this.idFacultad = this.props.match.params.idFacultad
	}



	componentWillMount() {
		this.props.mostrarFacultad(this.idFacultad)
	}


	renderFacultad(cargando, facultad) {
		if(cargando) {
			return <Cargando/>
		} else if(facultad) {

			return <div>
				<h3><strong>Nombre:</strong> { facultad.descripcion }</h3>
				<br/>

				<ul className="nav nav-tabs no-print-data">
				  <li className="nav-item nav-link">
				  	<NavLink to={`/dashboard/facultades/${this.idFacultad}/carreras`}>Carreras</NavLink>
				  </li>
				  <li className="nav-item nav-link">
				    <a className="nav-link">Detalle Carrera</a>
				  </li>
				</ul>

				<Switch>
					<Route exact path='/dashboard/facultades/:idFacultad/carreras' component={ListarCarrerasContainer} />
					<Route path='/dashboard/facultades/:idFacultad/carreras/:idCarrera' component={MostrarCarreraContainer} />
				</Switch>
			</div>
		}
	}

	render() {
		const { cargando, facultad, error } = this.props.mostrar

		return <div className='container'>
			<div className='row'>
				<div className='col-xs-12 col-sm-6 col-md-6 col-lg-6 col-centered'>
					<MensajeOerror error={error} mensaje={null}/>

					{ this.renderFacultad(cargando, facultad) }
				</div>
			</div>
		</div>
	}
}

export default Mostrar