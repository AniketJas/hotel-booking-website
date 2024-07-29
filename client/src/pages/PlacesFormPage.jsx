import React, { useState } from "react";
import axios from "axios";
import Perks from "../PerksLabel";
import PhotosUploader from "../PhotosUploader";
import AccountNav from "../AccountNav";

export default function PlacesFormPage() {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState("");

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  function inputDesc(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, desc) {
    return (
      <>
        {inputHeader(header)}
        {inputDesc(desc)}
      </>
    );
  }

  async function addNewPlace(e) {
    e.preventDefault();

    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    };

    await axios.post("/places", placeData);
    // setRedirectToPlacesList("/account/places");
    // setRedirectToPlacesList(true);
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={addNewPlace}>
        {preInput(
          "Title",
          "title for your place. should be short and catchy as in advertisement."
        )}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="title, for example: My lovely apt"
        />

        {preInput("Address", "Address to this place.")}
        <input
          type="text"
          placeholder="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        {preInput("Photos", "more = better")}
        <PhotosUploader
          addedPhotos={addedPhotos}
          onChange={(ev) => setAddedPhotos(ev)}
        />

        {preInput("Description", "description of the place")}
        <textarea
          className=""
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {preInput("Perks", "select all the perks of your place")}
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks selected={perks} onChange={setPerks} />
        </div>

        {preInput("Extra Info", "house rules, etc..")}
        <textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />

        {preInput(
          "Check In & Out times",
          "add check in and out times, remember to have some window for cleaning the room between guests"
        )}
        <div className="grid gap-2 sm:grid-cols-3">
          <div>
            <h3 className="mt-2 -mb-1">Check in time</h3>
            <input
              type="text"
              placeholder="14:00"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check out time</h3>
            <input
              type="text"
              placeholder="11:00"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max number of guests</h3>
            <input
              type="number"
              placeholder="1"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
            />
          </div>
        </div>
        <button className="primary my-4">Save</button>
      </form>
    </div>
  );
}
