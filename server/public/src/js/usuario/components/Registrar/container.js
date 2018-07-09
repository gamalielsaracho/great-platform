import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'


import {
	registrarPersonal,
  cerrarFormularioPersonal,
  editarPersonal
} from '../../actions'


import Registrar from './Registrar'


const validate = values => {
  const errors = {}

  var patronNumero = /^\d*$/; //Expresión regular para aceptar solo números enteros
  
  var patronTexto = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/



  if (!values.nroDocumento) {
    errors.nroDocumento = 'Nro de documento obligatorio.'
  } else {
      if(!patronNumero.test(values.nroDocumento)) {
        errors.nroDocumento = 'Solo números positivos.'
      } else if(values.nroDocumento.length < 6){
        errors.nroDocumento = 'Por lo menos 6 caracteres.'
      }
  }


  if (!values.nombres) {
    errors.nombres = 'Nombre completo es obligatorio.'
  } else {
    if (!patronTexto.test(values.nombres)) {
      errors.nombres = 'Solo texto.'
    } else if(values.nombres.length <= 3){
      errors.nombres = 'Por lo menos 3 caracteres.'
    } 
  }

  if (!values.apellidos) {
    errors.apellidos = 'Apellido completo obligatorio.'
  } else {
     if (!patronTexto.test(values.apellidos)) {
      errors.apellidos = 'Solo texto.'
    } else if(values.apellidos.length <= 3){
      errors.apellidos = 'Por lo menos 3 caracteres.'
    }
  }

  if (!values.correo) {
    errors.correo = 'Correo obligatorio.'
  }

  if (!values.contrasena) {
    errors.contrasena = 'Contraseña obligatorio.'
  }

  
  return errors
}

// const warn = values => {
//   const warnings = {}
//   if (values.nombre.length) {
//     warnings.apellido = 'Prueba warnings... :)'
//   }
//   return warnings
// }

function mapStateToProps(state) {
	return {
    

    formulario: state.personal.formulario,
    initialValues: state.personal.formulario.personal,
    enableReinitialize: state.personal.formulario.iniciarValores,
    editarContenido: state.personal.formulario.iniciarValores,


    // Para obtener el error al crear o editar.
    crear: state.personal.crear,
    editar: state.personal.editar
	}
}

function mapDispatchToProps(dispatch) {
	return {
    cerrarFormularioPersonal: () => {
      dispatch(cerrarFormularioPersonal())
    },
		registrarPersonal: (datosFormulario) => {
			dispatch(registrarPersonal(datosFormulario))
		},
    editarPersonal: (datosFormulario) => {
      dispatch(editarPersonal(datosFormulario))
    }
	}
}

const form = reduxForm({
  form: 'FormularioPersonal',
  validate
  // warn
})


export default connect(mapStateToProps, mapDispatchToProps)(form(Registrar))