import { useDispatch, useSelector } from "react-redux";



const Gallery = () => {
    const photos = useSelector((state) => state.gallery.photos);
    return (      
    <div className="Gallery">
    {photos.map((photo) => (
      <img
        key={photo.id}
        alt={photo.author}
        src={photo.download_url}
        width="400px"
        height="400px"
      ></img>
    ))} 
  </div>  );
}
 
export default Gallery;