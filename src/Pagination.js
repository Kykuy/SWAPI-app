import React, {Fragment} from 'react';

function Pagination(props) {
  return (
    <section>    
    {Object.keys(props.pages).flatMap((page, index, array) => {
      return page === '1' || page === props.pageSelected || page === array[array.length - 1] ?
      
      (
        <button key = {`page #${page}`} onClick = {(event) => {
          props.setPageSelected(page, 10);
          }
        }>{page}</button>
      ) : Math.abs(page - props.pageSelected) === 1 ?

        page - 1 > 1 && props.pageSelected - page === 1 ?

        (
          <Fragment key = {`page #${page}`}>
          <span>...</span>
          <button onClick = {(event) => {
            props.setPageSelected(page, 10);
            }
          }>{page}</button>
          </Fragment>
        ) : array[array.length - 1] - page > 1 && props.pageSelected - page !== 1 ?

          (
            <Fragment key = {`page #${page}`}>          
            <button key = {`page #${page}`} onClick = {(event) => {
              props.setPageSelected(page, 10);
              }
            }>{page}</button>
            <span>...</span>
            </Fragment>
          ) :

          (
            <button key = {`page #${page}`} onClick = {(event) => {
              props.setPageSelected(page, 10);
              }
            }>{page}</button>

      ) : [];
    })}
    </section>
  )
}

export default Pagination;