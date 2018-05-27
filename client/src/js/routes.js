import React from 'react'
import { Route, IndexRoute } from 'react-router'

import farmaceuticaRoutes from './farmaceutica/routes'

import medicamentoRoutes from './medicamento/routes'

import pacienteRoutes from './paciente/routes'

import medicamentoEntregadoRoutes from './medicamentoEntregado/routes'

import citaRoutes from './cita/routes'

import departamentoRoutes from './departamento/routes'

import ciudadRoutes from './ciudad/routes'

import areaRoutes from './area/routes'

import alergiaRoutes from './alergia/routes'

import preConsultaRoutes from './preconsulta/routes'

import parametroPreConsultaRoutes from './parametroPreConsulta/routes'

import auditoriaModulo1Routes from './auditoriaModulo1/routes'

import nivelRoutes from './nivel/routes'

import diagnosticoRoutes from './diagnostico/routes'

import sintomaRoutes from './sintoma/routes'

import consultaRoutes from './consulta/routes'

import tipoAnalisisRoutes from './tipoAnalisis/routes'


import personalRoutes from './usuario/routes'


import Estadistica1Container from './consulta/components/Estadistica1'


// App Principal de la aplicación.
import AppContainer from './app/components/App'

import HomePage from './app/pages/HomePage'

// DashBoard App.
import DashBoardContainer from './dashboard/components/DashBoard'

// USUARIO.
import RegistrarPage from '././usuario/pages/RegistrarPage'
import AutenticarPage from '././usuario/pages/AutenticarPage'
import ListarPage from '././usuario/pages/ListarPage'

// ROL.
import ListarRolesPage from '././rol/pages/ListarRolesPage'

// ESPECIALIDAD.
import ListarEspecialidadesPage from '././especialidades/pages/ListarEspecialidadesPage'

	
// LISTAR ANÁLISIS SOLICITADOS APP.
import ListarAppAnalisisSolicitadosContainer from '././analisisSolicitado/components/ListarApp'
import ListarAnalisisSolicitadosContainer from '././analisisSolicitado/components/Listar'

// MOSTRAR ANÁLISIS SOLICITADO APP.
import MostrarAnalisisSolicitadoAppContainer from '././analisisSolicitado/components/MostrarApp'

// MOSTRAR ANÁLISIS APP.
import MostrarAnalisisAppContainer from '././analisis/components/MostrarApp'

// LISTAR ANÁLISIS X TIPOS.
import ListarAnalisisTiposContainer from '././analisisTipo/components/Listar'

// MOSTRAR ANÁLISIS X TIPOS.
import MostarAnalisisTipoContainer from '././analisisTipo/components/Mostrar'

import MostrarVistaPreviaContainer from '././analisis/components/MostrarVistaPrevia'



// CITAS.


// CONSULTAS APP.
import ListarConsultasAppContainer from '././consulta/components/ListarApp'

import ListarConsultasContainer from '././consulta/components/Listar'

				// Con todos los detalles.
// CONSULTA APP.
import MostrarConsultaAppContainer from '././consulta/components/MostrarApp'


import ListarSintomasConsultaContainer from '././consultaSintoma/components/Listar'

import ListarConsultaDiagnosticosContainer from '././consultaDiagnostico/components/Listar'


				// Módulo farmacia.
import ListarNombresMedicamentosPage from '././nombreMedicamento/pages/ListarNombresMedicamentosPage'
import ListarPresentacionesPage from '././presentacion/pages/ListarPresentacionesPage'
import ListarTiposConsumosPage from '././tipoConsumo/pages/ListarTiposConsumosPage'

// Estable.
import ListarDrogasPage from '././droga/pages/ListarDrogasPage'

import ListarUnidadesMedicamentosPage from '././unidadMedidaMedicamento/pages/ListarUnidadesMedicamentosPage'


import ListarAuditoria1MovimientosContainer from '././auditoriaModulo1/components/Listar'


import ListarProveedoresPage from '././proveedor/pages/ListarProveedoresPage'
// Agregar solamente. si piden.
// import ListarAccionesPage from '././accion/pages/ListarAccionesPage'


// Módulo laboratorio.
import ListarTiposExamenesPage from '././tipoExamen/pages/ListarTiposExamenesPage'
import ListarUnidadesAnalisisPage from '././unidadAnalisis/pages/ListarUnidadesAnalisisPage'

import ListarParametrosAnalisisPage from '././parametroAnalisis/pages/ListarParametrosAnalisisPage'
	
	

