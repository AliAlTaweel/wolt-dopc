import React from "react";

interface ResultDisplayProps {
  cartValue: number;
  smallOrderSurcharge: number;
  deliveryFee: number;
  deliveryDistance: number;
  totalPrice: number;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({
  cartValue,
  smallOrderSurcharge,
  deliveryFee,
  deliveryDistance,
  totalPrice,
}) => {
  return (
    <div className="result-display">
          <h2>Price Breckdown</h2>
      <p>
        Cart Value:{" "}
        <span data-raw-value={cartValue}>{(cartValue / 100).toFixed(2)} EUR</span>
      </p>
      <p>
        Small Order Surcharge:{" "}
        <span data-raw-value={smallOrderSurcharge}>
          {(smallOrderSurcharge / 100).toFixed(2)} EUR
        </span>
      </p>
      <p>
        Delivery Fee:{" "}
        <span data-raw-value={deliveryFee}>{(deliveryFee / 100).toFixed(2)} EUR</span>
      </p>
      <p>
        Delivery Distance:{" "}
        <span data-raw-value={deliveryDistance}>{deliveryDistance} meters</span>
      </p>
      <p>
        Total Price:{" "}
        <span data-raw-value={totalPrice}>{(totalPrice / 100).toFixed(2)} EUR</span>
      </p>
    </div>
  );
};

export default ResultDisplay;