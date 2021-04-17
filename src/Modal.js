import React, {useState, useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';
import {makeStringReadable} from './utils';

function Modal(props) {  
  const rootElementRef = useRef(document.createElement('article'));
  const [modalDataToDisplay, setModalDataToDisplay] = useState({});
  const [isModalLoading, setIsModalLoading] = useState(true);

  const {modalData} = props;  

  useEffect(() => {
    let rootElement = rootElementRef.current;
    const modalRoot = document.getElementById("modal-root");
    modalRoot.appendChild(rootElement);

    return function cleanup() {
      modalRoot.removeChild(rootElement);
    };
  })

  useEffect(() => {
    async function getDataForModal(modalData) {      
      let data = await Promise.all(Object.entries(modalData).map(async ([key, value]) => {

        if (Array.isArray(value) && value.length > 0) {
          let fetchedData = await Promise.all(value.map(async (url) => {
            const response = await fetch(url);
            const result = await response.json();
            return result.name || result.title;
          }));
          return [key, fetchedData.join(", ")];

        } else if (key === 'homeworld') {

          if (value === null) {
            return [key, ''];
          } else {
            const response = await fetch(value);
            const result = await response.json();          
            return [key, result.name];
          }
          
        } else {
          return [key, value];
        }
      }));              
      setModalDataToDisplay(Object.fromEntries(data));      
      setIsModalLoading(false);
    }

    getDataForModal(modalData);
  }, [modalData, setIsModalLoading]);
  console.log('modalDataToDisplay', modalDataToDisplay);


  const modal = isModalLoading ? <p className = 'modal-window'>Loading...</p> :
  <section className = 'modal-window'>          
    <div className = {`modal-container${props.selectedDataType === 'films' ? ' modal-container-film' : ''}`}>
      <button className = 'close-modal-btn' onClick = {(event) => props.setShowModal(false)}>X</button>
      {Object.entries(modalDataToDisplay)
        .filter(([key, value]) => (key !== 'created' && key !== 'edited' && key !== 'url') /*&& value?.length > 0*/)
        .map(([key, value]) => {
          switch(props.selectedDataType) {
            case 'people':
              return key === 'mass' ? (
                <article className = 'modal-row' key = {key}>
                  <p>{makeStringReadable(key)}:</p><p>{value?.length > 0 ? makeStringReadable(value) : makeStringReadable('none')} kg</p>
                </article>
              ) : key === 'height' ? (
                <article className = 'modal-row' key = {key}>
                  <p>{makeStringReadable(key)}:</p><p>{value?.length > 0 ? makeStringReadable(value) : makeStringReadable('none')} cm</p>
                </article>
              ) : (
                <article className = 'modal-row' key = {key}>
                  <p>{makeStringReadable(key)}:</p><p>{value?.length > 0 ? makeStringReadable(value) : makeStringReadable('none')}</p>
                </article>
              );
      
            case 'vehicles':
              return key === 'cargo_capacity' ? (
                <article className = 'modal-row' key = {key}>
                  <p>{makeStringReadable(key)}:</p><p> {value?.length > 0 ? makeStringReadable(value) : makeStringReadable('none')} kg</p>
                </article>
              ) : key === 'length' ? (
                <article className = 'modal-row' key = {key}>
                  <p>{makeStringReadable(key)}:</p><p> {value?.length > 0 ? makeStringReadable(value) : makeStringReadable('none')} m</p>
                </article>
              ) : key === 'max_atmosphering_speed' ? (
                <article className = 'modal-row' key = {key}>
                  <p>{makeStringReadable(key)}:</p><p> {value?.length > 0 ? makeStringReadable(value) : makeStringReadable('none')} kph</p>
                </article>
              ) : (
                <article className = 'modal-row' key = {key}>
                  <p>{makeStringReadable(key)}:</p><p> {value?.length > 0 ? makeStringReadable(value) : makeStringReadable('none')}</p>
                </article>
              );
      
            case 'starships':
              return key === 'cargo_capacity' ? (
                <article className = 'modal-row' key = {key}>
                  <p>{makeStringReadable(key)}:</p><p> {value?.length > 0 ? makeStringReadable(value) : makeStringReadable('none')} kg</p>
                </article>
              ) : key === 'length' ? (
                <article className = 'modal-row' key = {key}>
                  <p>{makeStringReadable(key)}:</p><p> {value?.length > 0 ? makeStringReadable(value) : makeStringReadable('none')} m</p>
                </article>
              ) : key === 'max_atmosphering_speed' && value !== 'n/a' ? (
                <article className = 'modal-row' key = {key}>
                  <p>{makeStringReadable(key)}:</p><p> {value?.length > 0 ? makeStringReadable(value) : makeStringReadable('none')} kph</p>
                </article>
              ) : key === 'MGLT' ? (
                <article className = 'modal-row' key = {key}>
                  <p>{makeStringReadable(key)}:</p><p> {value?.length > 0 ? makeStringReadable(value) : makeStringReadable('none')} ph</p>
                </article>
              ) : (
                <article className = 'modal-row' key = {key}>
                  <p>{makeStringReadable(key)}:</p><p> {value?.length > 0 ? makeStringReadable(value) : makeStringReadable('none')}</p>
                </article>
              );
            case 'planets':
              return key === 'rotation_period' ? (
                <article className = 'modal-row' key = {key}>
                  <p>{makeStringReadable(key)}:</p><p> {value?.length > 0 ? makeStringReadable(value) : makeStringReadable('none')} hour(s)</p>
                </article>
              ) : key === 'diameter' ? (
                <article className = 'modal-row' key = {key}>
                  <p>{makeStringReadable(key)}:</p><p> {value?.length > 0 ? makeStringReadable(value) : makeStringReadable('none')} km</p>
                </article>
              ) : key === 'orbital_period' ? (
                <article className = 'modal-row' key = {key}>
                  <p>{makeStringReadable(key)}:</p><p> {value?.length > 0 ? makeStringReadable(value) : makeStringReadable('none')} day(s)</p>
                </article>
              ) : key === 'surface_water' ? (
                <article className = 'modal-row' key = {key}>
                  <p>{makeStringReadable(key)}:</p><p> {value?.length > 0 ? makeStringReadable(value) : makeStringReadable('none')} %</p>
                </article>
              ) : key === 'gravity' ? (
                <article className = 'modal-row' key = {key}>
                  <p>{makeStringReadable(key)}:</p><p> {value?.length > 0 ? makeStringReadable(value) : makeStringReadable('none')} G</p>
                </article>
              ) : (
                <article className = 'modal-row' key = {key}>
                  <p>{makeStringReadable(key)}:</p><p> {value?.length > 0 ? makeStringReadable(value) : makeStringReadable('none')}</p>
                </article>
              );
            case 'species':
              return key === 'average_lifespan' ? (
                <article className = 'modal-row' key = {key}>
                  <p>{makeStringReadable(key)}:</p><p> {value?.length > 0 ? makeStringReadable(value) : makeStringReadable('none')} year(s)</p>
                </article>
              ) : key === 'average_height' ? (
                <article className = 'modal-row' key = {key}>
                  <p>{makeStringReadable(key)}:</p><p> {value?.length > 0 ? makeStringReadable(value) : makeStringReadable('none')} cm</p>
                </article>
              ) : (
                <article className = 'modal-row' key = {key}>
                  <p>{makeStringReadable(key)}:</p><p> {value?.length > 0 ? makeStringReadable(value) : makeStringReadable('none')}</p>
                </article>
              );
            case 'films':
              return key !== 'episode_id' ? (
                <article className = 'modal-row' key = {key}>
                  <p>{makeStringReadable(key)}:</p><p> {value?.length > 0 ? makeStringReadable(value) : makeStringReadable('none')}</p>
                </article>
              ) : (
                <article className = 'modal-row' key = {key}>                  
                  <p>{makeStringReadable(key)}</p><p>{value}</p>
                </article>
              );
            default:
          }
        }
        )}      
    </div>
  </section>;

  return ReactDOM.createPortal(modal, rootElementRef.current);
}

export default Modal;