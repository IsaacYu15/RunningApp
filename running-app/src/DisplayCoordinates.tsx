import React, { useEffect } from "react";
import { LatLongCoordinates } from "./Types";

interface DisplayCoordinatesProps {
  coordinates: LatLongCoordinates[] | undefined;
}

const DisplayCoordinates: React.FC<DisplayCoordinatesProps> = ({
  coordinates,
}) => {
  const scale = 100;

  const maxLat = Math.max(...(coordinates?.map((coord) => coord.latitude) ?? []));
  const minLat = Math.min(...(coordinates?.map((coord) => coord.latitude) ?? []));
  const maxLong = Math.max(...(coordinates?.map((coord) => coord.longitude) ?? []));
  const minLong = Math.min(...(coordinates?.map((coord) => coord.longitude) ?? []));
  const latDiff = maxLat - minLat;
  const longDiff = maxLong - minLong;
  const maxDiff = Math.max(latDiff, longDiff);

  function normalizeCoordinate(
    coordinate: LatLongCoordinates
  ): LatLongCoordinates {
    return {
        latitude: Math.abs((coordinate.latitude - minLat) / maxDiff) * scale,
        longitude: Math.abs((coordinate.longitude - minLong) / maxDiff) * scale,
      };
  }

  function drawLine(point1: LatLongCoordinates, point2: LatLongCoordinates) {
    point1 = normalizeCoordinate(point1);
    point2 = normalizeCoordinate(point2);
    
    const x1 = point1.latitude;
    const x2 = point2.latitude;
    const y1 = point1.longitude;
    const y2 = point2.longitude;

    const line = document.createElement("div") as HTMLDivElement;

    const length = Math.hypot(x2 - x1, y2 - y1);
    const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

    line.style.width = `${length}px`;
    line.style.left = `${x1}px`;
    line.style.top = `${y1}px`;
    line.style.transform = `rotate(${angle}deg)`;

    line.style.position = `absolute`;
    line.style.height = `2px`;
    line.style.backgroundColor = `black`;
    line.style.transformOrigin = `0 0`;

    const parent = document.getElementById("lineContainer") as HTMLDivElement;
    parent.appendChild(line);
  }

  useEffect(() => {
    if (coordinates) {
      for (let i = 0; i < coordinates.length - 1; i++) {
        drawLine(coordinates[i], coordinates[i + 1]);
      }
    }
  }, [coordinates]);

  return <div id="lineContainer"></div>;
};

export default DisplayCoordinates;
