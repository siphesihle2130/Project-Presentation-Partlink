// src/data/mockProducts.ts

export type Product = {
  id: number;
  name: string;
  vehicle: string;
  price: string;
  image: string;
  category: string;
  condition: string;
  year: string;
  description: string;
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 101,
    name: "Alternator",
    vehicle: "Toyota Corolla",
    price: "R2,100",
    image: "/alternator.png",
    category: "Engine",
    condition: "Good",
    year: "2019",
    description: "Genuine Toyota alternator, tested and in good working condition. Fits most 1.6L and 1.8L Corolla models.",
  },
  {
    id: 102,
    name: "Air Intake Hose",
    vehicle: "Corsa B 1.3i",
    price: "R850",
    image: "/Air-intake-horse.png",
    category: "Engine",
    condition: "Excellent",
    year: "2018",
    description: "OEM air intake hose, no cracks or leaks. Direct fit replacement for Corsa B 1.3i models.",
  },
  {
    id: 103,
    name: "Ignition Lead Set",
    vehicle: "VW Polo",
    price: "R450",
    image: "/Ignition-lead-set.png",
    category: "Electrical",
    condition: "New",
    year: "2021",
    description: "Brand new ignition lead set, still sealed. Improves spark delivery and engine smoothness.",
  },
  {
    id: 104,
    name: "Headlights (Pair)",
    vehicle: "BMW 3 Series",
    price: "R3,600",
    image: "/headlights.png",
    category: "Electrical",
    condition: "Good",
    year: "2017",
    description: "Genuine BMW headlight pair, both units working with clear lenses. Minor cosmetic wear.",
  },
  {
    id: 105,
    name: "Side Mirror",
    vehicle: "Hyundai i20",
    price: "R480",
    image: "/side-mirror.png",
    category: "Body",
    condition: "Good",
    year: "2020",
    description: "Right-side wing mirror, glass and housing intact. Electric adjustment fully functional.",
  },
  {
    id: 106,
    name: "Accelerator Pedal",
    vehicle: "Ford Fiesta",
    price: "R320",
    image: "/Accelarator-pedal.png",
    category: "Interior",
    condition: "Fair",
    year: "2016",
    description: "Used accelerator pedal assembly, sensor tested and working. Some surface wear.",
  },
  {
    id: 107,
    name: "Front Shock Absorber",
    vehicle: "Audi A3",
    price: "R1,750",
    image: "/Front-shock-absober.png",
    category: "Suspension",
    condition: "Good",
    year: "2019",
    description: "Front shock absorber, no leaks or damage. Sold individually - front left.",
  },
  {
    id: 108,
    name: "Front Stabiliser Link",
    vehicle: "Renault Clio",
    price: "R280",
    image: "/Front-stabiliser.png",
    category: "Suspension",
    condition: "New",
    year: "2022",
    description: "New aftermarket front stabiliser link, direct fit, includes mounting hardware.",
  },
  {
    id: 109,
    name: "Front Wheel Bearing Kit",
    vehicle: "Nissan Micra",
    price: "R650",
    image: "/Front-wheel-bearing-kit.png",
    category: "Suspension",
    condition: "New",
    year: "2021",
    description: "Complete front wheel bearing kit, unopened box, includes bearing, hub, and ABS ring.",
  },
  {
    id: 110,
    name: "Gearbox",
    vehicle: "VW Golf",
    price: "R8,500",
    image: "/Gear-box.png",
    category: "Transmission",
    condition: "Good",
    year: "2018",
    description: "5-speed manual gearbox, recently serviced, no grinding or slipping. Buyer to confirm compatibility.",
  },
  {
    id: 111,
    name: "Auto Gear Selector",
    vehicle: "Mercedes C-Class",
    price: "R1,200",
    image: "/Autogear.png",
    category: "Transmission",
    condition: "Good",
    year: "2017",
    description: "Automatic gear selector assembly, all positions working correctly, minor cosmetic wear on trim.",
  },
  {
    id: 112,
    name: "Clutch Kit",
    vehicle: "Toyota Corolla",
    price: "R2,250",
    image: "/Clutch kit.png",
    category: "Transmission",
    condition: "Good",
    year: "2020",
    description: "Genuine Toyota clutch kit in excellent condition, includes pressure plate, disc, and bearing.",
  },
];

export const CATEGORY_ICON_FALLBACK = "/placeholder.png";