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
  // console.log('modalDataToDisplay', modalDataToDisplay);

  function makeKeyReadable(keyString) {
    let result = keyString;

    result = `${result[0].toUpperCase()}${result.slice(1)}`;
    result = result.replace('_', ' ');
    return result;
  }

  const modal = isModalLoading ? <p className = 'modal'>Loading...</p> :
  <article className = 'modal'>          
    {Object.entries(modalDataToDisplay)
      .filter(([key, value]) => (key !== 'created' && key !== 'edited' && key !== 'url') /*&& value?.length > 0*/)
      .map(([key, value]) => {
        switch(props.selectedDataType) {
          case 'people':
            return key === 'mass' ? (
              <p>{makeKeyReadable(key)}: {value?.length > 0 ? value : 'none'} kg</p>
            ) : key === 'height' ? (
              <p>{makeKeyReadable(key)}: {value?.length > 0 ? value : 'none'} cm</p>
            ) : (
              <p>{makeKeyReadable(key)}: {value?.length > 0 ? value : 'none'}</p>
            );
            
          case 'vehicles':
            return key === 'cargo_capacity' ? (
              <p>{makeKeyReadable(key)}: {value?.length > 0 ? value : 'none'} kg</p>
            ) : key === 'length' ? (
              <p>{makeKeyReadable(key)}: {value?.length > 0 ? value : 'none'} m</p>
            ) : key === 'max_atmosphering_speed' ? (
              <p>{makeKeyReadable(key)}: {value?.length > 0 ? value : 'none'} kph</p>
            ) : (
              <p>{makeKeyReadable(key)}: {value?.length > 0 ? value : 'none'}</p>
            );
          
          case 'starships':
            return key === 'cargo_capacity' ? (
              <p>{makeKeyReadable(key)}: {value?.length > 0 ? value : 'none'} kg</p>
            ) : key === 'length' ? (
              <p>{makeKeyReadable(key)}: {value?.length > 0 ? value : 'none'} m</p>
            ) : key === 'max_atmosphering_speed' && value !== 'n/a' ? (
              <p>{makeKeyReadable(key)}: {value?.length > 0 ? value : 'none'} kph</p>
            ) : key === 'MGLT' ? (
              <p>{makeKeyReadable(key)}: {value?.length > 0 ? value : 'none'} ph</p>
            ) : (
              <p>{makeKeyReadable(key)}: {value?.length > 0 ? value : 'none'}</p>
            );

          case 'planets':
            return key === 'rotation_period' ? (
              <p>{makeKeyReadable(key)}: {value?.length > 0 ? value : 'none'} hour(s)</p>
            ) : key === 'diameter' ? (
              <p>{makeKeyReadable(key)}: {value?.length > 0 ? value : 'none'} km</p>
            ) : key === 'orbital_period' ? (
              <p>{makeKeyReadable(key)}: {value?.length > 0 ? value : 'none'} day(s)</p>
            ) : key === 'surface_water' ? (
              <p>{makeKeyReadable(key)}: {value?.length > 0 ? value : 'none'} %</p>
            ) : key === 'gravity' ? (
              <p>{makeKeyReadable(key)}: {value?.length > 0 ? value : 'none'} G</p>
            ) : (
              <p>{makeKeyReadable(key)}: {value?.length > 0 ? value : 'none'}</p>
            );

          case 'species':
            return key === 'average_lifespan' ? (
              <p>{makeKeyReadable(key)}: {value?.length > 0 ? value : 'none'} year(s)</p>
            ) : key === 'average_height' ? (
              <p>{makeKeyReadable(key)}: {value?.length > 0 ? value : 'none'} m</p>
            ) : (
              <p>{makeKeyReadable(key)}: {value?.length > 0 ? value : 'none'}</p>
            );

          case 'films':
            return key !== 'episode_id' ? (
              <p>{makeKeyReadable(key)}: {value?.length > 0 ? value : 'none'}</p>
            ) : (
              <p>{makeKeyReadable(key)}: {value}</p>
            );
          default:
        }
      }
      )}
    <button onClick = {(event) => props.setShowModal(false)}>Hide modal</button>
  </article>;

  return ReactDOM.createPortal(modal, rootElementRef.current);
}

export default Modal;