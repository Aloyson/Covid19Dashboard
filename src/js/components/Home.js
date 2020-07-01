import React, { Component } from 'react'
import {browserHistory,Redirect} from "react-router"
import axios from 'axios';

import { Charts } from './Charts'

class Home extends Component {
	constructor(){
		super();
		this.state = {
			sortType:"",
			isSortOn:"",
			searchVal:"",
			CountryStats: [],
			GlobalStats : [],
		};
		this.onChangeSearch=this.onChangeSearch.bind(this);
	}
	
	onSort(sortType,isSortOn){
		let sortToggle=sortType;
		if(sortToggle == "asc") sortToggle="desc";
		else sortToggle="asc";
		
		this.setState({
			sortType: sortToggle,
			isSortOn: isSortOn
		});
	}
	
	onChangeSearch(event){
		this.setState({
			searchVal: event.target.value
		})
		//this.props.onChange(event.target.value)
	}

	componentDidMount() {
		console.log("Call Home did mount");
		 const config = {
			headers: {
			"x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
			"x-rapidapi-key": "1efaadfe2bmsha20b2b7ab2ada62p167ba4jsna8f9e6ec1495",
			"useQueryString": true
		},
			params: {
			   "country":"India"
			}
		}

		axios.get(`https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats`,config)
		  .then(res => {
			//console.log("data" + res.data.data.covid19Stats);
			this.setState({CountryStats: res.data.data.covid19Stats})
			//console.log("ERR", res.data.data.covid19Stats);
		  })
		  .catch(res => {
			console.log("ERR", res);
		  });
		  
		  //Total global
		   const config1 = {
				headers: {
				"x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
				"x-rapidapi-key": "1efaadfe2bmsha20b2b7ab2ada62p167ba4jsna8f9e6ec1495",
				"useQueryString": true
				},
				params: {
				   "country":""
				}
		    }
		axios.get(`https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total`,config1)
		  .then(res => {
			//console.log("data" + res.data.data.covid19Stats);
			this.setState({GlobalStats: res.data.data})
			//console.log("val:", res.data.data);
		  })
		  .catch(res => {
			console.log("ERR", res);
		  });
	  
  }
	
