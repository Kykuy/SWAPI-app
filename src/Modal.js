import React, {useState, useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';

function Modal(props) {  
  const rootElementRef = useRef(document.createElement('article'));
  const [modalDataToDisplay, setModalDataToDisplay] = useState({});
  
  const {setIsModalLoaging, modalData} = props;  

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
        } else {
          return [key, value];
        }
      }));              
      setModalDataToDisplay(Object.fromEntries(data));      
      setIsModalLoaging(false);
    }

    getDataForModal(modalData);
  }, [modalData, setIsModalLoaging]);
  // console.log('modalDataToDisplay', modalDataToDisplay);

  function makeKeyReadable(keyString) {
    let result = keyString;

    result = `${result[0].toUpperCase()}${result.slice(1)}`;
    result = result.replace('_', ' ');
    return result;
  }

  return ReactDOM.createPortal(<article className = 'modal'>          
  {Object.entries(modalDataToDisplay)
    .filter(([key, value]) => key !== 'created' && key !== 'edited' && key !== 'url')
    .map(([key, value]) => {
      return (
        <p>{makeKeyReadable(key)}: {value}</p>
      )}
    )}
  <button onClick = {(event) => props.setShowModal(false)}>Hide modal</button>
</article>, rootElementRef.current);
}

export default Modal;