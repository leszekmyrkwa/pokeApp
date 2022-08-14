import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import "./Pagination.scss";

const Pagination = props => (
  <div className="pagination">
    <div
      className="pagination__button-left"
      onClick={props.onPrev}
      data-testid="pagination-button-left"
    >
      <FontAwesomeIcon icon={faChevronRight} size="2x" />
    </div>
    <span data-testid="pagination-values">
      page {props.currentPage} of {props.pageCount}
    </span>
    <div
      className="pagination__button-right"
      onClick={props.onNext}
      data-testid="pagination-button-right"
    >
      <FontAwesomeIcon icon={faChevronRight} size="2x" />
    </div>
  </div>
);

export default Pagination;
