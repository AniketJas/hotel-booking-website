import React, { useState } from "react";
import { differenceInCalendarDays } from "date-fns";

export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [noOfGuests, setNoOfGuests] = useState(1);

  const [name, setName] = useState("");
  //   const [email, setEmail] = useState("");
  const [phno, setPhno] = useState("");

  let noOfNights = 0;

  if (checkIn && checkOut) {
    noOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
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

      <button className="primary mt-4">
        Book this place
        {noOfNights > 0 && <span> ₹{noOfNights * place.price}</span>}
      </button>
    </div>
  );
}
