import React, {useState, useEffect} from 'react';
import './App.css';
import Searchbar from "./Searchbar.js";
import Output from './Output.js';

function App() {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [all, setAll] = useState([]);  
  const [selectedDataType, setSelectedDataType] = useState('people');
  const [fetchUrl, setFetchUrl] = useState(`https://swapi.py4e.com/api/${selectedDataType}/`);
  const [searchInput, setSearchInput] = useState('');  

  useEffect(() => {
    fetch(fetchUrl)
      .then(response => response.json())           
      .then(
        result => {
          setData(result);                 
          setAll(result.results);                                  
        },
        error => {          
          setError(error);
          setIsLoading(false);
        })              
      .then(async () => {       
        let numOfPages = Math.ceil(data.count / 10);
        let pages = [];
        
        for (let num = 2; num <= numOfPages; num++) {
          pages.push(num);
        }   

        console.log('numOfPages', numOfPages);
        console.log('pages', pages);

        let results = await Promise.all(pages.map(async item => {
          const response = await fetch(`${fetchUrl}?page=${item}`);
          const result = await response.json();
          return result.results;
        }));

        setAll(prevAll => prevAll.concat(...results));
      })
      .then(() => setIsLoading(false));
  }, [fetchUrl, data.count]); 

  // async function getData() {
  //   let page = 1;
  //   let total = [];

  //   let response = await fetch(`https://swapi.py4e.com/api/people/?page=${page}`);
  //   let data = await response.json();
  //   //console.log(data);
  //   total = total.concat(data.results);
  //   page++;
  //   //console.log(total);
  //   while(data.next) {
  //       console.log(data.next);
  //       if (data.next === null) {
  //           break;
  //       } else {
  //           data = await fetch(`https://swapi.py4e.com/api/people/?page=${page}`);
  //           data = await data.json();
  //           console.log(data);
  //           total = total.concat(data.results);    
  //       }
  //       page++;
  //   }

  //   console.log(total);
  // }

  // getData();

  //console.log(data);
  //console.log('all', all);
  //console.log('data results after', data.results);

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (isLoading) {
    return <div>Loading... Please wait.</div>
  } else {
    return (
      <>
      <header>
        <h1>Starting...</h1>
      </header>
      <main>
        <Searchbar selected = {selectedDataType} setIsLoading = {setIsLoading} setFetchUrl = {setFetchUrl} setSelectedDataType = {setSelectedDataType} setSearchInput = {setSearchInput}/>
        <Output data = {all} selected = {selectedDataType} searchInput = {searchInput} />
      </main>
      </>
    );
  }  

}

export default App;
