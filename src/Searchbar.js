import React, {useState, useEffect, Fragment } from 'react';

function Searchbar(props) {
  const [searchInput, setSearchInput] = useState('');  

  const datatypes = ['People', 'Vehicles', 'Starships', 'Planets', 'Species', 'Films'];

  const {searchData} = props;

  const datalist = searchInput.length >= 2 && searchData
  .filter(item => item.name.toLowerCase().startsWith(searchInput.toLowerCase()) || item.name.toLowerCase().includes(searchInput.toLowerCase()))
  .length > 0 ?
   <datalist id = 'searchList'>
    {searchData
    .filter(item => item.name.toLowerCase().startsWith(searchInput.toLowerCase()) || item.name.toLowerCase().includes(searchInput.toLowerCase()))
    .map(item => {
      return <option key = {item.url} value = {item.name} />
    })
    }
   </datalist>
  : null;
  // console.log('searchData', searchData);

  const cancelSearch = props.isSearching ? <button onClick = {(event) => {
    props.setIsSearching(false);
    props.setData(searchData);
    setSearchInput('');
  }}>Cancel search</button> : null;
  
function startSearch() {
  props.setData( searchData
    .filter(item => item.name.toLowerCase().startsWith(searchInput.toLowerCase()) || item.name.toLowerCase().includes(searchInput.toLowerCase()))
    .sort( (a, b) => {
      if (a.name.toLowerCase().startsWith(searchInput.toLowerCase()) && !b.name.toLowerCase().startsWith(searchInput.toLowerCase())) {
        return -1;
      } else if (a.name.toLowerCase().startsWith(searchInput.toLowerCase()) && b.name.toLowerCase().startsWith(searchInput.toLowerCase())) {
        return 0;
      } else {
        return 1;
      }
  }) );
  props.setPageSelected(1);
  props.setIsSearching(true);
}

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
          return <Fragment key = {datatype}>
          <input type = 'radio' value = {datatype.toLowerCase()} name = 'dataType' id = {datatype.toLowerCase()} checked = {props.selected === datatype.toLowerCase()}
          onChange = {(event) => {
            props.setFetchUrl(`https://swapi.py4e.com/api/${event.target.value}/`);
            props.setSelectedDataType(event.target.value);
            props.setPageSelected(1);
            props.setIsLoading(true);
            props.setIsSearching(false);
            setSearchInput('');
          }
          }></input>
          <label htmlFor = {datatype.toLowerCase()}>{datatype}</label>
          </Fragment>
        })}

      </fieldset>
    </form>

    <label htmlFor = 'search-input'>Search for Star Wars Data!</label>
    <input list = 'searchList' type = 'search' value = {searchInput} id = 'search-input' size = '25' disabled = {props.selected === 'films'}
      placeholder = {props.selected === 'films' ? 'Searching is disabled for films' : 'find data. SW data.'}
      onChange = {(event) => setSearchInput(event.target.value)}
      onKeyDown = {(event) => event.key === 'Enter' ? startSearch() : null}
    ></input>
    {datalist}
    <button disabled = {props.selected === 'films'} onClick = {(event) => {
      startSearch();
    }}>Start search</button>
    {cancelSearch}
    </>
    
  );
}

export default Searchbar;