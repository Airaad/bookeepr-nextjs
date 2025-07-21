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
      <Image
        src={profileImageUrl || "/images/user_icon.png"}
        alt="User profile"
        className={`${translate[shift]} rounded-full object-cover border-2 border-gray-300 hover:border-gray-400 transition-all`}
        width={40}
        height={40}
      />
    </div>
  );
}

export default NavbarProfileMenu;
