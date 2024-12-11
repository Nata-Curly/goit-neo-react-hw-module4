import Modal from "react-modal";
import css from "./ImageModal.module.css";
import { useEffect } from "react";

const ImageModal = ({ result: { urls, description }, onCloseModal }) => {
  useEffect(() => {
    const handleKeyDown = (evt) => {
      if (evt.code === "Escape") {
        onCloseModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onCloseModal]);

  return (
    <Modal
      className={css.modal}
      overlayClassName={css.overlay}
      isOpen={true}
      onRequestClose={onCloseModal}
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
    >
      <img className={css.modalImage} src={urls.regular} alt={description} />
    </Modal>
  );
};

export default ImageModal;
