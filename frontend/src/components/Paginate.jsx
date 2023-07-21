import React from "react";
import { Pagination } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

function Paginate({ page, pages, keyword = "", isAdmin = false }) {
  const location = useLocation();

  if (keyword) {
    keyword = keyword.split("?keyword=")[1].split("&")[0];
  }

  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <Link
            key={x + 1}
            to={
              !isAdmin
                ? {
                    pathname: location.pathname,
                    search: `?keyword=${keyword}&page=${x + 1}`,
                  }
                : {
                    pathname: "/admin/productlist/",
                    search: `?keyword=${keyword}&page=${x + 1}`,
                  }
            }
            className={`page-link ${x + 1 === page ? "active" : ""}`}
          >
            {x + 1}
          </Link>
        ))}
      </Pagination>
    )
  );
}

export default Paginate;
