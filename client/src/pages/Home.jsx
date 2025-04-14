import { useSelector } from "react-redux";
import { ProductCard } from "../components/ProductCard/ProductCard";

export const Home = () => {
  const { products } = useSelector((state) => state.products);

  return (
   
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            id={product._id}
            image={product.image}
            title={product.title}
            description={product.description}
            price={product.price}
          />
        ))}
      </div>
   
  );
};
