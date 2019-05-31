import React from 'react';
import Title from './components/Title'
import Form from './components/Form'
import Weather from './components/Weather';
import { async } from 'q';

const API_KEY = 'd75289d770878b30d300f44408258d8e'

class App extends React.Component {

  state = {
    temperature: undefined,
    city : undefined,
    country : undefined,
    humidity: undefined,
    description: undefined,
    error: undefined,
    error2: undefined  
  }

  getWeather = async (e) => {
    e.preventDefault()
    

    const city = e.target.elements.city.value
    const country = e.target.elements.country.value

    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    
    const data = await api_call.json();
    console.log(data)
    if(data.cod !== "404"){
  
        if (city && country){
          this.setState({
            temperature: data.main.temp,
            city : data.name,
            country : data.sys.country,
            humidity: data.main.humidity,
            description: data.weather[0].description,
            error: "",
            error2: data.cod 
          })
        }
        else{
          this.setState({
            temperature: undefined,
            city : undefined,
            country : undefined,
            humidity: undefined,
            description: undefined,
            error2: undefined,
            error: "Please enter the City and Country name" 
          })
        }
      }
      else{
        this.setState({
          temperature: undefined,
          city : undefined,
          country : undefined,
          humidity: undefined,
          description: undefined,
          error2: undefined,
          error: "Please enter the valid city or country name" 
        })
      }
  }

  
  
  render(){
    return(
      <div>
        <Title />
        <Form getWeather = {this.getWeather}/>
        <Weather 
          temperature={this.state.temperature}
          city={this.state.city}
          country={this.state.country}
          humidity={this.state.humidity}
          description={this.state.description}
          error={this.state.error}
          error2= {this.state.error2}
        />
      </div>
    );
  }
}

export default App;