export const mockMenuItems = [
  {
    _id: "m1",
    name: "Butter Chicken",
    description: "Tender chicken cooked in a rich, creamy tomato gravy with aromatic spices.",
    category: "Main Course",
    price: 350,
    availability: true,
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
    createdAt: "2026-09-01T10:00:00.000Z",
  },
  {
    _id: "m2",
    name: "Paneer Tikka",
    description: "Chunks of paneer marinated in spices and grilled in a tandoor.",
    category: "Starter",
    price: 250,
    availability: true,
    image: "https://images.unsplash.com/photo-1599487405250-1200021c17da?auto=format&fit=crop&w=800&q=80",
    createdAt: "2026-09-02T11:30:00.000Z",
  },
  {
    _id: "m3",
    name: "Chicken Biryani",
    description: "A world-renowned Indian dish, biryani takes time and practice to make but is worth every bit of the effort.",
    category: "Main Course",
    price: 400,
    availability: false,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    createdAt: "2026-09-03T12:15:00.000Z",
  },
  {
    _id: "m4",
    name: "Margherita Pizza",
    description: "Classic pizza with tomato sauce, fresh mozzarella cheese, and basil.",
    category: "Main Course",
    price: 300,
    availability: true,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
    createdAt: "2026-09-04T14:20:00.000Z",
  },
  {
    _id: "m5",
    name: "Chocolate Brownie",
    description: "Warm chocolate brownie served with a scoop of vanilla ice cream.",
    category: "Dessert",
    price: 150,
    availability: true,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
    createdAt: "2026-09-05T16:45:00.000Z",
  },
  {
    _id: "m6",
    name: "Fresh Lime Soda",
    description: "Refreshing sweet and salted lime soda.",
    category: "Beverage",
    price: 80,
    availability: true,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    createdAt: "2026-09-06T09:10:00.000Z",
  },
];

export const mockUsers = [
  {
    _id: "u1",
    name: "Admin User",
    email: "admin@dineflow.com",
    role: "Admin",
    createdAt: "2026-08-01T08:00:00.000Z",
  },
  {
    _id: "u2",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "User",
    createdAt: "2026-09-05T14:30:00.000Z",
  },
  {
    _id: "u3",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "User",
    createdAt: "2026-09-07T10:15:00.000Z",
  },
];

export const mockDashboardStats = {
  totalMenuItems: 24,
  totalUsers: 156,
  totalOrders: 89,
};

export const mockCategories = [
  "Starter",
  "Main Course",
  "Dessert",
  "Beverage"
];

