import React from "react";

interface CartOverlayProps {}

const cartItems = [
  {
    name: "T-Shirt",
    price: 12,
    image:
      "https://media.istockphoto.com/id/1311574382/photo/blue-t-shirt-isolated-on-white-background.jpg?b=1&s=170667a&w=0&k=20&c=3aHoYgSUnlX8MaEtQ__mO7mInI_kCst10kfBYmpJf48=",
    quantity: 1,
  },
  {
    name: "T-Shirt",
    price: 12,
    image:
      "https://media.istockphoto.com/id/1311574382/photo/blue-t-shirt-isolated-on-white-background.jpg?b=1&s=170667a&w=0&k=20&c=3aHoYgSUnlX8MaEtQ__mO7mInI_kCst10kfBYmpJf48=",
    quantity: 1,
  },
  {
    name: "T-Shirt",
    price: 12,
    image:
      "https://media.istockphoto.com/id/1311574382/photo/blue-t-shirt-isolated-on-white-background.jpg?b=1&s=170667a&w=0&k=20&c=3aHoYgSUnlX8MaEtQ__mO7mInI_kCst10kfBYmpJf48=",
    quantity: 1,
  },
  {
    name: "T-Shirt",
    price: 12,
    image:
      "https://media.istockphoto.com/id/1311574382/photo/blue-t-shirt-isolated-on-white-background.jpg?b=1&s=170667a&w=0&k=20&c=3aHoYgSUnlX8MaEtQ__mO7mInI_kCst10kfBYmpJf48=",
    quantity: 1,
  },
  {
    name: "T-Shirt",
    price: 12,
    image:
      "https://media.istockphoto.com/id/1311574382/photo/blue-t-shirt-isolated-on-white-background.jpg?b=1&s=170667a&w=0&k=20&c=3aHoYgSUnlX8MaEtQ__mO7mInI_kCst10kfBYmpJf48=",
    quantity: 1,
  },
  {
    name: "T-Shirt",
    price: 12,
    image:
      "https://media.istockphoto.com/id/1311574382/photo/blue-t-shirt-isolated-on-white-background.jpg?b=1&s=170667a&w=0&k=20&c=3aHoYgSUnlX8MaEtQ__mO7mInI_kCst10kfBYmpJf48=",
    quantity: 1,
  },
  {
    name: "T-Shirt",
    price: 12,
    image:
      "https://media.istockphoto.com/id/1311574382/photo/blue-t-shirt-isolated-on-white-background.jpg?b=1&s=170667a&w=0&k=20&c=3aHoYgSUnlX8MaEtQ__mO7mInI_kCst10kfBYmpJf48=",
    quantity: 1,
  },
  {
    name: "T-Shirt",
    price: 12,
    image:
      "https://media.istockphoto.com/id/1311574382/photo/blue-t-shirt-isolated-on-white-background.jpg?b=1&s=170667a&w=0&k=20&c=3aHoYgSUnlX8MaEtQ__mO7mInI_kCst10kfBYmpJf48=",
    quantity: 1,
  },
];

function CartOverlay({}: CartOverlayProps) {
  return (
    <div className="fixed bottom-3 left-3 right-3 cursor-pointer rounded-lg bg-gray-800 md:bottom-3 md:left-auto md:right-3 md:top-3">
      <div className="flex flex-row items-center justify-between px-5 py-3">
        <div className="flex flex-row items-center justify-start gap-3 ">
          <p className="mr-3 text-white">Cart</p>
          {cartItems.slice(0, 3).map((item, idx) => (
            <img
              key={idx}
              className="aspect-square h-8 w-8 rounded-lg object-cover"
              src={item.image}
              alt={item.name}
            />
          ))}
        </div>
        <div className="flex aspect-square h-10 w-10 items-center justify-center rounded-lg bg-orange-500">
          <p className="text-white">+{cartItems.length - 3}</p>
        </div>
      </div>
    </div>
  );
}

export default CartOverlay;
