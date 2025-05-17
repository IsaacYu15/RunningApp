import React, { useEffect } from "react";
import { LatLongCoordinates } from "./Types";

interface DisplayCoordinatesProps {
  coordinates: LatLongCoordinates[] | undefined;
}

const DisplayCoordinates: React.FC<DisplayCoordinatesProps> = ({
  coordinates,
}) => {
  const scale = 500;

  const maxLat = Math.max(
    ...(coordinates?.map((coord) => coord.latitude) ?? [])
  );
  const minLat = Math.min(
    ...(coordinates?.map((coord) => coord.latitude) ?? [])
  );
  const maxLong = Math.max(
    ...(coordinates?.map((coord) => coord.longitude) ?? [])
  );
  const minLong = Math.min(
    ...(coordinates?.map((coord) => coord.longitude) ?? [])
  );
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

  function connectPoints(
    ctx: CanvasRenderingContext2D,
    points: LatLongCoordinates[]
  ) {
    const normalizeStart = normalizeCoordinate(points[0]);

    ctx.beginPath();
    ctx.moveTo(normalizeStart.latitude, normalizeStart.longitude);

    for (let i = 1; i < points.length; i++) {
      const normalizeCurr = normalizeCoordinate(points[i]);
      ctx.lineTo(normalizeCurr.latitude, normalizeCurr.longitude);
    }

    ctx.stroke();
  }

  useEffect(() => {
    const canvas = document.getElementById("pointCanvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    if (!(coordinates && ctx)) return;

    //prepare canvas dimensions
    var dpr = window.devicePixelRatio || 1;
    var rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //gen path
    connectPoints(ctx, coordinates);

    //fill
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    ctx.stroke();

    ctx.closePath();
    ctx.fillStyle = "rgb(90, 90, 90)";
    ctx.fill();
    
  }, [coordinates]);

  return (
    <canvas
      id="pointCanvas"
      style={{
        width: `${scale}px`,
        height: `${scale}px`,
        border: "1px solid black",
      }}
    />
  );
};

export default DisplayCoordinates;
