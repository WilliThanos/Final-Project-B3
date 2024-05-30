import React, { Fragment } from "react";
import GoogleMapReact from "google-map-react";

const GoogleMaps = ({ latitude, longitude }) => {
  const renderMarkers = (map, maps) => {
    let marker = new maps.Marker({
      position: { lat: latitude, lng: longitude },
      map,
      title: "Hello World!",
    });
    return marker;
  };

  return (
    <Fragment>
      <div style={{ height: "20vh", width: "30vh" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAOCgj-boqDL7xGJCRANYAZasOa9bY96AM" }}
          defaultCenter={{ lat: -6.125556, lng: 106.65583 }}
          defaultZoom={16}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
        ></GoogleMapReact>
      </div>
    </Fragment>
  );
};

export default GoogleMaps;
