import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between bg-slate-800 text-white py-2">
      <div className="font-bold text-xl mx-7">Todo</div>
      <div>
        <ul className="flex gap-6 mx-7">
          <li className="curser-pointer">Home</li>
          <li>Your tasks</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
