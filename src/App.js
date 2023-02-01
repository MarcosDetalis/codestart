import "./App.css";
import { BrowserRouter, Route, Redirect, NavLink } from "react-router-dom";

import { useState, useEffect, useRef } from "react";
import { getPersojes, getSelecPersonaje } from "./ api /service";
import DetailDogComponent from "./componentes/DetailDogComponent";
import Listpersonas from "./componentes/Listpersonas";

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
    setSelecPersonaje(textBuscar);
  };

  return (
    <div className="m-3">
      {/* 
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
      )} */}

      <div className="App">
        <BrowserRouter>
          <Route
            path="/op"
            render={(props) => <DetailDogComponent {...props} />}
          >

          </Route>      
            </BrowserRouter>
      </div>

      <div class="row g-3">
        <div class="col-auto">
          <select
            class="form-select form-select-lg mb-2"
            aria-label=".form-select-lg example"
          >
            {personajes.map((personaje) => (
              <option
                key={personaje.name}
                onClick={() => MostarDetalle(personaje)}
              >
                &#xf2be;
                {personaje.name}
              </option>
            ))}
          </select>
        </div>
        <div class="col-auto ">
          <label>id</label>
          <input
            type="text"
            readonly
            class="form-control-plaintext"
            ref={buscarpersonaje}
            onChange={buscar}
            onKeyDown={buscarIntro}
            placeholder="Buscar personaje"
            className="border border-secondary-subtle p-2"
          />
        </div>
        <div class="col-auto">
          <button type="button" class="btn btn-outline-success">
            Enviar consulta
          </button>
        </div>
      </div>

      {detalles && (
        <aside>
          <h1>{detalles.name}</h1>
          <h2>Altura:{detalles.height}</h2>
          <h3>Masa: {detalles.mass}</h3>
          <h4> color de pelo: {detalles.hair_color}</h4>
          <h5> Edad :{detalles.birth_year}</h5>
        </aside>
      )}
    </div>
  );
}
export default App;
