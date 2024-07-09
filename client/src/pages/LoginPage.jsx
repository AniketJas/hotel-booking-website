import React from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="-mt-32">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto">
          <input type="email" name="" id="" placeholder="Enter email" />
          <input type="password" name="" id="" placeholder="Enter password" />
          <button className="primary">Login</button>
          <div className="text-center py-2">
            Don't have an account yet?{" "}
            <Link to={"/register"} className="underline text-black">
              Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