// ===================================================================
	

	// LISTAR LOTES-MEDICAMENTOS APP.
import ListarLotesMedicamentosAppContainer from '././loteMedicamento/components/ListarApp'
import ListarLotesMedicamentosPage from '././loteMedicamento/pages/ListarLotesMedicamentosPage'

import MostrarLoteMedicamentoAppContainer from '././loteMedicamento/components/MostrarApp'



import ListarTiposDocumentosContainer from '././tipoDocumento/components/Listar'



export default (
	<Route path='/' component={AppContainer}>
		<IndexRoute component={HomePage}/>
		<Route path='/registrarse' component={RegistrarPage}/>
		<Route path='/entrar' component={AutenticarPage}/>

		<Route path='/dashboard' component={DashBoardContainer}>			

			
			<Route path='/dashboard/tipos-documentos' component={ListarTiposDocumentosContainer}/>


			<Route path='/usuarios' component={ListarPage}/>
			<Route path='/roles' component={ListarRolesPage}/>
			<Route path='/especialidades' component={ListarEspecialidadesPage}/>
			

			{ farmaceuticaRoutes }
			{ medicamentoRoutes }
			{ pacienteRoutes }
			{ medicamentoEntregadoRoutes }
			{ citaRoutes }
			{ departamentoRoutes }
			{ ciudadRoutes }
			{ areaRoutes }
			{ alergiaRoutes }
			{ parametroPreConsultaRoutes }
			{ auditoriaModulo1Routes }
			{ nivelRoutes }
			{ diagnosticoRoutes }
			{ sintomaRoutes }
			{ preConsultaRoutes }
			{ consultaRoutes }
			{ tipoAnalisisRoutes }

			{ personalRoutes }

				{/* Módulo farmacia. */}
			<Route path='/dashboard/nombres-medicamentos' component={ListarNombresMedicamentosPage}/>
			<Route path='/dashboard/presentaciones' component={ListarPresentacionesPage}/>
			<Route path='/dashboard/tipos-consumos' component={ListarTiposConsumosPage}/>
			<Route path='/dashboard/drogas' component={ListarDrogasPage}/>
			<Route path='/dashboard/unidades-medicamentos' component={ListarUnidadesMedicamentosPage}/>


			<Route path='/dashboard/proveedores' component={ListarProveedoresPage}/>
			{/* Agregar solamente. si piden. (Acciones). */}
			{/* <Route path='/dashboard/acciones' component={ListarAccionesPage}/> */}
			
			
			<Route path='/dashboard/lotes-medicamentos' component={ListarLotesMedicamentosAppContainer}>
				<IndexRoute component={ListarLotesMedicamentosPage}/>
				<Route path='/dashboard/lotes-medicamentos/:idLoteMedicamento' component={MostrarLoteMedicamentoAppContainer}/>
			</Route>


				{/* Módulo laboratorio. */}
			<Route path='/dashboard/tipos-examenes' component={ListarTiposExamenesPage}/>
			<Route path='/dashboard/unidades-medidas' component={ListarUnidadesAnalisisPage}/>
			<Route path='/dashboard/parametros-analisis' component={ListarParametrosAnalisisPage}/>


			<Route path='/dashboard/solicitudes-laboratorio' component={ListarAppAnalisisSolicitadosContainer}>
				<IndexRoute component={ListarAnalisisSolicitadosContainer}/>
				<Route path='/dashboard/solicitudes-laboratorio/:idAnalisisSolicitado' component={MostrarAnalisisSolicitadoAppContainer}>
					<Route path='/dashboard/solicitudes-laboratorio/:idAnalisisSolicitado/analisis/:idAnalisis/vista-general' component={MostrarVistaPreviaContainer}/>
					
					<Route path='/dashboard/solicitudes-laboratorio/:idAnalisisSolicitado/analisis/:idAnalisis' component={MostrarAnalisisAppContainer}>
						<Route path='/dashboard/solicitudes-laboratorio/:idAnalisisSolicitado/analisis/:idAnalisis/analisis-tipos' component={ListarAnalisisTiposContainer}/>

						<Route path='/dashboard/solicitudes-laboratorio/:idAnalisisSolicitado/analisis/:idAnalisis/analisis-tipos/:idAnalisisTipo' component={MostarAnalisisTipoContainer}/>
						
					</Route>
				</Route>
			</Route>



		</Route>

	</Route>)