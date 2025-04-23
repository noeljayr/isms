import React from "react";
import Image from "next/image";
import User from "./svg/User";
function UserProfile() {
  const profilePic = null;
  return (
    <div className="user-profile flex items-center gap-2">
      <div className="avatar flex items-center justify-center">
        {profilePic ? <></> : <User />}
      </div>
      <div className="flex flex-col">
        <span className="name opacity-75 font-medium">Blessings Mhone</span>
        <span className="role opacity-50">Admin</span>
      </div>
    </div>
  );
}

export default UserProfile;
