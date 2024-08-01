import React from "react";

export default function PlaceImg({ place, index = 0, className = null }) {
  if (!place.photos?.length) {
    return "";
  }

  if (!className) {
    className = "object-cover";
  }

  return (
    <img
      src={"http://localhost:4000/uploads/" + place.photos[index]}
      alt={place.photos[0]}
      className={className}
    />
  );
}
