import React, { Component } from 'react';
import "./weather.css";

class Weather extends Component{

    state = {
        inputValue: "",
        dataValue:"",
        tempNow:null,
        tempDayeOne:null,
        tempDayeTow:null,
        tempDayeThree:null,
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
        const city = this.state.inputValue;
        
        const fetchApi = async()=>{
            const  url = `https://goweather.herokuapp.com/weather/${city}`;
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

        const {tempNow,tempDayeOne,tempDayeTow,tempDayeThree,inputValue} = this.state;
        return (
            <>

                <div className="weather">
                    <input type="text" 
                    className = "input-box"
                    value={inputValue}
                    onChange = {this.inputChangeHandler}
                    />
                    <button
                    className = "search-button"
                    onClick = {this.addTemperature}
                    >search</button>
                    {
                        tempNow !== null &&
                        <>
                         {tempNow.description}
                        <div  className="temp-box">
                        <p>Today: {tempNow.temperature}</p>
                        <p>{tempNow.wind}</p>
                    </div>
                        
                    <div className="temp-box">
                       <p> Daye {tempDayeOne.day}: {tempDayeOne.temperature}</p>
                        <p>{tempDayeOne.wind}</p>
                    </div>
                    <div className="temp-box">
                        <p>Daye {tempDayeTow.day}: {tempDayeTow.temperature}</p>
                        <p>{tempDayeTow.wind}</p>
                    </div>
                    <div className="temp-box">
                        <p>Daye {tempDayeThree.day}: {tempDayeThree.temperature}</p>
                        <p>{tempDayeThree.wind}</p>
                    </div>
                    </>
                    }
                   
                </div>
            </>
        );
    }
    
        
}

export default Weather;