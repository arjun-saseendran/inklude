import { client, twilioPhone } from "../config/twilio.js";
import { Cart } from "../models/cartModel.js";
import { User } from "../models/userModel.js";

// Add product to cart
export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { product } = req.body;

    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ userId });
    if (!cart) cart = new Cart({ userId, products: [] });

    const existingProduct = cart.products.find(
      (item) => item.productId === product.id,
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.products.push({
        productId: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
    }

    cart.calculateTotalPrice();
    await cart.save();

    res.status(200).json({ message: "Product added to cart", data: cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};
export const increaseProductQuantity = async (req, res) => {
  try {
    const userId = req.user.id;

    const { productId } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found!" });
    }

    const productExists = cart.products.find(
      (product) => product.productId.toString() === productId,
    );

    if (productExists) {
      productExists.quantity += 1;

      cart.calculateTotalPrice();
    }

    cart.calculateTotalPrice();

    await cart.save();

    res.status(200).json({ message: "Product quantity updated", data: cart });
  } catch (error) {
    res.status(500).json({ message: error.message || "Something went wrong!" });
  }
};

export const decreaseProductQuantity = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.products = cart.products
      .map((product) => {
        if (product.productId.toString() === productId) {
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

    res.status(200).json({ message: "Product quantity updated!", data: cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// Get user's cart
export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId }).populate("products.productId");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ message: "Cart fetched successfully", data: cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const scheduleWhatsApp = async (req, res) => {
  const { phone, cart } = req.body;
  const user = await User.findOne({ mobile: phone });
  console.log("📩 scheduleWhatsApp triggered");
  console.log("👉 Received body:", req.body);

  if (!phone || !cart?.products?.length) {
    return res.status(400).json({ message: "Phone or cart missing" });
  }
  const formattedPrice = cart.totalPrice.toLocaleString("en-IN");
  const cartDetails = cart?.products
    ?.map(
      (item, index) => `${index + 1}. ${item.title} (Qty: ${item.quantity})`,
    )
    .join("\n");

  const message = `Hello ${user.name} 👋 You left some items in your cart:\n\n${cartDetails}\n\n
    💰 Total Price: ₹${formattedPrice}\n\n
    🛒 Don't forget to complete your purchase!`;

  console.log("⏱️ Scheduling WhatsApp to:", phone);

  // You can't `await` setTimeout directly, so we create a small helper
  setTimeout(
    async () => {
      try {
        const msg = await client.messages.create({
          from: twilioPhone,
          to: `whatsapp:${phone}`,
          body: message,
        });

        console.log("WhatsApp sent:", msg.sid);
      } catch (err) {
        console.error(" WhatsApp error:", err);
      }
    },
    1 * 60 * 1000,
  );

  res.json({ success: true });
};
