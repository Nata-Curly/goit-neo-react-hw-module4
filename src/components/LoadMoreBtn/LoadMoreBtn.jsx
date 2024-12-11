import css from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ nextPage }) => {
  return (
    <button className={css.loadMoreBtn} type="button" onClick={nextPage}>
      Load more...
    </button>
  );
};
export default LoadMoreBtn;
