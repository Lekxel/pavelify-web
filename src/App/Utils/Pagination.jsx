import LeftArrow from "../../Assets/img/left-contact.png";
import RightArrow from "../../Assets/img/right-contact.png";

const Pagination = ({ page, limit, total, totalPages, setPage }) => {
  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <div className="slider-area  d-flex-align-center">
      <p className="pt-3 me-2">
        <span>{(page - 1) * limit + 1}</span> -{" "}
        <span>{total > page * limit ? page * limit : total}</span> of <span>{total}</span>
      </p>
      <div className="slider-images d-flex-align-center">
        <img
          onClick={() => (page > 1 ? handlePageChange(--page) : {})}
          style={{ opacity: page <= 1 ? "40%" : "100%" }}
          src={LeftArrow}
          alt=""
          className="cursor-pointer"
        />
        <img
          onClick={() => (page < totalPages ? handlePageChange(++page) : {})}
          style={{ opacity: page >= totalPages ? "40%" : "100%" }}
          src={RightArrow}
          alt=""
          className="cursor-pointer ms-2"
        />
      </div>
    </div>
  );
};

export default Pagination;
