import React, { Component } from 'react';
import "./weather.css";

class Weather extends Component{

    state = {
        inputValue: "",
        dataValue:"",
        tempNow:{},
        tempDayeOne:{},
        tempDayeTow:{},
        tempDayeThree:{},
        isCityFounde:false
    }

    inputChangeHandler = (event)=>{
        this.setState({inputValue:event.target.value});
    }

    addTemperature = ()=>{
        if(this.state.inputValue === "")return;
        this.setState({
            dataValue:this.state.inputValue,
            inputValue:"",
        });
        
        const fetchApi = async()=>{
            const  url = `https://goweather.herokuapp.com/weather/${this.state.inputValue}`;
            const response = await fetch(url);
            const resJson = await  response.json();
            
            console.log(resJson);
            this.setState({
                tempNow:resJson,
                tempDayeOne:resJson.forecast[0],
                tempDayeTow:resJson.forecast[1],
                tempDayeThree:resJson.forecast[2]
            });
        }
        fetchApi(); 
    }

    render() {

        return (
            <>
                <div className="weather">
                    <input type="text" 
                    className = "input-box"
                    value={this.state.inputValue}
                    onChange = {this.inputChangeHandler}
                    />
                    <button
                    className = "search-button"
                    onClick = {this.addTemperature}
                    >search</button>
                    <div  className="temp-box">
                        <p>Today {this.state.tempNow.temperature}</p>
                        <p>{this.state.tempNow.wind}</p>
                    </div>
                        
                    <div className="temp-box">
                       <p> Daye 1:{this.state.tempDayeOne.temperature}</p>
                        <p>{this.state.tempDayeOne.wind}</p>
                    </div>
                    <div className="temp-box">
                        <p>Daye 2:{this.state.tempDayeTow.temperature}</p>
                        <p>{this.state.tempDayeTow.wind}</p>
                    </div>
                    <div className="temp-box">
                        <p>Daye 3:{this.state.tempDayeThree.temperature}</p>
                        <p>{this.state.tempDayeThree.wind}</p>
                    </div>
                </div>
            </>
        );
    }
    
        
}

export default Weather;