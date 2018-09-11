import React, { Component }  from 'react'
import { Switch, Route } from 'react-router-dom'

import ListarMateriasContainer from '../Listar'

class MateriaRoutes extends Component {

	render() {
		return <main>
			<Switch>
				<Route exact path='/dashboard/materias' component={ListarMateriasContainer} />
			</Switch>
		</main>
	}
}

export default MateriaRoutes