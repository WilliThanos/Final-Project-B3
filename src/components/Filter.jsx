import { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { GiAirplaneDeparture, GiAirplaneArrival } from "react-icons/gi";
import { SlCalender } from "react-icons/sl";

export default function Filter() {
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

  return (
    <div className="w-64 h-52 mx-auto bg-white rounded-xl shadow-sm p-4 max-md:h-auto max-md:text-center max-md:border max-md:text-sm max-md:border-gray-300 max-md:p-2 max-md:w-44 max-md:mx-0">
      <div className="space-y-2 ">
        <div onClick={handleDropdownToggle} className="font-medium">
          Filter
        </div>
        {isDropdownOpen || !isMaxMd ? (
          <>
            <details className="group overflow-hidden rounded border-b border-gray-300 ">
              <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white py-4 text-gray-900 transition">
                <span className=" text-sm"> Kelas </span>

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
                <ul className="space-y-1 border-t border-gray-300 p-4">
                  <li>
                    <label
                      htmlFor="FilterEconomy"
                      className="inline-flex items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        id="FilterEconomy"
                        className="size-4 rounded-xl border-gray-300"
                      />

                      <span className="text-sm text-gray-700"> Economy </span>
                    </label>
                  </li>

                  <li>
                    <label
                      htmlFor="FilterBussiness"
                      className="inline-flex items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        id="FilterBussiness"
                        className="size-4 rounded-xl border-gray-300"
                      />

                      <span className="text-sm  text-gray-700">
                        {" "}
                        Bussiness{" "}
                      </span>
                    </label>
                  </li>

                  <li>
                    <label
                      htmlFor="FilterFirstClass"
                      className="inline-flex items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        id="FilterFirstClass"
                        className="size-4 rounded-xl border-gray-300"
                      />

                      <span className="text-sm  text-gray-700">
                        {" "}
                        First Class{" "}
                      </span>
                    </label>
                  </li>
                </ul>
              </div>
            </details>

            <details className="group overflow-hidden rounded border-b border-gray-300 ">
              <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white py-4 text-gray-900 transition">
                <span className="text-sm "> Harga </span>

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
                  <div className="flex justify-between gap-4">
                    <label
                      htmlFor="FilterPriceFrom"
                      className="flex items-center gap-2"
                    >
                      <span className="text-sm text-gray-600">Rp</span>

                      <input
                        type="number"
                        id="FilterPriceFrom"
                        placeholder="Dari"
                        className="w-full rounded-md py-1  border-gray-200 shadow-sm sm:text-sm"
                      />
                    </label>

                    <label
                      htmlFor="FilterPriceTo"
                      className="flex items-center gap-2"
                    >
                      <span className="text-sm text-gray-600">Rp</span>

                      <input
                        type="number"
                        id="FilterPriceTo"
                        placeholder="Sampai"
                        className="w-full rounded-md py-1  border-gray-200 shadow-sm sm:text-sm"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </details>
          </>
        ) : null}
      </div>
    </div>
  );
}
