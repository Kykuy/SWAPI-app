import React, { useState, useEffect, Fragment } from 'react';
import Modal from './Modal.js';
import {makeStringReadable} from './utils';

const Output = (props) => { 
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});  
  const {selectedDataType} = props;
  // const modal = showModal ? isModalLoading ? (
  // <Modal>
  //   <article className = 'modal'>
  //     <p>Loading...</p>
  //     <button onClick = {(event) => setShowModal(false)}>Hide modal</button>
  //   </article>
  // </Modal>
  // ) :
  // (
  //   <Modal setShowModal = {setShowModal} modalData = {modalData}>
  //     <article className = 'modal'>
  //       <p>{modalData.name || modalData.title}</p>
  //       <button onClick = {(event) => setShowModal(false)}>Hide modal</button>
  //     </article>
  //   </Modal>
  // ) : null;

    const modal = showModal ? 
    (
      <Modal setShowModal = {setShowModal} modalData = {modalData} setModalData = {setModalData} selectedDataType = {selectedDataType}/>
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

  return selectedDataType !== 'films' ? (
    <>         
    <section className = 'output'>
      {/* {finalOutput.map(item => {
        return (
          <article key = {item.url}>
            <h1>Name: {item.name}</h1>
          </article>
        );
      })} */}
      {props.pages[props.pageSelected]?.map(item => {
        let additionalInfo;
        
        if (selectedDataType === 'people') {
          additionalInfo = makeStringReadable(item?.gender);
        } else if (selectedDataType === 'vehicles') {
          additionalInfo = makeStringReadable(item?.vehicle_class);
        } else if (selectedDataType === 'starships') {
          additionalInfo = makeStringReadable(item?.starship_class);
        } else if (selectedDataType === 'species') {
          additionalInfo = `${makeStringReadable(item?.classification)}, ${item?.designation}`;
        } else if (selectedDataType === 'planets') {
          additionalInfo = <span>{makeStringReadable(item?.climate)}<br/>{`${makeStringReadable(item?.terrain)}`}</span>;
        }

        return (
          <article className = 'outputEntry' key = {item.url} onClick = {(event) => {
              setShowModal(prevShowModal => !prevShowModal);
              setModalData(item);
            }}>
            <p className = 'entryName'>Name: {item.name}</p>            
            <p className = 'entryType'>{additionalInfo}</p>
          </article>
        );
      })}
    </section>
    {modal}
    </>    
  ) :
  ( 
    <>    
    <section className = 'output'>
      {/* {finalOutput.map(item => {
        return (
          <article key = {item.url}>
            <h1>Title: {item.title}</h1>
          </article>
        );
      })} */}
      {props.pages[props.pageSelected]?.sort((a, b) => a.episode_id - b.episode_id).map(item => {
        return (
          <article className = 'outputEntry' key = {item.url}>
            <p className = 'entryName' onClick = {(event) => {
              setShowModal(prevShowModal => !prevShowModal);
              setModalData(item);
            }}>Title: {item.title}</p>
            <p className = 'entryType'>{`Episode ${item.episode_id}`}</p>
          </article>
        );
      })}
    </section>
    {modal}
    </>    
  );
}

export default Output;