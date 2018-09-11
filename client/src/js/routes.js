// import React from 'react'
// import { Route, IndexRoute } from 'react-router-dom'


// // App Principal de la aplicación.
// import AppContainer from './app/components/App'

// import HomePage from './app/pages/HomePage'

// import RegistrarPage from './usuario/pages/RegistrarPage'

// import AutenticarPage from './usuario/pages/AutenticarPage'


// import ListarMateriasPage from './materia/pages/ListarMateriasPage'


// import ListarPage from './usuario/pages/ListarPage'

// import MostrarPersonalContainer from './usuario/components/Mostrar'


// 			// { medicamentoEntregadoRoutes }
// export default (
// 	<Route path='/' component={AppContainer}>
// 		<IndexRoute component={HomePage}/>
// 		<Route path='/entrar' component={AutenticarPage}/>
// 		<Route path='/registrarse' component={RegistrarPage}/>


// 		<Route path='/materias' component={ListarMateriasPage}/>

// 		<Route path='/usuarios' component={ListarPage}/>

// 		<Route path='/usuarios/:idPersonal' component={MostrarPersonalContainer}/>
		
// 		<Route path='/perfil/:idPersonal' component={MostrarPersonalContainer}/>


// 	</Route>)

import HomePage from './app/pages/HomePage'

import RegistrarPersonalContainer from './././usuario/components/Registrar'


// import PostsRoutes from './post/components/PostsRoutes'

// import ShowPost from './post/components/ShowPost'

// allRoutes configuration.
// import { fetchPosts, fetchPost } from './post/actions'


const routes = [
	{
		path: '/',
		component: HomePage,
		exact: true
	}, 
	{
		path:'/registrarse',
		exact: true,
		component: RegistrarPersonalContainer,
		initialData: () => {
			return 'ddd'
		}
	}
]

export default routes
