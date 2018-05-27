import { combineReducers } from 'redux'

import { reducer as formReducer } from 'redux-form'

import preguntaReducer from '../pregunta/reducer'


const rootReducer = combineReducers({
	form: formReducer,
	pregunta: preguntaReducer	
})

export default rootReducer