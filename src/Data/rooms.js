import {
  FiEye,
  FiDroplet,
  FiWifi,
  FiHome,
  FiCoffee,
  FiWind,
  FiGrid,
  FiMonitor,
} from "react-icons/fi";

export const ROOMS = [
  {
    id: 1,
    name: [
      "Limited Period - Classic Sunroom - CP",
      "Classic Sunroom - CP"
    ],
    description:
      "Wake up to soft sunlight and serene forest views in this charming sunroom. Designed for comfort and calm, it offers a warm, intimate escape.",
    stayIncludes: [
      "Daily Breakfast",
      "In-room refreshments",
      "A Forest Trail activity",
    ],
    amenities: [
      { label: "Forest View", icon: FiEye },
      { label: "Mini Bar", icon: FiDroplet },
      { label: "Wi-fi", icon: FiWifi },
      { label: "Room with Sofa", icon: FiHome },
      { label: "In room tea and coffee", icon: FiCoffee },
      { label: "Forest bathtub", icon: FiWind },
    ],
    features: [
      {
        title: "Garden Views",
        image: "/Classic_Sunroom_1.jpg",
      },
      {
        title: "Space For Two",
        image: "/Classic_Sunroom_2.jpg",
      },
      {
        title: "Original Features",
        image: "/Classic_Sunroom_3.jpg",
      },
      {
        title: "Large Bathroom",
        image: "/Classic_Sunroom_4.jpg",
      },
    ],
  },
  {
    id: 2,
    name: [
      "Limited Period - Forest Bathtub - CP",
      "Forest Bathtub - CP"
    ],
    description:
      "A beautifully crafted suite where nature meets indulgence. Enjoy tranquil green views and a private balcony bathtub for peaceful relaxation.",
    stayIncludes: [
      "Daily Breakfast",
      "In-room refreshments",
      "Round-trip transfer from Lonavala station (3 nights+)",
      "Forest Trail activity",
    ],
    amenities: [
      { label: "Forest View", icon: FiEye },
      { label: "Mini Bar", icon: FiDroplet },
      { label: "Wi-fi", icon: FiWifi },
      { label: "Room with Sofa & Work Table", icon: FiHome },
      { label: "In room tea and coffee", icon: FiCoffee },
      { label: "Private balcony with Bathtub", icon: FiGrid },
      { label: "Four-Poster Bed", icon: FiHome },
      { label: "Ensuite bathroom with toiletries", icon: FiMonitor },
    ],
    features: [
      {
        title: "Garden Views",
        image: "/Forest_Bathtub_01.jpg",
      },
      {
        title: "Space For Two",
        image: "/Forest_Bathtub_02.jpg",
      },
      {
        title: "Original Features",
        image: "/Forest_Bathtub_03.jpg",
      },
      {
        title: "Large Bathroom",
        image: "/Forest_Bathtub_04.jpg",
      },
    ],
  },
  {
    id: 3,
    name: [
      "Limited Period - Luxury Sunroom - CP",
      "Luxury Sunroom - CP"
    ],
    description:
      "Experience refined comfort with warm sunlight, elegant interiors, and breathtaking mountain–forest views from your private balcony.",
    stayIncludes: [
      "Daily Breakfast",
      "In-room refreshments",
      "Round-trip transfer from Lonavala station (3 nights+)",
      "Forest Trail activity",
    ],
    amenities: [
      { label: "Mountain with Forest View", icon: FiEye },
      { label: "Mini Bar", icon: FiDroplet },
      { label: "Wi-fi", icon: FiWifi },
      { label: "Room with Sofa & Work Table", icon: FiHome },
      { label: "In room tea and coffee", icon: FiCoffee },
      { label: "Private balcony", icon: FiGrid },
      { label: "Four-Poster Bed", icon: FiHome },
      { label: "Ensuite bathroom with toiletries", icon: FiMonitor },
      { label: "Double Sized Bathtub (2 ppl)", icon: FiWind },
    ],
    features: [
      {
        title: "Garden Views",
        image: "/Luxury_Sunroom_Arboreal_01.jpg",
      },
      {
        title: "Space For Two",
        image: "/Luxury_Sunroom_Arboreal_02.jpg",
      },
      {
        title: "Original Features",
        image: "/Luxury_Sunroom_Arboreal_03.jpg",
      },
      {
        title: "Large Bathroom",
        image: "/Luxury_Sunroom_Arboreal_04.jpg",
      },
    ],
  },
  {
    id: 4,
    name: [
      "Limited Period - Forest Private Pool - CP",
      "Forest Private Pool - CP"
    ],
    description:
      "A premium escape featuring your own private pool facing untouched forest views. Designed for ultimate privacy, comfort, and luxury.",
    stayIncludes: [
      "Daily Breakfast",
      "In-room refreshments",
      "Round-trip transfer from Lonavala station (3 nights+)",
      "Forest Trail activity",
    ],
    amenities: [
      { label: "Mountain with Forest View", icon: FiEye },
      { label: "Mini Bar", icon: FiDroplet },
      { label: "Wi-fi", icon: FiWifi },
      { label: "Room with Sofa", icon: FiHome },
      { label: "In room tea and coffee", icon: FiCoffee },
      { label: "Private balcony with Pool", icon: FiGrid },
      { label: "Four-Poster Bed", icon: FiHome },
      { label: "Ensuite bathroom with toiletries", icon: FiMonitor },
    ],
    features: [
      {
        title: "Garden Views",
        image: "/Forest_Private_Pool_1.jpg",
      },
      {
        title: "Space For Two",
        image: "/Forest_Private_Pool_2.jpg",
      },
      {
        title: "Original Features",
        image: "/Forest_Private_Pool_3.jpg",
      },
      {
        title: "Large Bathroom",
        image: "/Forest_Private_Pool_4.jpg",
      },
    ],
  },
];

// Helper function to find room data by name
export const findRoomByName = (roomName) => {
  if (!roomName) return null;
  
  return ROOMS.find((room) => {
    return room.name.some((name) => 
      roomName.toLowerCase().includes(name.toLowerCase()) ||
      name.toLowerCase().includes(roomName.toLowerCase())
    );
  });
};

