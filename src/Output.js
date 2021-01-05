import React, {useState, useEffect} from 'react';

const Output = (props) => { 
  //console.log('output props', props);
  //let filtered = props.data.filter(item => item !== undefined);
  //console.log('filtered data', filtered);
  
  // if (props.selected === 'films') {    
  //   filtered = filtered.reduce((acc, current) => {
  //     const x = acc.find(item => (item.title === current.title));
  //     if (!x) {
  //       return acc.concat([current]);
  //     } else {
  //       return acc;
  //     }
  //   }, []);
  // } else {    
  //   filtered = filtered.reduce((acc, current) => {
  //     const x = acc.find(item => (item.name === current.name));
  //     if (!x) {
  //       return acc.concat([current]);
  //     } else {
  //       return acc;
  //     }
  //   }, []);
  // }  
  
  let finalOutput = props.selected !== 'films' ?
   props.data.filter( item => item.name.toLowerCase().includes( props.searchInput.toLowerCase() ) ) :
   props.data.filter( item => item.title.toLowerCase().includes( props.searchInput.toLowerCase() ) );

  return props.selected !== 'films' ? (    
    <section>
      {finalOutput.map(item => {
        return (
          <article>
            <h1 key = {item.url}>Name: {item.name}</h1>
          </article>
        );
      })}      
    </section>    
  ) :
  (    
    <section>
      {finalOutput.map(item => {
        return (
          <article>
            <h1 key = {item.url}>Title: {item.title}</h1>
          </article>
        );
      })}      
    </section>    
  );
}

export default Output;