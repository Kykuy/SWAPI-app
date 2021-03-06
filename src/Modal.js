import React, {useState, useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';

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
          const response = await fetch(value);
          const result = await response.json();          
          return [key, result.name];
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

  function makeKeyReadable(keyString) {
    let result = keyString;

    result = `${result[0].toUpperCase()}${result.slice(1)}`;
    result = result.replace(/_/g, ' ');
    return result;
  }

  const modal = isModalLoading ? <p className = 'modal-window'>Loading...</p> :
  <section className = 'modal-window'>          
    <div className = 'modal-container'>
      {Object.entries(modalDataToDisplay)
        .filter(([key, value]) => (key !== 'created' && key !== 'edited' && key !== 'url') /*&& value?.length > 0*/)
        .map(([key, value]) => {
          switch(props.selectedDataType) {
            case 'people':
              return key === 'mass' ? (
                <article className = 'modal-row' key = {key}>
                  <p>{makeKeyReadable(key)}:</p><p>{value?.length > 0 ? value : 'none'} kg</p>
                </article>
              ) : key === 'height' ? (
                <article className = 'modal-row' key = {key}>
                  <p>{makeKeyReadable(key)}:</p><p>{value?.length > 0 ? value : 'none'} cm</p>
                </article>
              ) : (
                <article className = 'modal-row' key = {key}>
                  <p>{makeKeyReadable(key)}:</p><p>{value?.length > 0 ? value : 'none'}</p>
                </article>
              );
      
            case 'vehicles':
              return key === 'cargo_capacity' ? (
                <article className = 'modal-row' key = {key}>
                  <p>{makeKeyReadable(key)}:</p><p> {value?.length > 0 ? value : 'none'} kg</p>
                </article>
              ) : key === 'length' ? (
                <article className = 'modal-row' key = {key}>
                  <p>{makeKeyReadable(key)}:</p><p> {value?.length > 0 ? value : 'none'} m</p>
                </article>
              ) : key === 'max_atmosphering_speed' ? (
                <article className = 'modal-row' key = {key}>
                  <p>{makeKeyReadable(key)}:</p><p> {value?.length > 0 ? value : 'none'} kph</p>
                </article>
              ) : (
                <article className = 'modal-row' key = {key}>
                  <p>{makeKeyReadable(key)}:</p><p> {value?.length > 0 ? value : 'none'}</p>
                </article>
              );
      
            case 'starships':
              return key === 'cargo_capacity' ? (
                <article className = 'modal-row' key = {key}>
                  <p>{makeKeyReadable(key)}:</p><p> {value?.length > 0 ? value : 'none'} kg</p>
                </article>
              ) : key === 'length' ? (
                <article className = 'modal-row' key = {key}>
                  <p>{makeKeyReadable(key)}:</p><p> {value?.length > 0 ? value : 'none'} m</p>
                </article>
              ) : key === 'max_atmosphering_speed' && value !== 'n/a' ? (
                <article className = 'modal-row' key = {key}>
                  <p>{makeKeyReadable(key)}:</p><p> {value?.length > 0 ? value : 'none'} kph</p>
                </article>
              ) : key === 'MGLT' ? (
                <article className = 'modal-row' key = {key}>
                  <p>{makeKeyReadable(key)}:</p><p> {value?.length > 0 ? value : 'none'} ph</p>
                </article>
              ) : (
                <article className = 'modal-row' key = {key}>
                  <p>{makeKeyReadable(key)}:</p><p> {value?.length > 0 ? value : 'none'}</p>
                </article>
              );
            case 'planets':
              return key === 'rotation_period' ? (
                <article className = 'modal-row' key = {key}>
                  <p>{makeKeyReadable(key)}:</p><p> {value?.length > 0 ? value : 'none'} hour(s)</p>
                </article>
              ) : key === 'diameter' ? (
                <article className = 'modal-row' key = {key}>
                  <p>{makeKeyReadable(key)}:</p><p> {value?.length > 0 ? value : 'none'} km</p>
                </article>
              ) : key === 'orbital_period' ? (
                <article className = 'modal-row' key = {key}>
                  <p>{makeKeyReadable(key)}:</p><p> {value?.length > 0 ? value : 'none'} day(s)</p>
                </article>
              ) : key === 'surface_water' ? (
                <article className = 'modal-row' key = {key}>
                  <p>{makeKeyReadable(key)}:</p><p> {value?.length > 0 ? value : 'none'} %</p>
                </article>
              ) : key === 'gravity' ? (
                <article className = 'modal-row' key = {key}>
                  <p>{makeKeyReadable(key)}:</p><p> {value?.length > 0 ? value : 'none'} G</p>
                </article>
              ) : (
                <article className = 'modal-row' key = {key}>
                  <p>{makeKeyReadable(key)}:</p><p> {value?.length > 0 ? value : 'none'}</p>
                </article>
              );
            case 'species':
              return key === 'average_lifespan' ? (
                <article className = 'modal-row' key = {key}>
                  <p>{makeKeyReadable(key)}:</p><p> {value?.length > 0 ? value : 'none'} year(s)</p>
                </article>
              ) : key === 'average_height' ? (
                <article className = 'modal-row' key = {key}>
                  <p>{makeKeyReadable(key)}:</p><p> {value?.length > 0 ? value : 'none'} cm</p>
                </article>
              ) : (
                <article className = 'modal-row' key = {key}>
                  <p>{makeKeyReadable(key)}:</p><p> {value?.length > 0 ? value : 'none'}</p>
                </article>
              );
            case 'films':
              return key !== 'episode_id' ? (
                <article className = 'modal-row' key = {key}>
                  <p>{makeKeyReadable(key)}:</p><p> {value?.length > 0 ? value : 'none'}</p>
                </article>
              ) : (
                <article className = 'modal-row' key = {key}>
                  <p>{makeKeyReadable(key)}:</p><p> {value}</p>
                </article>
              );
            default:
          }
        }
        )}
      <button onClick = {(event) => props.setShowModal(false)}>Hide modal</button>
    </div>
  </section>;

  return ReactDOM.createPortal(modal, rootElementRef.current);
}

export default Modal;