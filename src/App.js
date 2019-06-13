import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import ExampleNotifications from './components/ExampleNotifications';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import 'react-redux-notify/dist/ReactReduxNotify.css';

import rootReducer from './store/reducer';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger())));

class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<ExampleNotifications />
			</Provider>
		);
	}
}

export default App;
