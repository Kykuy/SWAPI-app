import React, { useState, useEffect, Fragment } from 'react';
import Modal from './Modal.js';

const Output = (props) => { 
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});

  const modal = showModal ? (
    <Modal setShowModal = {setShowModal} modalData = {modalData}>
      <p>{modalData.name}</p>
      <button onClick = {(event) => setShowModal(false)}>Hide modal</button>
    </Modal>
  ) : null;
  // console.log('output props', props);
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

  // let [pages, setPages] = useState({});
  // let [pageSelected, setPageSelected] = useState('1');
  let {data} = props;

  // createPages(data);

  // useEffect(() => {
  //   createPages(data);
  // }, [data]);
   

  // function createPages(data) {
  //   if (data.length > 10) {
  //     let total = Array.from(data);
  //     let currPage = 1;
  //     let pagesDictionary = {};

  //     while (total.length) {
  //       let page = total.splice(0, 10);
  //       pagesDictionary[currPage] = page;
  //       currPage++;
  //     } 
      
  //     setPages(pagesDictionary);
  //   }
  // }

  // console.log('pages', pages);

  // let finalOutput = props.selected !== 'films' ?
  //  data.filter( item => item.name.toLowerCase().includes( props.searchInput.toLowerCase() ) ) :
  //  data.filter( item => item.title.toLowerCase().includes( props.searchInput.toLowerCase() ) );

  return props?.selectedDataType !== 'films' ? (
    <>         
    <section>
      {/* {finalOutput.map(item => {
        return (
          <article key = {item.url}>
            <h1>Name: {item.name}</h1>
          </article>
        );
      })} */}
      {props.pages[props.pageSelected]?.map(item => {
        return (
          <article key = {item.url}>
            <h1 onClick = {(event) => {
              setShowModal(prevShowModal => !prevShowModal);
              setModalData(item);
            }}>Name: {item.name}</h1>
          </article>
        );
      })}
    </section>
    {modal}
    </>    
  ) :
  ( 
    <>    
    <section>
      {/* {finalOutput.map(item => {
        return (
          <article key = {item.url}>
            <h1>Title: {item.title}</h1>
          </article>
        );
      })} */}
      {props.pages[props.pageSelected]?.map(item => {
        return (
          <article key = {item.url}>
            <h1>Title: {item.title}</h1>
          </article>
        );
      })}
    </section>
    {modal}
    </>    
  );
}

export default Output;