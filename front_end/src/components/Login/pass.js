import React, { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Desktop3 = () => {
  return (
    <div className="desktop-3">
      <div className="desktop-3-child" />
      <b className="change-password">Change Password</b>
      <input
        className="password"
        type="password"
        placeholder="New Password"
        maxLength={10}
        minLength={8}
      />
      <input
        className="confirm"
        type="password"
        placeholder="Confirm Password"
        maxLength={10}
        minLength={8}
      />
      <button className="setpass">
        <b className="set-password">Set Password</b>
      </button>
    </div>
  );
};

export default Desktop3;
