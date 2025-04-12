import { Cart } from "../models/cartModel.js";

// Add product to cart.
export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, product } = req.body;

    if (!productId || !product)
      return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ userId });

    if (!cart) cart = new Cart({ userId, products: [] });

    const existingProduct = cart.products.find(
      (item) => item.productId === productId
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.products.push({ productId, price: product.price, quantity: 1 });
    }

    cart.calculateTotalPrice();

    await cart.save();

    res.status(200).json({ message: "Product added to cart", data: cart });
  } catch (error) {
    res.status(500).json({ message: res.error || "Something went wrong!" });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const { productId } = req.body;

    // Find the user's cart
    let cart = await Cart.findOne({ userId });

    // Handle cart not found
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Remove product
    cart.products = cart.products
      .map((product) => {
        if (product.productId.equals(productId)) {
          if (product.quantity > 1) {
            return { ...product, quantity: product.quantity - 1 };
          }
          return null;
        }
        return product;
      })
      .filter(Boolean);

    cart.calculateTotalPrice();

    await cart.save();

    res.status(200).json({ message: "Product removed", data: cart, new: true });
  } catch (error) {
    catchErrorHandler(res, error);
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId }).populate("products.productId");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ message: "Cart fetched successfully", data: cart });
  } catch (error) {
    res.status(500).json({ message: res.error || "Something went wrong!" });
  }
};
