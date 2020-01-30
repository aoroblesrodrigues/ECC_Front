import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';
import axios from 'axios';


export default class BarChartComponent extends Component{

  constructor(props) {
    super(props);
    this.state ={
      Data: {}
    }
  }
  
  onlyUnique(value, index, self){
    return self.indexOf(value) === index;
  }

  componentDidMount() {
    axios
      .get(`http://localhost:8000/api/validaftagg`)
      .then(res => {
        const valida = res.data;
        const tabla = Array.from(new Set(valida.tabla));
        //var dia = Array.from(new Set(valida.id_dia));
        var dia = valida.map(function(o){
          return o.id_dia;
        }).filter(this.onlyUnique);

        let recibidasFT = [];
        let recibidasAGG = [];
        let recibidasRES = [];
        valida.forEach(element => {
          if(element.tabla === 'FT'){
            recibidasFT.push(element.llamadas_recibidas);  
          }
          if(element.tabla === 'AGG'){
            recibidasAGG.push(element.llamadas_recibidas);  
          }
          if(element.tabla === 'AGG RES'){
            recibidasRES.push(element.llamadas_recibidas);  
          }
          
        });
        console.log(tabla);
        this.setState({
          Data: {
            labels: dia,//["01-2020","02-2020","03-2020","04-2020","05-2020","06-2020","07-2020","08-2020"],
            datasets: [{
              label: 'FT',
              data: recibidasFT,
              backgroundColor: '#007bff'              
            },{
              label: 'AGG',
              data: recibidasAGG,
              backgroundColor: '#3ad711'
            },{
              label: 'AGG RES',
              data: recibidasRES,
              backgroundColor: '#ff9933'
            }
          ]
        }
      });
    })
  }
  
  render(){
    return(
      <div>
        <Bar
          data={this.state.Data}
          width={960}
          height={null}
          options={{
            maintainAspectRatio: false,
            title:{
              display: true,
              text: 'INDICADOR SEMANA LLAMADAS'
            },
            legend:{
              display: true,
              position: 'bottom'
            },
            responsive: true,
            tooltips: {
              mode: 'label'
            }
          }}
        />
      </div>
    )
  }
}