import React from 'react';

function Searchbar(props) {
  let datatypes = ['People', 'Vehicles', 'Starships', 'Planets', 'Species', 'Films'];
  return (
    <>
    <form>

      <fieldset>
        <legend>What are we searching for?</legend>

        {/* <input type = 'radio' value = 'people' name = 'dataType' id = 'people' checked = {props.selected === 'people'} onChange = {(e) => {props.setFetchUrl(`https://swapi.py4e.com/api/${e.target.value}/`); props.setSelectedDataType(e.target.value); props.setIsLoading(true);}}></input>
        <label htmlFor = 'people'>People</label>

        <input type = 'radio' value = 'vehicles' name = 'dataType' id = 'vehicles' checked = {props.selected === 'vehicles'} onChange = {(e) => {props.setFetchUrl(`https://swapi.py4e.com/api/${e.target.value}/`); props.setSelectedDataType(e.target.value); props.setIsLoading(true);}}></input>
        <label htmlFor = 'vehicles'>Vehicles</label>

        <input type = 'radio' value = 'starships' name = 'dataType' id = 'starships' checked = {props.selected === 'starships'} onChange = {(e) => {props.setFetchUrl(`https://swapi.py4e.com/api/${e.target.value}/`); props.setSelectedDataType(e.target.value); props.setIsLoading(true);}}></input>
        <label htmlFor = 'starships'>Starships</label>

        <input type = 'radio' value = 'planets' name = 'dataType' id = 'planets' checked = {props.selected === 'planets'} onChange = {(e) => {props.setFetchUrl(`https://swapi.py4e.com/api/${e.target.value}/`); props.setSelectedDataType(e.target.value); props.setIsLoading(true);}}></input>
        <label htmlFor = 'planets'>Planets</label>

        <input type = 'radio' value = 'species' name = 'dataType' id = 'species' checked = {props.selected === 'species'} onChange = {(e) => {props.setFetchUrl(`https://swapi.py4e.com/api/${e.target.value}/`); props.setSelectedDataType(e.target.value); props.setIsLoading(true);}}></input>
        <label htmlFor = 'species'>Species</label>

        <input type = 'radio' value = 'films' name = 'dataType' id = 'films' checked = {props.selected === 'films'} onChange = {(e) => {props.setFetchUrl(`https://swapi.py4e.com/api/${e.target.value}/`); props.setSelectedDataType(e.target.value); props.setIsLoading(true);}}></input>
        <label htmlFor = 'films'>Films</label> */}

        {datatypes.map(datatype => {
          return <>
          <input type = 'radio' value = {datatype.toLowerCase()} name = 'dataType' id = {datatype.toLowerCase()} checked = {props.selected === datatype.toLowerCase()}
          onChange = {(event) => {
            props.setFetchUrl(`https://swapi.py4e.com/api/${event.target.value}/`);
            props.setSelectedDataType(event.target.value);
            props.setIsLoading(true);
          }
          }></input>
          <label htmlFor = {datatype.toLowerCase()}>{datatype}</label>
          </>
        })}

      </fieldset>
      
      <label htmlFor = 'search-input'>Search for Star Wars Data!</label>
      <input type = 'search' id = 'search-input' placeholder = 'find data. SW data.' onChange = {(event) => props.setSearchInput(event.target.value)}></input>
    </form>
    </>
  );
}

export default Searchbar;