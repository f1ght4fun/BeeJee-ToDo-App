import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  totalCount: PropTypes.number,
  page: PropTypes.number,
  pageSize: PropTypes.number,
  onChangePage: PropTypes.func.isRequired,
}

const defaultProps = {
  page: 1,
  pageSize: 2,
  totalCount: 0,
}

class Pagination extends React.Component {
  getPager(totalItems, currentPage, pageSize) {
    // default to first page
    currentPage = currentPage || 1

    // default page size is 10
    pageSize = pageSize || 10

    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize)

    let startPage, endPage
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1
      endPage = totalPages
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1
        endPage = 10
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9
        endPage = totalPages
      } else {
        startPage = currentPage - 5
        endPage = currentPage + 4
      }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1)

    // create an array of pages to repeat in the pager control
    let pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i)

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages,
    }
  }

  render() {
    const {totalCount, page, pageSize, onChangePage} = this.props
    const pager = this.getPager(totalCount, page, pageSize)

    if (!pager.pages || pager.pages.length <= 1) {
      // don't display pager if there is only 1 page
      return (null)
    }

    return (
      <div className="pagination_block">
        <nav className="pagination pagination_type">
          <ol className="pagination__list">
            <li className="pagination__group">
              {
                pager.currentPage === 1 ? (
                  <span className="pagination__item pagination__item__disabled">{'<<'}</span>
                ) : (
                  <a role="button" tabIndex="-2" className="pagination__item" onClick={() => onChangePage(1)}>{'<<'}</a>
                )
              }
            </li>
            <li className="pagination__group">
              {
                pager.currentPage === 1 ? (
                  <span className="pagination__item pagination__item__disabled">{'<'}</span>
                ) : (
                  <a role="button" tabIndex="-1" className="pagination__item" onClick={() => onChangePage(pager.currentPage - 1)}>{'<'}</a>
                )
              }
            </li>
            {
              pager.pages.map((page, index) => {
                if (pager.currentPage === page) {
                  return (
                    <li key={index} className="pagination__group">
                      <span className="pagination__item pagination__item_active">{page}</span>
                    </li>
                  )
                } else {
                  return (
                    <li key={index} className="pagination__group">
                      <a role="button" tabIndex={index} className="pagination__item" onClick={() => onChangePage(page)}>{page}</a>
                    </li>
                  )
                }
              })
            }
            <li className="pagination__group">
              {
                pager.currentPage === pager.totalPages ? (
                  <span className="pagination__item pagination__item__disabled">{'>'}</span>
                ) : (
                  <a role="button" tabIndex="11" className="pagination__item" onClick={() => onChangePage(pager.currentPage + 1)}>{'>'}</a>
                )
              }
            </li>
            <li className="pagination__group">
              {
                pager.currentPage === pager.totalPages ? (
                  <span className="pagination__item pagination__item__disabled">{'>>'}</span>
                ) : (
                  <a role="button" tabIndex="12" className="pagination__item" onClick={() => onChangePage(pager.totalPages)}>{'>>'}</a>
                )
              }
            </li>
          </ol>
        </nav>
      </div>
    )
  }
}

Pagination.propTypes = propTypes
Pagination.defaultProps = defaultProps

export default Pagination
