import "./App.css";
import { useState, useEffect, useRef } from "react";
import { getBusqueda, getPersojes, getSelecPersonaje } from "./ api /service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    getBusqueda(textBuscar).then((data) => setPersonaje(data.results));
  };
 

  return (
    <div>
      <input
        type="text"
        ref={buscarpersonaje}
        onChange={buscar}
        onKeyDown={buscarIntro}
        placeholder="Buscar personaje"
      />

      <ul>
        {personajes.map((personaje) => (
          <li key={personaje.name} onClick={() => MostarDetalle(personaje)}>
            {personaje.name}
          </li>
        ))}
      </ul>
   
      <select name="" id="">
        {personajes.map((personaje) => (
          <option key={personaje.name} onClick={() => MostarDetalle(personaje)}>
            {personaje.name}
          </option>
        ))}
        c
      </select>

      {detalles && (
        <aside>
          <h1>{detalles.name}</h1>
        </aside>
      )}
    </div>
  );
}
export default App;
