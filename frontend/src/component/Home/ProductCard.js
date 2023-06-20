import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  const navigate = useNavigate();
  return (
    <div
      className="productCard"
      onClick={() => {
        navigate(`/product/${product._id}`);
      }}
    >
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <Rating {...options} />{" "}
        <span className="productCardSpan">
          {" "}
          ({product.numOfReviews} Reviews)
        </span>
      </div>
      <span>{`₹${product.price}`}</span>
    </div>
  );
};

export default ProductCard;
