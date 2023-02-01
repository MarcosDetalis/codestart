import React from 'react'

function DetailDogComponent(props) {
   console.log(props.match.params.id);
    return <p>You are looking at the dog with id = {props.match.params.id}</p>;
  
}

export default DetailDogComponent