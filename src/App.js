import './App.css';
import React from 'react';
import MainContainer from './component/MainContainer';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
         
        
  return (
    <div >
      <Provider store={store}>
      <MainContainer/>
      </Provider>
    </div>
  );
}

export default App;
