import { Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import { FcSearch } from "react-icons/fc";
import css from "./SearchBar.module.css";

const SearchBar = ({ search }) => {
  const handleSubmit = (values, actions) => {
    if (values.query.trim() === "") {
      return toast.error("Please enter something to start your search");
    }
    search(values.query);
    actions.resetForm();
  };
  return (
    <header className={css.searchBar}>
      <Formik initialValues={{ query: "" }} onSubmit={handleSubmit}>
        <Form className={css.searchForm}>
          <button className={css.searchFormBtn} type="submit">
            <FcSearch size="20px" />
          </button>
          <label htmlFor="" className={css.searchFormBtnLabel}></label>
          <Field
            className={css.searchFormInput}
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
      </Formik>
    </header>
  );
};

export default SearchBar;