export const MENU_ITEMS = [
  {
    _id: '1',
    name: 'Burrata & Heirloom Tomatoes',
    description: 'Creamy burrata sourced from Puglia, served alongside sun-ripened heirloom tomatoes, aged balsamic reduction, fresh basil oil, and hand-harvested Maldon sea salt.',
    category: 'Starters',
    price: 18,
    available: true,
    image: 'https://images.unsplash.com/photo-1617474019977-0e105d1b430e?w=800&h=600&fit=crop&auto=format',
  },
  {
    _id: '2',
    name: 'Lobster Bisque',
    description: 'A velvety bisque crafted from Atlantic lobster shells, finished with a touch of Cognac, crème fraîche, and chive oil. Served with sourdough crostini.',
    category: 'Starters',
    price: 22,
    available: true,
    image: 'https://images.unsplash.com/photo-1689672235271-727de51355e6?w=800&h=600&fit=crop&auto=format',
  },
  {
    _id: '3',
    name: 'Pan-Seared Atlantic Salmon',
    description: 'Scottish salmon fillet seared to a golden crust, resting on celery root purée with lemon beurre blanc, caperberries, and micro-herb salad.',
    category: 'Mains',
    price: 34,
    available: true,
    image: 'https://images.unsplash.com/photo-1676471926534-d5c9771909fa?w=800&h=600&fit=crop&auto=format',
  },
  {
    _id: '4',
    name: 'Wagyu Beef Tenderloin',
    description: 'A5-grade Wagyu tenderloin, cooked to your preference, accompanied by truffle potato gratin, roasted asparagus, and a red wine jus reduction.',
    category: 'Mains',
    price: 68,
    available: true,
    image: 'https://images.unsplash.com/photo-1783683174031-be02abb7cd19?w=800&h=600&fit=crop&auto=format',
  },
  {
    _id: '5',
    name: 'Truffle Mushroom Risotto',
    description: 'Carnaroli rice slow-cooked in aged Parmigiano-Reggiano and white wine, folded with wild porcini mushrooms and finished with shaved black truffle.',
    category: 'Mains',
    price: 28,
    available: false,
    image: 'https://images.unsplash.com/photo-1532117472055-4d0734b51f31?w=800&h=600&fit=crop&auto=format',
  },
  {
    _id: '6',
    name: 'Black Truffle Tagliatelle',
    description: 'House-made egg tagliatelle tossed in a luxurious black truffle cream sauce, garnished with crispy guanciale and freshly grated Grana Padano.',
    category: 'Pasta',
    price: 32,
    available: true,
    image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=800&h=600&fit=crop&auto=format',
  },
  {
    _id: '7',
    name: 'Cacio e Pepe',
    description: 'The Roman classic, executed with precision — tonnarelli pasta, Pecorino Romano, and a generous hand with freshly cracked Tellicherry black pepper.',
    category: 'Pasta',
    price: 24,
    available: true,
    image: 'https://images.unsplash.com/photo-1516100882582-96c3a05fe590?w=800&h=600&fit=crop&auto=format',
  },
  {
    _id: '8',
    name: 'Chocolate Fondant',
    description: 'A warm Valrhona 70% dark chocolate heart, served with Madagascan vanilla bean ice cream, raspberry coulis, and edible gold leaf.',
    category: 'Desserts',
    price: 14,
    available: true,
    image: 'https://images.unsplash.com/photo-1589091637765-cbd0eff73a44?w=800&h=600&fit=crop&auto=format',
  },
  {
    _id: '9',
    name: 'Classic Tiramisu',
    description: 'Layers of Savoiardi biscuits soaked in double espresso and Marsala wine, cushioned between clouds of mascarpone cream, dusted with fine cocoa.',
    category: 'Desserts',
    price: 12,
    available: true,
    image: 'https://images.unsplash.com/photo-1673912402587-57ac40f1b4a5?w=800&h=600&fit=crop&auto=format',
  },
  {
    _id: '10',
    name: 'Sommelier Wine Selection',
    description: 'A curated glass chosen by our in-house sommelier to complement your meal. Ask our team for the evening\'s featured bottle recommendation.',
    category: 'Drinks',
    price: 18,
    available: true,
    image: 'https://images.unsplash.com/photo-1509710398975-6454dcdf049f?w=800&h=600&fit=crop&auto=format',
  },
];

export const USERS = [
  { _id: '1', name: 'Eleanor Whitmore', email: 'eleanor@dineflow.co', role: 'admin', registeredAt: '2024-01-15' },
  { _id: '2', name: 'Marcus Delacroix', email: 'marcus.d@gmail.com', role: 'user', registeredAt: '2024-03-22' },
  { _id: '3', name: 'Isabelle Fontaine', email: 'i.fontaine@outlook.com', role: 'user', registeredAt: '2024-05-08' },
  { _id: '4', name: 'Theodore Ashford', email: 'theo.ashford@proton.me', role: 'user', registeredAt: '2024-07-30' },
  { _id: '5', name: 'Vivienne Hartley', email: 'viv.hartley@gmail.com', role: 'user', registeredAt: '2024-09-12' },
  { _id: '6', name: 'Sebastian Crane', email: 'scrane@dineflow.co', role: 'admin', registeredAt: '2024-01-15' },
];

export const HERO_IMAGE = 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&h=900&fit=crop&auto=format';
export const HERO_IMAGE_2 = 'https://images.unsplash.com/photo-1663530761401-15eefb544889?w=1400&h=900&fit=crop&auto=format';
export const CATEGORIES = [
  { name: 'Starters', count: 6, image: 'https://images.unsplash.com/photo-1617474019977-0e105d1b430e?w=400&h=300&fit=crop&auto=format' },
  { name: 'Mains', count: 12, image: 'https://images.unsplash.com/photo-1783683174031-be02abb7cd19?w=400&h=300&fit=crop&auto=format' },
  { name: 'Pasta', count: 8, image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=400&h=300&fit=crop&auto=format' },
  { name: 'Desserts', count: 7, image: 'https://images.unsplash.com/photo-1589091637765-cbd0eff73a44?w=400&h=300&fit=crop&auto=format' },
];
