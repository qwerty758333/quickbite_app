export type MenuCategory = 'Meals' | 'Beverages' | 'Snacks';

// Describes the local menu record used by the browse, detail, and cart screens.
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: MenuCategory;
  price: number;
  image: string;
}

// Local sample data keeps the MVP usable without a backend or network API.
export const menuItems: MenuItem[] = [
  {
    id: 'teriyaki-bowl',
    name: 'Teriyaki Chicken Bowl',
    description: 'Steamed rice, grilled chicken, broccoli, and sesame teriyaki glaze.',
    category: 'Meals',
    price: 8.5,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'veggie-wrap',
    name: 'Campus Veggie Wrap',
    description: 'Roasted vegetables, hummus, greens, and feta in a toasted herb wrap.',
    category: 'Meals',
    price: 7.25,
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'ramen-cup',
    name: 'Miso Ramen Cup',
    description: 'Rich miso broth with noodles, sweetcorn, spring onion, and tofu.',
    category: 'Meals',
    price: 6.75,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'iced-matcha',
    name: 'Iced Matcha Latte',
    description: 'Earthy matcha whisked with oat milk and a touch of vanilla.',
    category: 'Beverages',
    price: 4.5,
    image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'cold-brew',
    name: 'Vanilla Cold Brew',
    description: 'Slow-steeped coffee, vanilla cream, and plenty of ice.',
    category: 'Beverages',
    price: 3.95,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'granola-pot',
    name: 'Berry Granola Pot',
    description: 'Greek yogurt, berry compote, toasted granola, and honey.',
    category: 'Snacks',
    price: 4.25,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=85',
  },
];