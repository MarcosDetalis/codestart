import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";

import { useState, useEffect, useRef } from "react";
import {   getPersojes, getSelecPersonaje } from "./ api /service";
 import DetailDogComponent from "./componentes/DetailDogComponent"

function App() {
  const buscarpersonaje = useRef(null);
  const [personajes, setPersonaje] = useState([]);
  const [selecpersonaje, setSelecPersonaje] = useState(1);
  const [detalles, setDetalles] = useState({});
  const [textBuscar, settextBuscar] = useState("");
  

  useEffect(() => {
    getPersojes().then((data) => setPersonaje(data.results));
  }, []);

  useEffect(() => {
    getSelecPersonaje(selecpersonaje).then(setDetalles);
  }, [selecpersonaje]);

  const MostarDetalle = (personaje) => {
    const id = Number(personaje.url.split("/").slice(-2)[0]);

    console.log(personaje);


    setSelecPersonaje(id);
  };

  const buscar = (e) => {
    e.preventDefault();
    const text = buscarpersonaje.current.value;
    settextBuscar(text);
  };



  const buscarIntro = (e) => {
    if (e.key !== "Enter") return;
    buscarpersonaje.current.value = "";
    setDetalles({});
   
   // getBusqueda(textBuscar).then((data) => setPersonaje(data.results));
    setSelecPersonaje(textBuscar) 
    
  };

  return (
    <div>
      <select>
        {personajes.map((personaje) => (
          <option key={personaje.name} onClick={() => MostarDetalle(personaje)}>
            &#xf2be;
            {personaje.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        ref={buscarpersonaje}
        onChange={buscar}
        onKeyDown={buscarIntro}
        placeholder="Buscar personaje"
      />

      {detalles && (
        <aside>
          <h1>{detalles.name}</h1>
          <h2>Altura:{detalles.height}</h2>
          <h3>Masa: {detalles.mass}</h3>
          <h4> color de pelo: {detalles.hair_color}</h4>
          <h5> Edad :{detalles.birth_year}</h5>
        </aside>
      )}

      {/*  */}

      <div className="App">
        <BrowserRouter>
          <Route
            path="/dogs/:id"
            render={(props) => <DetailDogComponent {...props} />}
          />
        </BrowserRouter>
      </div>
    </div>
  );
}
export default App;
