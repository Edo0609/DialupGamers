import React, { useState, useEffect } from "react";
import { currencyRates } from "../data/currencyRates";

export default function Price({ price }) {
  const [currency, setCurrency] = useState("USD");

  useEffect(() => {
    const savedCurrency = localStorage.getItem("currency") || "USD";
    setCurrency(savedCurrency);

    const handleCurrencyChanged = () => {
      const newCurrency = localStorage.getItem("currency") || "USD";
      setCurrency(newCurrency);
    };

    window.addEventListener("currencyChanged", handleCurrencyChanged);
    return () => {
      window.removeEventListener("currencyChanged", handleCurrencyChanged);
    };
  }, []);

  const convertPrice = (price) => {
    const rate = currencyRates[currency] || 1;
    return (price * rate).toFixed(2);
  };

  return (
    <span>
      {currency} {convertPrice(price)}
    </span>
  );
}
