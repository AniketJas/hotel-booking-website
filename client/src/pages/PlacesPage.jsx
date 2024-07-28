import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Perks from "../PerksLabel";

export default function PlacesPage() {
  const { action } = useParams();

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
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

  async function addPhotoByLink(e) {
    //adding photo using link
    e.preventDefault();
    const { data: filename } = await axios.post("/upload-by-link", {
      link: photoLink,
    });
    setAddedPhotos((prev) => {
      return [...prev, filename];
    });
    console.log(addedPhotos);
    setPhotoLink("");
  }

  function uploadPhoto(e) {
    //upload from local device
    const files = e.target.files;
    const data = new FormData();

    // data.set("photos", files);

    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }

    axios
      .post("/upload", data, {
        headers: { "Content-Type": "muultipart/form-data" },
      })
      .then((res) => {
        const { data: filenames } = res;
        console.log(data);

        setAddedPhotos((prev) => {
          return [...prev, ...filenames];
        });
      });
  }

  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            className="inline-flex gap-1 bg-primary text-white py-2 px-4 rounded-full"
            to="/account/places/new"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new place
          </Link>
        </div>
      )}

      {action === "new" && (
        <div>
          <form>
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
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add using link .......jpg"
                onChange={(e) => setPhotoLink(e.target.value)}
              />
              <button
                className="bg-gray-200 px-4 rounded-2xl"
                onClick={addPhotoByLink}
              >
                Add&nbsp;Photo
              </button>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-6">
              {addedPhotos.length > 0 &&
                addedPhotos.map((link) => (
                  <div className="h-32 flex">
                    <img
                      src={"http://localhost:4000/uploads/" + link}
                      className="rounded-2xl w-full object-cover"
                      alt=""
                    />
                  </div>
                ))}
              <label className="h-32 cursor-pointer flex items-center justify-center gap-1 border bg-transparent rounded-2xl p-2 text-xl text-gray-600">
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={uploadPhoto}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                  />
                </svg>
                Upload
              </label>
            </div>

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
      )}
    </div>
  );
}
