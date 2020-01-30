import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BarChartComponent from './components/BarChartComponent';

class App extends Component{

  render(){
    return (
    	<div className="bootstrap-wrapper">
	    	<div className="app-container">
		    	<div className="App">
		        	<BarChartComponent />
		      	</div>
	    	</div>
    	</div>
    )
  }

}

export default App;
