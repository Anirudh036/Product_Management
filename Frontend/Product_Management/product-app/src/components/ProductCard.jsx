const ProductCard = ({ product }) => {
  return (
    <div className="card">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <strong>₹ {product.price}</strong>
    </div>
  );
};

export default ProductCard;

