import { Component } from "react";
import classes from "./weather.module.css";

class Weather extends Component {
  state = {
    inputValue: "",
    dataValue: "",
    tempNow: {},
    tempDayeOne: {},
    tempDayeTow: {},
    tempDayeThree: {},
    isCityFounde: false,
  };

  inputChangeHandler = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  addTemperature = () => {
    if (this.state.inputValue === "") return;
    this.setState({
      dataValue: this.state.inputValue,
      inputValue: "",
    });
    const city = this.state.inputValue;

    const fetchApi = async () => {
      const url = `https://goweather.herokuapp.com/weather/${city}`;
      const response = await fetch(url);
      const resJson = await response.json();

      this.setState({
        tempNow: resJson,
        tempDayeOne: resJson.forecast[0],
        tempDayeTow: resJson.forecast[1],
        tempDayeThree: resJson.forecast[2],
      });
    };
    fetchApi();
  };

  render() {
    const { tempNow, tempDayeOne, tempDayeTow, tempDayeThree, inputValue } =
      this.state;
    return (
      <>
        <div className={classes.weatherBox}>
          <input 
            type="text" 
            name="search" 
            placeholder="Search.."
            value={inputValue}
            onChange={this.inputChangeHandler}/>
           <button
            className={classes.searchButton}
            onClick={this.addTemperature}
          >
            search
          </button> 
        

          <table>
            <tr>
              <th>Day</th>
              <th>Temperature</th>
              <th>Wind</th>
            </tr>
            <tr>
              <td>Today</td>
              <td>{tempNow.temperature}</td>
              <td>{tempNow.wind}</td>
            </tr>
            <tr>
              <td>1</td>
              <td>{tempDayeOne.temperature}</td>
              <td>{tempDayeOne.wind}</td>
            </tr>
            <tr>
              <td>2</td>
              <td>{tempDayeTow.temperature}</td>
              <td>{tempDayeTow.wind}</td>
            </tr>
            <tr>
              <td>3</td>
              <td>{tempDayeThree.temperature}</td>
              <td>{tempDayeThree.wind}</td>
            </tr>
          </table>
        </div>
        
      </>
    );
  }
}

export default Weather;
