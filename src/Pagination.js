import React, {useState, useEffect, Fragment} from 'react';

function Pagination(props) {
  let [pageToJumpTo, setPageToJumpTo] = useState(1);

  return (    
    <section>      
      <button onClick = {(event) => {
        if (props.pageSelected > 1) {
          props.setPageSelected(prevPageSelected => prevPageSelected - 1);
        }
      }}>&lt;</button>

      {Object.keys(props.pages).flatMap((page, index, array) => {
        return parseInt(page, 10) === 1 || parseInt(page, 10) === props.pageSelected || parseInt(page, 10) === parseInt(array[array.length - 1], 10) ?
        
        (
          <button disabled = {parseInt(page, 10) === props.pageSelected} key = {`page #${page}`} onClick = {(event) => {
            props.setPageSelected(parseInt(page, 10));
          }
          }>{page}</button>
        ) : Math.abs(parseInt(page, 10) - props.pageSelected) === 1 ?

          parseInt(page, 10) - 1 > 1 && props.pageSelected - parseInt(page, 10) === 1 ?

          (
            <Fragment key = {`page #${page}`}>
            <span>...</span>
            <button onClick = {(event) => {
              props.setPageSelected(parseInt(page, 10));
            }
            }>{page}</button>
            </Fragment>
          ) : parseInt(array[array.length - 1], 10) - parseInt(page, 10) > 1 && props.pageSelected - parseInt(page, 10) !== 1 ?

            (
              <Fragment key = {`page #${page}`}>          
              <button key = {`page #${page}`} onClick = {(event) => {
                props.setPageSelected(parseInt(page, 10));
              }
              }>{page}</button>
              <span>...</span>
              </Fragment>
            ) :

            (
              <button key = {`page #${page}`} onClick = {(event) => {
                props.setPageSelected(parseInt(page, 10));
              }
              }>{page}</button>

        ) : [];
      })}

      <button onClick = {(event) => {
        if (props.pageSelected < Object.keys(props.pages)[Object.keys(props.pages).length - 1]) {
          props.setPageSelected(prevPageSelected => prevPageSelected + 1);
        }
      }}>&gt;</button>

      <label htmlFor = 'pageToJump'>Jump to page:</label>
      <input id = 'pageToJump' name = 'pageToJump' type = 'number' min = '1' max = {Object.keys(props.pages).length} onChange = {(event) => {
        if (event.target.value < 0) {
          event.target.value = event.target.min;          
        } else if (event.target.value > parseInt(event.target.max, 10)) {
          event.target.value = event.target.max;
        }
        setPageToJumpTo(parseInt(event.target.value, 10));
      }}></input>
      <button onClick = {(event) => {
        props.setPageSelected(pageToJumpTo);
      }}>Jump</button>

      <p>Showing {`${1 + (props.pageSelected - 1) * 10}`}-{`${(props.pageSelected - 1) * 10 + props.pages[props.pageSelected].length}`} of {`${props.data.length}`} items</p>
    </section>    
  )
}

export default Pagination;