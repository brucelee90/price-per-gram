"use client";

import React, { useState } from "react";

interface Props {
  data: GoldApiData;
}

function SelectField(props: Props) {
  const {
    open_price,
    price_gram_24k,
    price_gram_22k,
    price_gram_18k,
    price_gram_14k,
    price_gram_10k,
    currency,
  } = props.data;

  const goldPurities = {
    "24k": price_gram_24k,
    "22k": price_gram_22k,
    "18k": price_gram_18k,
    "14k": price_gram_14k,
    "10k": price_gram_10k,
  };
  type GoldPurityKeys = keyof typeof goldPurities;

  const [selectedPurity, setPurity] = useState("24k");
  const [weight, setWeight] = useState(0);
  const [retailPrice, setRetailPrice] = useState(0);

  const handleSelect = (value: string) => {
    setPurity(value);
  };

  const handleWeightInput = (value: string) => {
    setWeight(parseInt(value));
  };

  const handleRetailPriceInput = (value: string) => {
    setRetailPrice(parseInt(value));
  };

  const getPurityPrice = (key: string): number | undefined => {
    if (key in goldPurities) {
      return goldPurities[key as GoldPurityKeys];
    }
    return undefined;
  };

  const getGoldValue = () => {
    let purityPrice = getPurityPrice(selectedPurity);
    if (purityPrice != undefined) {
      let goldValue = purityPrice * weight;
      return parseFloat(goldValue.toFixed(2));
    }
    return null;
  };

  const getPremium = () => {
    let goldValue = getGoldValue();
    if (goldValue != undefined) {
      let premium = retailPrice - goldValue;
      return parseFloat(premium.toFixed(2));
    }
    return null;
  };

  const getPremiumPercentage = () => {
    let goldValue = getGoldValue();
    let premium = getPremium();

    if (goldValue != null && premium !== null) {
      if (goldValue == 0) {
        return parseFloat("0") + " %";
      }
      let premiumPercentage = (premium / goldValue) * 100;
      return parseFloat(premiumPercentage.toFixed(2)).toString() + " %";
    }
    return parseFloat("0") + " %";
  };

  const getStateOfServernessClass = (premiumPercentage: any) => {
    if (premiumPercentage !== null) {
      premiumPercentage = parseFloat(premiumPercentage);
    }

    if (premiumPercentage > 100) {
      return "text-red-500";
    } else if (premiumPercentage < 100 && premiumPercentage > 50) {
      return "text-orange-500";
    } else {
      return "text-green-500";
    }
  };

  let premiumPercentage = getPremiumPercentage();

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow  bg-gray-800 border-gray-700 ">
        <div>
          <div className="block mb-2 text-sm font-medium text-gray-900 text-white text-lg mb-5">
            The current gold price is at:
            <div className="break-normal">
              {" "}
              🌟 {open_price} {currency} 🌟
            </div>
          </div>

          <hr />

          <div className="my-5">
            <label
              htmlFor="gold_weight"
              className="block mb-2 text-sm font-medium text-gray-900 text-white"
            >
              enter your golds weight in gram:
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              type="number"
              name="gold_weight"
              onInput={(e) =>
                handleWeightInput((e.target as HTMLInputElement).value)
              }
              placeholder="enter the jewelery weight"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="purity"
              className="block mb-2 text-sm font-medium text-gray-900 text-white"
            >
              select your jewelerry's purity:
            </label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              id="purity"
              name="purity"
              onChange={(e) =>
                handleSelect((e.target as HTMLSelectElement).value)
              }
            >
              <option value="24k">24k</option>
              <option value="22k">22k</option>
              <option value="18k">18k</option>
              <option value="14k">14k</option>
              <option value="10k">10k</option>
            </select>
          </div>

          <div className="mb-5">
            <div className="text-gray-400">
              The current price for {selectedPurity}:{" "}
              {getPurityPrice(selectedPurity)}
            </div>

            <div className="text-gray-400">
              Your gold is worth {getGoldValue()} {currency}
            </div>
          </div>

          <hr />

          <div className="my-5">
            <label
              htmlFor="gold_retail_price"
              className="block mb-2 text-sm font-medium text-gray-900 text-white"
            >
              Enter the gold's retail Price:
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              type="number"
              name="gold_retail_price"
              placeholder="Enter the gold's retail Price"
              onInput={(e) =>
                handleRetailPriceInput((e.target as HTMLInputElement).value)
              }
            />
          </div>
          <div className={getStateOfServernessClass(premiumPercentage)}>
            You are paying a premium of {getPremium()} {currency} (
            {getPremiumPercentage()})
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectField;
