import React, {useState, useEffect} from 'react';
import './App.css';
import './Searchbar.css';
import './Modal.css';
import './Pagination.css';
import './Output.css';
import Searchbar from "./Searchbar.js";
import Pagination from "./Pagination.js";
import Output from './Output.js';

function App() {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [speciesNames, setSpeciesNames] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);   
  const [isSearching, setIsSearching] = useState(false);
  const [selectedDataType, setSelectedDataType] = useState('people');
  const [fetchUrl, setFetchUrl] = useState(`https://swapi.py4e.com/api/${selectedDataType}/`);  
  const [pages, setPages] = useState({});
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [pageSelected, setPageSelected] = useState(1);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);  
  // useEffect(() => {
  //   fetch(fetchUrl)
  //     .then(response => response.json())           
  //     .then(
  //       result => {
  //         setData(result);                 
  //         setAll(result.results);                                  
  //       },
  //       error => {          
  //         setError(error);
  //         setIsLoading(false);
  //       })              
  //     .then(async () => {       
  //       let numOfPages = Math.ceil(data.count / 10);
  //       let pages = [];
        
  //       for (let num = 2; num <= numOfPages; num++) {
  //         pages.push(num);
  //       }   

  //       console.log('numOfPages', numOfPages);
  //       console.log('pages', pages);

  //       let results = await Promise.all(pages.map(async item => {
  //         const response = await fetch(`${fetchUrl}?page=${item}`);
  //         const result = await response.json();
  //         return result.results;
  //       }));

  //       setAll(prevAll => prevAll.concat(...results));
  //     })
  //     .then(() => setIsLoading(false));
  // }, [fetchUrl, data.count]); 

  useEffect(() => {
    async function getSpeciesNames() {

      try {
        let speciesDictionary = {};
        let total = [];

        let response = await fetch(`https://swapi.py4e.com/api/species/`);
        let data = await response.json();    
        total = total.concat(data.results);
  
        while(data.next) {      
          if (data.next === null) {
            break;
          } else {
            data = await fetch(data.next);
            data = await data.json();        
            total = total.concat(data.results);
          }        
        }
        
        for (let entry of total) {
          speciesDictionary[entry.url] = entry.name;
        }        

        setSpeciesNames(speciesDictionary);

      } catch(error) {
        setError(error);
      }
    }
    
    getSpeciesNames();
  }, [])
  
  useEffect(() => {
    async function getData(url) {
        
      try {
        let total = [];
  
        let response = await fetch(url);
        let data = await response.json();    
        total = total.concat(data.results);
  
        while(data.next) {      
          if (data.next === null) {
            break;
          } else {
            data = await fetch(data.next);
            data = await data.json();        
            total = total.concat(data.results);
          }        
        }
        setData(total);
        setSearchData(total);
        setIsLoading(false);
      } catch(error) {
        setError(error);
      }  
    }

    getData(fetchUrl);
  }, [fetchUrl])

  useEffect(() => {
    function createPages(data, itemsPerPage) {
      let currPage = 1;
      let pagesDictionary = {};
      let dataToPaginate = Array.from(data);

      while(dataToPaginate.length) {      
        let page = dataToPaginate.splice(0, itemsPerPage);
        pagesDictionary[currPage] = page;
        currPage++;    
      }
      
      setPages(pagesDictionary);      
    }

    createPages(data, itemsPerPage);
  }, [data, itemsPerPage])

  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])
  
  console.log('data', data);

  //console.log(data);
  //console.log('all', all);
  //console.log('data results after', data.results);

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (isLoading) {
    // return <div className = 'modal-window'>Loading... Please wait.</div>
    return (
      <div className = 'wrapper'>
        <header>
          <h1 className = 'title'>SWAPIapp</h1>
        </header>
        <main>
          <Searchbar searchData = {searchData} setData = {setData} screenWidth = {screenWidth} isSearching = {isSearching} setIsSearching = {setIsSearching} selected = {selectedDataType} isLoading = {isLoading} setIsLoading = {setIsLoading} setFetchUrl = {setFetchUrl} setSelectedDataType = {setSelectedDataType} setPageSelected = {setPageSelected} />                   
        </main>
        <div class="loading-ring"><div></div><div></div><div></div><div></div>
        </div> 
        <footer className = 'footer'>
          <a href = 'https://swapi.py4e.com/' className = 'footerLink'>
            <p>Powered by <span>SWAPI</span></p>
          </a>
        </footer>
      </div>
    )
  } else {
    return (
      <div className = 'wrapper'>
        <header>
          <h1 className = 'title'>SWAPIapp</h1>
        </header>
        <main>
          <Searchbar searchData = {searchData} setData = {setData} screenWidth = {screenWidth} isSearching = {isSearching} setIsSearching = {setIsSearching} selected = {selectedDataType} isLoading = {isLoading} setIsLoading = {setIsLoading} setFetchUrl = {setFetchUrl} setSelectedDataType = {setSelectedDataType} setPageSelected = {setPageSelected} />
          <Pagination data = {data} pages = {pages} screenWidth = {screenWidth} pageSelected = {pageSelected} setPageSelected = {setPageSelected} itemsPerPage = {itemsPerPage} setItemsPerPage = {setItemsPerPage} isSearching = {isSearching} />
          <Output data = {data} speciesNames = {speciesNames} selectedDataType = {selectedDataType}  pages = {pages} pageSelected = {pageSelected} />
        </main>
        <footer className = 'footer'>
          <a href = 'https://swapi.py4e.com/' className = 'footerLink'>
            <p>Powered by <span>SWAPI</span></p>
          </a>
        </footer>
      </div>
    );
  }  

}

export default App;