	render() {
		console.log("Call Home render");
		const countrydata=this.state.CountryStats;
		const globalData= this.state.GlobalStats;
		
		//Sort
		const sorted = countrydata.sort((a,b)=>{
			const isRev = this.state.sortType == '' ? 0 : ((this.state.sortType == 'asc') ? 1 : -1);
			const isSortOn=this.state.isSortOn;
			let SortOnVal;
			if(isSortOn == "State")
			    SortOnVal = a.province.localeCompare(b.province);
			else if(isSortOn == "TotalCases")
			    SortOnVal = a.confirmed > b.confirmed ? 1 : -1;
			else if(isSortOn == "Death")
			    SortOnVal = a.deaths > b.deaths ? 1 : -1;
			else if(isSortOn == "Recovered")
			    SortOnVal = a.recovered > b.recovered ? 1 : -1;
			
			return isRev * SortOnVal;
			//console.log(data);
		});
		const sort_ascd = require(`./../../../public/images/sort_up.png`);
		const sort_descd = require(`./../../../public/images/sort_down.png`);
		//State
		let StatelistSort;
		if(this.state.sortType == "asc")
			  StatelistSort=<div className="sortingdiv" onClick={()=>this.onSort(this.state.sortType,"State")}><img src={sort_ascd.default} className="ascImg"/><img src={sort_descd.default} className="ascImg"/></div>
		else if(this.state.sortType == "desc")
			  StatelistSort=<div className="sortingdiv" onClick={()=>this.onSort(this.state.sortType,"State")}><img src={sort_ascd.default} className="ascImg"/><img src={sort_descd.default} className="ascImg"/></div>
		else
			StatelistSort=<div className="sortingdiv" onClick={()=>this.onSort(this.state.sortType,"State")}><img src={sort_ascd.default} className="ascImg"/><img src={sort_descd.default} className="ascImg"/></div>
		
		//Total Caseslet StatelistSort;
		let CaseslistSort;
		if(this.state.sortType == "asc")
			  CaseslistSort=<div className="sortingdiv" onClick={()=>this.onSort(this.state.sortType,"TotalCases")}><img src={sort_ascd.default} className="ascImg"/><img src={sort_descd.default} className="ascImg"/></div>
		else if(this.state.sortType == "desc")
			  CaseslistSort=<div className="sortingdiv" onClick={()=>this.onSort(this.state.sortType,"TotalCases")}><img src={sort_ascd.default} className="ascImg"/><img src={sort_descd.default} className="ascImg"/></div>
		else
			CaseslistSort=<div className="sortingdiv" onClick={()=>this.onSort(this.state.sortType,"TotalCases")}><img src={sort_ascd.default} className="ascImg"/><img src={sort_descd.default} className="ascImg"/></div>
		
		//Death Caseslet;
		let DeathlistSort;
		if(this.state.sortType == "asc")
			  DeathlistSort=<div className="sortingdiv" onClick={()=>this.onSort(this.state.sortType,"Death")}><img src={sort_ascd.default} className="ascImg"/><img src={sort_descd.default} className="ascImg"/></div>
		else if(this.state.sortType == "desc")
			  DeathlistSort=<div className="sortingdiv" onClick={()=>this.onSort(this.state.sortType,"Death")}><img src={sort_ascd.default} className="ascImg"/><img src={sort_descd.default} className="ascImg"/></div>
		else
			DeathlistSort=<div className="sortingdiv" onClick={()=>this.onSort(this.state.sortType,"Death")}><img src={sort_ascd.default} className="ascImg"/><img src={sort_descd.default} className="ascImg"/></div>
		
		//RecoveredlistSort Caseslet;
		let RecoveredlistSort;
		if(this.state.sortType == "asc")
			  RecoveredlistSort=<div className="sortingdiv" onClick={()=>this.onSort(this.state.sortType,"Recovered")}><img src={sort_ascd.default} className="ascImg"/><img src={sort_descd.default} className="ascImg"/></div>
		else if(this.state.sortType == "desc")
			  RecoveredlistSort=<div className="sortingdiv" onClick={()=>this.onSort(this.state.sortType,"Recovered")}><img src={sort_ascd.default} className="ascImg"/><img src={sort_descd.default} className="ascImg"/></div>
		else
			RecoveredlistSort=<div className="sortingdiv" onClick={()=>this.onSort(this.state.sortType,"Recovered")}><img src={sort_ascd.default} className="ascImg"/><img src={sort_descd.default} className="ascImg"/></div>
		
		
		//Search State
	const searchData = countrydata.filter(stateName => {
	  return stateName.province.toLowerCase().includes(this.state.searchVal.toLowerCase())
  })
		return ( 
<div className="homebackgrnd">
	<div className="hometext">Covid-19 Dashboard1</div>
	<div className="India_Stats">
	<div className="indiaStatHead">India Stats</div>
	<div className="searchboxDiv"><input type="search" className="SearchBox" id="filter" value={this.state.searchVal} onChange={this.onChangeSearch} placeholder="Search State" /></div>
	<table className="customers">
	<thead>
	<tr><th>State {StatelistSort}</th><th>Total Cases {CaseslistSort}</th><th>Deaths {DeathlistSort}</th><th>Recovered {RecoveredlistSort}</th></tr>
	</thead>
	<tbody>
	{
		searchData.map(statewise => {
			return <tr key={statewise.keyId}><td>{statewise.province}</td><td>{statewise.confirmed}</td><td>{statewise.deaths}</td><td>{statewise.recovered}</td></tr>
		})
	}
	</tbody>
	</table>
	</div>
	<div className="Global_stats">
	<div className="globalStatHead">Global stats</div>
	<div className="totalcases">Total Cases <br /> <span>{globalData.confirmed}</span></div>
	<div className="deathcases">Deaths <br /><span>{globalData.deaths}</span></div>
	<div className="recoveredcases">Recovered <br /><span>{globalData.recovered}</span></div>
	<div >
	 <Charts />
	 </div>
	</div>
	
</div>
		)  
	}
}


export const DisplayNotFound=()=> <div className="homebackgrnd"><h2><center>Display Not Found</center></h2></div>

export const NotFound = () =>  <div className="homebackgrnd"><h2><center>404.. This page is not found!</center></h2></div>

export default Home;