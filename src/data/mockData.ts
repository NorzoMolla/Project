import { Product } from '../components/shop/ProductCard';

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Chocolate Chip Cookies",
    price: 9.99,
    rating: 4.5,
    category: "snacks-sweet",
    image: "https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    isNew: true,
    gallery: [
      "https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      "https://images.pexels.com/photos/6823409/pexels-photo-6823409.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      "https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    ],
    variants: {
      name: "Size",
      options: [
        { label: "Small", value: "small" },
        { label: "Medium", value: "medium" },
        { label: "Large", value: "large" }
      ]
    }
  },
  {
    id: "2",
    name: "Mixed Nuts Premium",
    price: 12.99,
    rating: 4.7,
    category: "snacks-savory",
    image: "https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    isBestSeller: true
  },
  {
    id: "3",
    name: "Potato Chips Sea Salt",
    price: 4.99,
    rating: 4.2,
    category: "snacks-savory",
    image: "https://images.pexels.com/photos/568805/pexels-photo-568805.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
  },
  {
    id: "4",
    name: "Iced Coffee",
    price: 4.99,
    rating: 4.3,
    category: "beverages-cold",
    image: "https://images.pexels.com/photos/2638019/pexels-photo-2638019.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    isBestSeller: true
  },
  {
    id: "5",
    name: "Energy Drink",
    price: 3.50,
    rating: 4.0,
    category: "beverages-cold",
    image: "https://images.pexels.com/photos/2668308/pexels-photo-2668308.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
  },
  {
    id: "6",
    name: "Hot Chocolate",
    price: 3.99,
    rating: 4.6,
    category: "beverages-hot",
    image: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    isNew: true
  },
  {
    id: "7",
    name: "Berry Smoothie",
    price: 6.99,
    rating: 4.8,
    category: "beverages-cold",
    image: "https://images.pexels.com/photos/1291712/pexels-photo-1291712.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    isBestSeller: true
  },
  {
    id: "8",
    name: "Caramel Popcorn",
    price: 5.49,
    rating: 4.4,
    category: "snacks-sweet",
    image: "https://images.pexels.com/photos/33129/popcorn-movie-party-entertainment.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
  },
  {
    id: "9",
    name: "Green Tea",
    price: 2.99,
    rating: 4.1,
    category: "beverages-hot",
    image: "https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
  },
  {
    id: "10",
    name: "Salted Pretzels",
    price: 3.99,
    rating: 4.3,
    category: "snacks-savory",
    image: "https://images.pexels.com/photos/959922/pexels-photo-959922.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
  },
  {
    id: "11",
    name: "Chocolate Milkshake",
    price: 5.99,
    rating: 4.7,
    category: "beverages-cold",
    image: "https://images.pexels.com/photos/3625372/pexels-photo-3625372.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
  },
  {
    id: "12",
    name: "Dark Chocolate Bar",
    price: 6.99,
    rating: 4.5,
    category: "snacks-sweet",
    image: "https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    isBestSeller: true
  }
];