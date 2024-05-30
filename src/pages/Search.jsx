import { useState } from "react";
import NavbarLogoBiru from "../components/Navbar2";
import CariTiketLain from "../components/CariTiketLain";
import Filter from "../components/Filter";

export default function Search() {
  return (
    <div>
      <NavbarLogoBiru />
      <div className="mt-20">
        <CariTiketLain />
      </div>
      <div className="mt-8">
        <Filter />
      </div>
    </div>
  );
}
