import React, {Fragment} from 'react';

function Pagination(props) {
  return (
    <section>
    <button onClick = {(event) => {
      if (props.pageSelected > 1) {
        props.setPageSelected(prevPageSelected => prevPageSelected - 1);
      }
    }}>&lt;</button>    
      {Object.keys(props.pages).flatMap((page, index, array) => {
        return page === '1' || page === props.pageSelected || page === array[array.length - 1] ?
        
        (
          <button key = {`page #${page}`} onClick = {(event) => {
            props.setPageSelected(page);
            }
          }>{page}</button>
        ) : Math.abs(page - props.pageSelected) === 1 ?

          page - 1 > 1 && props.pageSelected - page === 1 ?

          (
            <Fragment key = {`page #${page}`}>
            <span>...</span>
            <button onClick = {(event) => {
              props.setPageSelected(page);
              }
            }>{page}</button>
            </Fragment>
          ) : array[array.length - 1] - page > 1 && props.pageSelected - page !== 1 ?

            (
              <Fragment key = {`page #${page}`}>          
              <button key = {`page #${page}`} onClick = {(event) => {
                props.setPageSelected(page);
                }
              }>{page}</button>
              <span>...</span>
              </Fragment>
            ) :

            (
              <button key = {`page #${page}`} onClick = {(event) => {
                props.setPageSelected(page);
                }
              }>{page}</button>

        ) : [];
      })}
      <button onClick = {(event) => {
        if (props.pageSelected < Object.keys(props.pages)[Object.keys(props.pages).length - 1]) {
          props.setPageSelected(prevPageSelected => prevPageSelected + 1);
        }
      }}>&gt;</button>
    </section>    
  )
}

export default Pagination;