import React, { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContext";

export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [noOfGuests, setNoOfGuests] = useState(1);

  const [name, setName] = useState("");
  //   const [email, setEmail] = useState("");
  const [phno, setPhno] = useState("");
  const [redirect, setRedirect] = useState(false);

  const [bookingId, setBookingId] = useState("");

  const { user } = useContext(UserContext);

  let noOfNights = 0;

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  if (checkIn && checkOut) {
    noOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  async function bookThisPlace() {
    const totalPrice = noOfNights * place.price;
    const bookindData = {
      place: place._id,
      checkIn,
      checkOut,
      noOfGuests,
      name,
      phno,
      price: totalPrice,
    };
    const res = await axios.post("/bookings", bookindData);
    // console.log(res);
    setBookingId(res.data._id);
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to={"/account/booking/" + bookingId} />;
  }

  return (
    <div className="bg-gray-100 shadow p-4 rounded-2xl ">
      <div className="text-2xl text-center mb-4">
        Price: ₹{place.price}/per night
      </div>

      <div className="border border-gray-300 rounded-2xl">
        <div className="flex">
          <div className="p-3 w-1/2">
            <label>Check In: </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className=" p-3 border-l ">
            <label>Check Out: </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </div>

        <div className=" p-3 border-t">
          <label>No of guests: </label>
          <input
            type="number"
            value={noOfGuests}
            onChange={(e) => setNoOfGuests(e.target.value)}
          />
        </div>
        {noOfNights > 0 && (
          <div className=" p-3 border-t">
            <label>Your full name: </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Your phone number: </label>
            <input
              type="tel"
              value={phno}
              onChange={(e) => setPhno(e.target.value)}
            />
          </div>
        )}
      </div>

      <button className="primary mt-4" onClick={bookThisPlace}>
        Book this place
        {noOfNights > 0 && <span> ₹{noOfNights * place.price}</span>}
      </button>
    </div>
  );
}
