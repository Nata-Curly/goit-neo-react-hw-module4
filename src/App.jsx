import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import SearchBar from "./components/SearchBar/SearchBar";
import searchImages from "./api/getImages";
import css from "./App.module.css";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageModal from "./components/ImageModal/ImageModal";

function App() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(null);

  const search = async (query) => {
    setQuery(query);
    setPage(1);
    setResults([]);
  };

  const getNextPage = async () => {
    setPage(page + 1);
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const res = await searchImages(query, page);
        if (page === 1) {
          setResults(res.results);
          setTotalResults(res.total);
        } else {
          setResults((prevResults) => [...prevResults, ...res.results]);
        }
        if (res.results.length === 0) {
          toast("Oops, there`s no such images", { icon: "😳" });
        }
      } catch (error) {
        toast.error(error.message);
        setError(true);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };
    if (query) fetchImages();
  }, [page, query]);

  useEffect(() => {
    if (error) {
      toast.error("Oops, something went wrong... Please reload!");
    }
  }, [error]);

  useEffect(() => {
    if (page !== 1) {
      window.scrollBy({
        top: 590,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [results, page]);

  const openModal = (result) => {
    setShowModal(result);
  };

  const closeModal = () => {
    setShowModal(null);
  };

  return (
    <div id="app" className={css.app}>
      <SearchBar search={search} />
      {results.length > 0 && (
        <ImageGallery images={results} onOpenModal={openModal} />
      )}
      {isLoading && <Loader />}
      {!isLoading && error && (
        <ErrorMessage
          message={"Oops, something went wrong... Please reload!"}
        />
      )}
      {!isLoading && results.length > 0 && results.length < totalResults && (
        <LoadMoreBtn nextPage={getNextPage} />
      )}
      <Toaster position="top-right" />
      {showModal && <ImageModal onCloseModal={closeModal} result={showModal} />}
    </div>
  );
}

export default App;
