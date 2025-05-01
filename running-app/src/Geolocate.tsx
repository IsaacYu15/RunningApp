import React, { useEffect, useState } from "react";
import { LatLongCoordinates } from "./Types";
import DisplayCoordinates from "./DisplayCoordinates";

const Geolocate: React.FC = () => {
  const [path, setPath] = useState<LatLongCoordinates[] | undefined>();
  const [timerActive, setTimerActive] = useState<Boolean>(false);

  function updateGeolocation(position: GeolocationPosition) {

    setPath((prevPath) => {

      const lastEntry: LatLongCoordinates | undefined = prevPath?.[prevPath.length - 1];

      if (
        lastEntry &&
        position.coords.latitude === lastEntry.latitude &&
        position.coords.longitude === lastEntry.longitude
      ) {
        return prevPath;
      }

      return [
        ...(prevPath ?? []),
        {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
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
    const locationInterval = setInterval(() => {
      if (navigator.geolocation && timerActive) {
        navigator.geolocation.getCurrentPosition(
          updateGeolocation,
          displayError
        );
      }
    }, 2500);

    return () => clearInterval(locationInterval);
  }, [timerActive]);

  useEffect(() => {
    console.log(path);
  }, [path, timerActive]);

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
