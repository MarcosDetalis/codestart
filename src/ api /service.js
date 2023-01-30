export async function getPersojes() {
  const res = await fetch("https://swapi.dev/api/people/");
  const data = await res.json();
  return data;
}

export async function getSelecPersonaje(id = 1) {
  const res = await fetch("https://swapi.dev/api/people/" + id);
  const data = await res.json();
  return data;
}
export async function getBusqueda(name) {
  const res = await fetch("https://swapi.dev/api/people/?search=" + name);
  const data = await res.json();
  return data;
}
