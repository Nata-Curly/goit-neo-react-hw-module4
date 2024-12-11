import css from "./ImageCard.module.css";

const ImageCard = ({ image: { urls, description } }) => {
  return (
    <div className={css.galleryItem}>
      <img className={css.galleryImage} src={urls.small} alt={description} />
    </div>
  );
};

export default ImageCard;
