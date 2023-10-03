import "./App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPhotos } from "./features/gallerySlice";

function App() {
  const dispatch = useDispatch();
  const photos = useSelector((state) => state.gallery.photos);

  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);
  //console.log(photos);
  return (
    <div className="App">
      <h1>PHOTO GALLERY</h1>
      <p>Photo gallery-redux toolkit and thunk</p>
      <hr></hr>
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
      </div>
    </div>
  );
}

export default App;
