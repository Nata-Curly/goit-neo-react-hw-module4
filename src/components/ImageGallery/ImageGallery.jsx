import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

const ImageGallery = ({ images, onOpenModal }) => {
  return (
    <ul className={css.galleryList}>
      {images.map((image) => (
        <li key={image.id} onClick={() => onOpenModal(image)}>
          <ImageCard image={image} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
