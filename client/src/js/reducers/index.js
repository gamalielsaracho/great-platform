import { combineReducers } from 'redux'

import { reducer as formReducer } from 'redux-form'

import personalReducer from '../usuario/reducer'

import materiaReducer from '../materia/reducer'

import calificacionReducer from '../calificacion/reducer'


const rootReducer = combineReducers({
	form: formReducer,
	personal: personalReducer,
	materia: materiaReducer,
	calificacion: calificacionReducer
})

export default rootReducer