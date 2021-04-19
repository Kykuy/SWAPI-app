import React, {useState, useEffect, Fragment} from 'react';

function Pagination(props) {
  const [pageToJumpTo, setPageToJumpTo] = useState(NaN);

  const resultsNumber = props.isSearching && props.data.length < 1 ?
   <section className = 'output'><p>No matches found</p></section> :
   <p className = 'resultsNumber'>Showing {`${1 + (props.pageSelected - 1) * props.itemsPerPage}`}-{`${(props.pageSelected - 1) * props.itemsPerPage + props.pages[props.pageSelected]?.length}`} of {`${props.data?.length}`} items</p>;

  const wrongPageNumber = <div className = 'hidden wrongPageTooltip'>Wrong page number</div>;

  const pageButtons = props.screenWidth > 300 ? Object.keys(props.pages).flatMap((page, index, array) => {
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
  }) :

    <select className = 'pageSelect' value = {props.pageSelected} onChange = {(event) => props.setPageSelected(parseInt(event.target.value, 10))}>
      {Object.keys(props.pages).map(page => {
        return <option key = {page} value = {page}>{page}</option>
      })}
    </select>;

  const pages = props.isSearching && props.data.length < 1 ? <>{resultsNumber}</> :
   <section className = 'pagination'>      
    <div className = 'pages'>
      <button disabled = {props.pageSelected <= 1} onClick = {(event) => {
        if (props.pageSelected > 1) {
          props.setPageSelected(prevPageSelected => prevPageSelected - 1);
        }
      }}>&lt;</button>

      {pageButtons}

      <button disabled = {props.pageSelected === parseInt(Object.keys(props.pages)[Object.keys(props.pages).length - 1], 10)} onClick = {(event) => {
        if (props.pageSelected < Object.keys(props.pages)[Object.keys(props.pages).length - 1]) {
          props.setPageSelected(prevPageSelected => prevPageSelected + 1);
        }
      }}>&gt;</button>
    </div>

    <label className = 'pageToJumpLabel' htmlFor = 'pageToJump'>Jump to page:</label>
    <div className = 'tooltipBlock'>
      <input className = 'pageToJumpInput' id = 'pageToJump' name = 'pageToJump' type = 'number' min = '1' max = {Object.keys(props.pages).length}
      
       onChange = {(event) => {
        if (event.target.value < 0) {
          event.target.value = event.target.min;
        } else if (event.target.value > parseInt(event.target.max, 10)) {
          event.target.value = event.target.max;
        }

        let tooltip = document.querySelector('.wrongPageTooltip');
        let input = document.querySelector('.pageToJumpInput');;

        if (!tooltip.classList.contains('hidden')) {
          tooltip.classList.add('hidden');
          input.classList.remove('wrongPageFocus');
        }

        setPageToJumpTo(parseInt(event.target.value, 10));
      }}

      onKeyPress = {(event) => {
        if (event.key === 'Enter' && pageToJumpTo > 0) {
          props.setPageSelected(pageToJumpTo);            
        } else if (event.key === 'Enter' && (pageToJumpTo < 1 || isNaN(pageToJumpTo) || pageToJumpTo === undefined)) {            
          let tooltip = document.querySelector('.wrongPageTooltip');
          let input = document.querySelector('.pageToJumpInput');

          tooltip.classList.remove('hidden');
          input.classList.add('wrongPageFocus');

          setTimeout(() => {
            tooltip.classList.add('hidden');
            input.classList.remove('wrongPageFocus');
          }, 3000)
        }
      }}
      ></input>
      {wrongPageNumber}
    </div>
    
    <button disabled = {pageToJumpTo < 1 || isNaN(pageToJumpTo)} onClick = {(event) => {
      props.setPageSelected(pageToJumpTo);
    }}
    >Jump</button>

    <label className = 'itemsPerPageLabel' htmlFor = 'itemsPerPage'>Maximum items displayed per page:</label>
    <select className = 'itemsPerPageSelect' id = 'itemsPerPage' name = 'itemsPerPage' value = {props.itemsPerPage} onChange = {(event) => {
      props.setItemsPerPage(parseInt(event.target.value, 10))
    }}>
      <option value = '10'>10</option>
      <option value = '20'>20</option>
      <option value = '30'>30</option>
    </select>

    {resultsNumber}
  </section>;
  
  return (
    <>
    {pages}
    </>
  );
}

export default Pagination;