export const product = {
  company: "Sneaker Company",
  name: "Fall Limited Edition Sneakers",
  description:
    "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they'll withstand everything the weather can offer.",
  price: 125.0,
  discountPercent: 50,
  originalPrice: 250.0,
  images: [
    {full: "/image-product-1.jpg", thumb: "/image-product-1-thumbnail.jpg"},
    {full: "/image-product-2.jpg", thumb: "/image-product-2-thumbnail.jpg"},
    {full: "/image-product-3.jpg", thumb: "/image-product-3-thumbnail.jpg"},
    {full: "/image-product-4.jpg", thumb: "/image-product-4-thumbnail.jpg"},
  ],
};

export type Product = typeof product;
