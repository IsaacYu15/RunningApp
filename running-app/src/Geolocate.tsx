import React, { useEffect, useState } from "react";
import { LatLongCoordinates } from "./Types";
import DisplayCoordinates from "./DisplayCoordinates";
//import SampleData from "./SampleData";

const Geolocate: React.FC = () => {
  const [coordinates, setCoordinates] = useState<LatLongCoordinates[]>();
  const [timerActive, setTimerActive] = useState<Boolean>(false);

  function updateGeolocation(position: GeolocationPosition) {
    setCoordinates((prevCoordinates) => {
      const newLat = position.coords.latitude;
      const newLong = position.coords.longitude;

      if (
        prevCoordinates &&
        prevCoordinates[prevCoordinates.length - 1].latitude == newLat &&
        prevCoordinates[prevCoordinates.length - 1].longitude == newLong
      )
        return prevCoordinates;

      return [
        ...(prevCoordinates ?? []),
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
    setTimerActive((prevTimeState) => {
      const updatedState = !prevTimeState;

      if (!updatedState && coordinates) saveCoordinates();

      return updatedState;
    });
  }

  async function saveCoordinates() {
    try {
      const response = await fetch("http://127.0.0.1:5000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ coordinates }),
      });
    } catch (error) {
      console.log("error with saving coordinates!");
    }
  }

  useEffect(() => {
    let watchId: number;

    if (navigator.geolocation && timerActive) {
      watchId = navigator.geolocation.watchPosition(
        updateGeolocation,
        displayError,
        {
          enableHighAccuracy: true,
          maximumAge: 1000,
          timeout: 5000,
        }
      );
    }

    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, [timerActive]);

  return (
    <div>
      <button onClick={flipTimerState}>
        {!timerActive ? "Start" : "Stop"}
      </button>

      {!timerActive && <DisplayCoordinates coordinates={coordinates} />}

      <div>
        {coordinates?.map((coordinate) => (
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
