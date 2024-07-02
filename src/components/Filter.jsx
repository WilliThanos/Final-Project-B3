import { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { GiAirplaneDeparture, GiAirplaneArrival } from "react-icons/gi";
import { SlCalender } from "react-icons/sl";
import { setFilterClass, setSortHarga } from "../redux/reducers/filterReducer";
import { useDispatch, useSelector } from "react-redux";

export default function Filter() {
  const dispatch = useDispatch();

  const filterClass = useSelector((state) => state?.filter?.filterClass);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMaxMd, setIsMaxMd] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMaxMd(window.innerWidth <= 768);
    };

    // Initial check
    checkScreenSize();

    // Add event listener
    window.addEventListener("resize", checkScreenSize);

    // Cleanup event listener
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const handleDropdownToggle = () => {
    if (isMaxMd) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;

    if (id === "") {
      // Jika checkbox "Semua" dipilih, atur filterClass menjadi kosong ("")
      dispatch(setFilterClass(checked ? "" : ""));
    } else {
      // Jika checkbox kelas lain dipilih, atur filterClass sesuai dengan id checkbox
      dispatch(setFilterClass(checked ? id : ""));
    }
  };

  return (
    <div className="w-64 h-auto mx-auto bg-white rounded-xl shadow-sm p-4 max-md:border max-md:text-sm max-md:border-gray-300 max-md:p-2 max-md:w-44 max-md:mx-0 max-h-52 overflow-y-auto">
      <div className="space-y-2 ">
        <div
          onClick={handleDropdownToggle}
          className="font-bold text-lg max-md:text-base max-md:text-center"
        >
          Filter
        </div>
        {isDropdownOpen || !isMaxMd ? (
          <div className="">
            <details className="rounded border-b border-gray-300 ">
              <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white py-4 text-gray-900 transition">
                <span className="max-md:text-sm "> Kelas </span>

                <span className="transition group-open:rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </span>
              </summary>

              <div className="border-t border-gray-300 bg-white">
                <ul className="flex flex-col space-y-1 border-t border-gray-300 p-6">
                  <li>
                    <label
                      htmlFor=""
                      className="inline-flex items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        id=""
                        className="size-4 rounded border-gray-300"
                        onChange={handleCheckboxChange}
                        checked={filterClass === ""}
                      />
                      <span className="text-sm text-gray-700 max-md:text-xs">
                        {" "}
                        Semua{" "}
                      </span>
                    </label>
                  </li>

                  <li>
                    <label
                      htmlFor="EKONOMI"
                      className="inline-flex items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        id="EKONOMI"
                        className="size-4 rounded border-gray-300"
                        onChange={handleCheckboxChange}
                        checked={filterClass === "EKONOMI"}
                      />
                      <span className="text-sm text-gray-700 max-md:text-xs">
                        {" "}
                        Ekonomi{" "}
                      </span>
                    </label>
                  </li>
                  <li>
                    <label
                      htmlFor="BISNIS"
                      className="inline-flex items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        id="BISNIS"
                        className="size-4 rounded-xl border-gray-300"
                        onChange={handleCheckboxChange}
                        checked={filterClass === "BISNIS"}
                      />
                      <span className="text-sm text-gray-700 max-md:text-xs">
                        {" "}
                        Bisnis{" "}
                      </span>
                    </label>
                  </li>
                  <li>
                    <label
                      htmlFor="EKSEKUTIF"
                      className="inline-flex items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        id="EKSEKUTIF"
                        className="size-4 rounded-xl border-gray-300"
                        onChange={handleCheckboxChange}
                        checked={filterClass === "EKSEKUTIF"}
                      />
                      <span className="text-sm text-gray-700 max-md:text-xs">
                        {" "}
                        Eksekutif{" "}
                      </span>
                    </label>
                  </li>
                </ul>
              </div>
            </details>

            <details className="group overflow-hidden rounded border-b border-gray-300 ">
              <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white py-4 text-gray-900 transition">
                <span className="max-md:text-sm "> Harga </span>

                <span className="transition group-open:rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </span>
              </summary>

              <div className="border-t border-gray-300 bg-white">
                <div className="border-t border-gray-300 p-4">
                  <div className="flex flex-col justify-between gap-4">
                    <button
                      onClick={() => dispatch(setSortHarga("asc"))}
                      className="rounded-xl bg-white border border-gray-500 px-4 py-1 text-gray-700 text-sm hover:bg-gray-200 focus:bg-gray-300 max-md:text-xs "
                    >
                      Urutkan Dari Harga Termurah{" "}
                    </button>
                    <button
                      onClick={() => dispatch(setSortHarga("desc"))}
                      className="rounded-xl bg-white border border-gray-500 px-4 py-1 text-gray-700 text-sm hover:bg-gray-200 focus:bg-gray-300 max-md:text-xs"
                    >
                      Urutkan Dari Harga Termahal{" "}
                    </button>
                  </div>
                </div>
              </div>
            </details>
          </div>
        ) : null}
      </div>
    </div>
  );
}
