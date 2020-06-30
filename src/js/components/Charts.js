import React, { Component } from 'react'
import {Bar} from 'react-chartjs-2';
import axios from 'axios';
//import {browserHistory} from "react-router"
//import {BrowserRouter as Router, Switch, Route, Link , IndexRoute} from 'react-router-dom'


export class Charts extends Component {
	constructor(){
		super();
		this.state = {
			newCaseArr: [],
			newCaseArrLabel : []
		};
		//this.onChangeSearch=this.onChangeSearch.bind(this);
	}

	componentDidMount() {
		console.log("Call chart mount");
		//create date string
		let count =1;
		let dateinput="";
		while(count < 17){
		let today = new Date();
		today. setDate(today. getDate() - count);
let todaydate=('00' + parseInt(today.getMonth()+1)).slice(-2) + "-"+ ('00' + today.getDate()).slice(-2) +"-"+today.getFullYear();
dateinput +=todaydate;
if(count < 16){
	dateinput +="&";
}
count++;
		}
		//console.log("Today :" + dateinput);
	  //Date wise chart-Global//Total global
	   const config2 = {
    headers: {
		"content-type":"application/octet-stream",
    "x-rapidapi-host": "covid1910.p.rapidapi.com",
	"x-rapidapi-key": "1efaadfe2bmsha20b2b7ab2ada62p167ba4jsna8f9e6ec1495",
	"useQueryString": true
}
}
//Get India daywise cases
//06-16-2020&06-15-2020&06-14-2020&06-13-2020&06-12-2020&06-11-2020&06-10-2020&06-09-2020&06-08-2020&06-07-2020&06-06-2020&06-05-2020&06-04-2020&06-03-2020&06-02-2020&06-01-2020
	  const url = `https://covid1910.p.rapidapi.com/data/confirmed/country/india/date/${dateinput}`;
	  //console.log("url: " + url);
	  axios.get(url,config2)
      .then(res => {
        //console.log("data" + res.data.data.covid19Stats);
		//this.setState({GlobalStats: res.data.data})
		//console.log("val:", res.data);
		let y=0,diff;
		let newCaseArr=[],newCaseArrLabel=[];
		const lastIndex = res.data.length - 1;
		res.data.map((x,i) => {
			if(i != lastIndex)
			  newCaseArrLabel.push(x.date);
		
			diff=y-x.confirmed;
			y=x.confirmed;
			if(diff > 0){
				newCaseArr.push(diff);
			}
		})
		//console.log("aee1" + newCaseArrLabel);
		//console.log("aee21" + newCaseArr);
		
						this.setState({
							newCaseArr: newCaseArr.reverse(),
							newCaseArrLabel : newCaseArrLabel.reverse()
						})
      })
	  .catch(res => {
        console.log("ERR", res);
      });
	}
							  	  


render(){
	console.log("Call chart render");
	const stateval = {
  labels: this.state.newCaseArrLabel,
  datasets: [
    {
      label: 'New Cases',
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: this.state.newCaseArr
    }
  ]
}
	return (
	  <div style={{
        width: '520px',
        height: '360px',
		paddingLeft: '30px',
        paddingTop: '30px'
      }}>
	     <Bar
          data={stateval}
          options={{
            title:{
              display:true,
              text:'India- Daily New Cases(15 days)',
              fontSize:20,
			  responsive: true,
          maintainAspectRatio: true,
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
	</div>
	);
}
}