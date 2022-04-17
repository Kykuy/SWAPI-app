import React, { useState, useEffect, Fragment } from 'react';
import Modal from '../Components/Modal.js';
import {makeStringReadable} from '../utils';

const Output = (props) => { 
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});  
  const {selectedDataType, speciesNames} = props;  

  const modal = showModal ? 
  (
    <Modal setShowModal = {setShowModal} modalData = {modalData} setModalData = {setModalData} selectedDataType = {selectedDataType}/>
  ) : null;  

  return selectedDataType !== 'films' ? (
    <>         
    <section className = 'output'>      
      {props.pages[props.pageSelected]?.map(item => {
        console.log(item);
        let additionalInfo;
        
        if (selectedDataType === 'people') {
          if (item?.species.length < 1) {
            additionalInfo = `Unspecified species, ${item?.gender}`;
          } else additionalInfo = `${speciesNames[item?.species]}, ${item?.gender}`;
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
            <p className = 'entryName'>{item.name}</p>            
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
      {props.pages[props.pageSelected].sort((a, b) => a.episode_id - b.episode_id).map(item => {
        return (
          <article className = 'outputEntry' key = {item.url} onClick = {(event) => {
              setShowModal(prevShowModal => !prevShowModal);
              setModalData(item);
            }}>
            <p className = 'entryName' >{item.title}</p>
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