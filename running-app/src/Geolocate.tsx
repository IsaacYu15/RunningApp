import React, { useEffect, useState } from "react";
import { LatLongCoordinates } from "./Types";
import DisplayCoordinates from "./DisplayCoordinates";
//import SampleData from "./SampleData";

const Geolocate: React.FC = () => {
  const [path, setPath] = useState<LatLongCoordinates[]>();
  const [timerActive, setTimerActive] = useState<Boolean>(false);

  function updateGeolocation(position: GeolocationPosition) {
    setPath((prevPath) => {
      const newLat = position.coords.latitude;
      const newLong = position.coords.longitude;

      if (prevPath && prevPath[prevPath.length - 1].latitude == newLat && prevPath[prevPath.length - 1].longitude == newLong)
        return prevPath;

      return [
        ...(prevPath ?? []),
        {
          latitude: newLat,
          longitude: newLong,
        },
      ];
    });
  }

  function displayError(error: GeolocationPositionError) {
    alert(error.message);
  }

  function flipTimerState() {
    setTimerActive((prevTimeState) => !prevTimeState);
  }

  useEffect(() => {
    let watchId : number;

    if (navigator.geolocation && timerActive) {
      watchId = navigator.geolocation.watchPosition(
        updateGeolocation,
        displayError,
        {
          enableHighAccuracy: true,
          maximumAge: 1000,
          timeout: 5000
        }
      )
    }

    return () => {
      if (watchId)
        navigator.geolocation.clearWatch(watchId);
    }
  }, [timerActive]);

  return (
    <div>
      <button onClick={flipTimerState}>
        {!timerActive ? "Start" : "Stop"}
      </button>

      {!timerActive && <DisplayCoordinates coordinates={path} />}

      <div>
        {path?.map((coordinate) => (
          <div>
            <h3>
              {coordinate.latitude} {coordinate.longitude}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Geolocate;
