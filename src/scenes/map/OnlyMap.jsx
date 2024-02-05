import React, { useEffect } from 'react';

const OnlyMap = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDTXOpeOH9dbBgSCWwyB5YTK2d8lRwTR_8&callback=initMap';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      initMap();
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const initMap = () => {
    new window.google.maps.Map(document.getElementById('mapContainer'), {
      center: { lat: 0, lng: 0 }, // You can set your desired default center
      zoom: 2, // You can set your desired default zoom level
    });
  };

  return (
    <div className="container">
      {/* <h1>Location Finder</h1> */}

      {/* Google Maps drop location */}
      <div id="mapContainer" style={{ height: '250px', width: '100%' }}></div>
    </div>
  );
};

export default OnlyMap;
