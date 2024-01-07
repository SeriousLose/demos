import React, { useContext } from 'react';
import PhotosContext from './PhotosContext';
import ThemeContext from './ThemeContext';

export default function PhotosList() {
  const { photos, fetchPhotos } = useContext(PhotosContext);
  const { theme } = useContext(ThemeContext);

  return (
    <div
      style={{
        backgroundColor: theme === 'dark' ? 'black' : 'white',
      }}
      className="photos-list-container"
    >
      <ul id="photos-list">
        {photos.map((photo, index) => (
          <li key={index}>
            <h3
              style={{
                color: theme === 'dark' ? 'white' : 'black',
              }}
            >
              {photo.title}
            </h3>
            <img src={photo.imgSrc} alt={photo.title} />
          </li>
        ))}
      </ul>
      <button id="fetchphotos" onClick={fetchPhotos}>
        Fetch More Photos       
      </button>
    </div>
  );
}
