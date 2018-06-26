import React, { Component } from 'react'

import MenuContainer from '../Menu'

class DashBoard extends Component {
	render() {

		return <div className="">
			<div>{ this.props.children }</div>
		</div>					
	}
}

export default DashBoard