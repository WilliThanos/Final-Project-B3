import React from "react";

const PaymentMethodCard = ({ e, handleSelect, selectedMethod }) => {
  const isSelected = selectedMethod === e?.code;

  return (
    <div
      className={`border rounded-lg p-2 cursor-pointer ${
        isSelected ? "border-blue-600" : "border-gray-200"
      }`}
      onClick={() => handleSelect(e?.code)}
    >
      <div className="flex items-center justify-between">
        <div className="flex  w-full  ">
          <div className="w-1/3">
            <img
              src={e?.icon_url}
              alt={`${e?.name} icon`}
              className=" h-5 mb-2 "
            />
          </div>
          <div className="text-sm font-semibold">{e?.name}</div>
        </div>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => handleSelect(e?.code)}
          className="form-checkbox h-4 w-4 text-blue-600 rounded-full"
        />
      </div>
    </div>
  );
};

export default PaymentMethodCard;
