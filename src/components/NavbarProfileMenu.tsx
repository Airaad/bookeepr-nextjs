import Image from "next/image";
import React from "react";

function NavbarProfileMenu({
  profileImageUrl,
  shift,
}: {
  profileImageUrl?: string | null;
  shift: "down" | "up";
}) {
  const translate = {
    down: "-translate-y-2",
    up: "translate-y-1",
  };
  return (
    <div>
      <img
        src={profileImageUrl || "/images/user_icon.png"}
        alt="User profile"
        className={`w-10 h-10 ${translate[shift]} rounded-full object-cover border-2 border-gray-300 hover:border-gray-400 transition-all`}
      />
    </div>
  );
}

export default NavbarProfileMenu;
