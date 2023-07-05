import React, { useState, useEffect } from "react"; // Importa React y los hooks useState y useEffect
import axios from "axios"; // Importa Axios para hacer solicitudes HTTP
import { v4 as uuidv4 } from "uuid"; // Importa UUID para generar claves únicas

const WeatherList = () => {
  // Define el componente WeatherList
  const [weatherData, setWeatherData] = useState([]); // Crea un estado para almacenar los datos meteorológicos

  useEffect(() => {
    // Usa el hook useEffect para hacer una solicitud HTTP cuando se monta el componente
    const fetchData = async () => {
      // Define una función asíncrona para hacer la solicitud HTTP
      const result = await axios(
        // Usa Axios para hacer la solicitud HTTP a la API de OpenWeatherMap
        "https://api.openweathermap.org/data/2.5/forecast?q=Madrid&appid=aqui_va_la_appkey"
      );
      setWeatherData(result.data.list); // Actualiza el estado con los datos meteorológicos obtenidos de la API
    };
    fetchData(); // Llama a la función fetchData para hacer la solicitud HTTP
  }, []); // Pasa un array vacío como segundo argumento para que useEffect solo se ejecute una vez

  return (
    <div>
      {weatherData.map(
        (
          item // Recorre los datos meteorológicos y renderiza un componente WeatherCard para cada uno
        ) => (
          <WeatherCard key={uuidv4()} item={item} />
        )
      )}
    </div>
  );
};

const WeatherCard = ({ item }) => {
  // Define el componente WeatherCard
  const { dt_txt, main, weather } = item; // Extrae las propiedades necesarias del objeto item
  const date = new Date(dt_txt); // Crea un objeto Date a partir de la propiedad dt_txt

  return (
    <div>
      <h3>{date.toLocaleDateString()}</h3>
      <p>Time: {date.toLocaleTimeString()}</p>
      <p>Temperature: {main.temp}</p>
      <p>Weather: {weather[0].description}</p>
    </div>
  );
};

const WeatherForm = () => {
  // Define el componente WeatherForm
  const [city, setCity] = useState(""); // Crea un estado para almacenar el nombre de la ciudad

  const handleSubmit = (e) => {
    // Define una función manejadora para el evento submit del formulario
    e.preventDefault(); // Previene que se envíe el formulario por defecto
    console.log(city); // Muestra el nombre de la ciudad en la consola del navegador
  };

  return (
    <form onSubmit={handleSubmit}>
      {" "}
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

const App = () => {
  // Define el componente App que renderiza los componentes WeatherForm y WeatherList
  return (
    <div>
      <WeatherForm />
      <WeatherList />
    </div>
  );
};

export default App; // Exporta el componente App por defecto para que pueda ser usado en otros archivos
