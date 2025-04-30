import React, { useEffect, useState } from "react";
import { LatLongCoordinates } from "./Types";

const Geolocate: React.FC = () => {
  const [path, setPath] = useState<LatLongCoordinates[]>();

  function updateGeolocation(position: GeolocationPosition) {
    setPath((prevPath) => [
      ...(prevPath ?? []),
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
    ]);
  }

  function displayError(error: GeolocationPositionError) {
    alert("Position is not available!" + {error});
  }

  useEffect(() => {
    const locationInterval = setInterval(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          updateGeolocation,
          displayError
        );
      }
    }, 2500);

    return () => clearInterval(locationInterval);
  }, []);

  useEffect(() => {
    console.log(path);
  }, [path]);

  return (
    <div>
      {path?.map((coordinate) => (
        <div>
          <h3>{coordinate.latitude} {coordinate.longitude}</h3>
        </div>
      ))}
    </div>
  );
};

export default Geolocate;
