export interface ImageSlide {
  id: number;
  url: string;
  alt: string;
  caption: string;
}

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface ProductCard {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
}

export interface FeatureDescription {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const imageSlides: ImageSlide[] = [
  {
    id: 1,
    url: 'https://picsum.photos/seed/mountain1/800/400',
    alt: 'Scenic mountain landscape with snow-capped peaks',
    caption: 'Mountain Adventure',
  },
  {
    id: 2,
    url: 'https://picsum.photos/seed/ocean2/800/400',
    alt: 'Ocean waves at sunset with golden reflection',
    caption: 'Coastal Paradise',
  },
  {
    id: 3,
    url: 'https://picsum.photos/seed/city3/800/400',
    alt: 'Urban cityscape at night with illuminated buildings',
    caption: 'City Lights',
  },
  {
    id: 4,
    url: 'https://picsum.photos/seed/forest4/800/400',
    alt: 'Peaceful forest pathway covered with autumn leaves',
    caption: 'Nature Trail',
  },
  {
    id: 5,
    url: 'https://picsum.photos/seed/desert5/800/400',
    alt: 'Desert landscape with sand dunes at golden hour',
    caption: 'Desert Dreams',
  },
  {
    id: 6,
    url: 'https://picsum.photos/seed/lake6/800/400',
    alt: 'Tranquil lake reflecting surrounding mountains',
    caption: 'Lake Serenity',
  },
  {
    id: 7,
    url: 'https://picsum.photos/seed/waterfall7/800/400',
    alt: 'Majestic waterfall cascading into a pool',
    caption: 'Waterfall Wonder',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      'The carousel component is incredibly smooth and easy to integrate. It works perfectly with our existing Material UI setup.',
    author: 'Sarah Johnson',
    role: 'Lead Frontend Developer',
    company: 'Tech Innovations Inc.',
  },
  {
    id: 2,
    quote:
      'We needed a production-ready carousel that matched Material UI design principles. This component exceeded our expectations.',
    author: 'Michael Chen',
    role: 'UI/UX Designer',
    company: 'Creative Solutions',
  },
  {
    id: 3,
    quote:
      'The accessibility features are outstanding. Our users love how intuitive the navigation is, whether using mouse, keyboard, or touch.',
    author: 'Emily Rodriguez',
    role: 'Accessibility Specialist',
    company: 'Inclusive Design Co.',
  },
  {
    id: 4,
    quote:
      'Performance is excellent even with multiple carousels on a single page. The autoplay feature works flawlessly.',
    author: 'David Park',
    role: 'Senior Software Engineer',
    company: 'Digital Dynamics',
  },
  {
    id: 5,
    quote:
      'Finally, a native MUI carousel that respects our theme and styling! No more fighting with third-party CSS.',
    author: 'Lisa Thompson',
    role: 'Product Manager',
    company: 'Startup Labs',
  },
];

export const productCards: ProductCard[] = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 149.99,
    originalPrice: 199.99,
    image: 'https://picsum.photos/seed/headphones/400/400',
    rating: 4.5,
    reviews: 234,
    badge: 'Sale',
  },
  {
    id: 2,
    name: 'Smart Watch Pro',
    price: 299.99,
    image: 'https://picsum.photos/seed/watch/400/400',
    rating: 4.8,
    reviews: 567,
    badge: 'New',
  },
  {
    id: 3,
    name: 'Portable Speaker',
    price: 79.99,
    image: 'https://picsum.photos/seed/speaker/400/400',
    rating: 4.2,
    reviews: 189,
  },
  {
    id: 4,
    name: 'Laptop Stand',
    price: 49.99,
    originalPrice: 69.99,
    image: 'https://picsum.photos/seed/stand/400/400',
    rating: 4.6,
    reviews: 412,
    badge: 'Best Seller',
  },
  {
    id: 5,
    name: 'Mechanical Keyboard',
    price: 129.99,
    image: 'https://picsum.photos/seed/keyboard/400/400',
    rating: 4.7,
    reviews: 823,
  },
  {
    id: 6,
    name: 'Webcam HD',
    price: 89.99,
    image: 'https://picsum.photos/seed/webcam/400/400',
    rating: 4.3,
    reviews: 156,
  },
];

export const featureDescriptions: FeatureDescription[] = [
  {
    id: 'navigation',
    title: 'Intuitive Navigation',
    description:
      'Built-in navigation arrows and dot indicators make it easy for users to browse content.',
    icon: 'navigation',
  },
  {
    id: 'touch',
    title: 'Touch & Gesture Support',
    description:
      'Native touch event handling with swipe gestures for mobile and drag support for desktop.',
    icon: 'touch',
  },
  {
    id: 'accessibility',
    title: 'Fully Accessible',
    description:
      'Complete keyboard navigation, ARIA attributes, and screen reader support following WCAG guidelines.',
    icon: 'accessibility',
  },
  {
    id: 'autoplay',
    title: 'Auto-Play',
    description:
      'Configurable auto-advance with pause on hover/focus for better user experience.',
    icon: 'autoplay',
  },
  {
    id: 'transitions',
    title: 'Smooth Transitions',
    description:
      'Choose between slide and fade transitions with customizable duration.',
    icon: 'transitions',
  },
  {
    id: 'theming',
    title: 'Theme Integration',
    description:
      'Seamless integration with Material UI theming system for consistent styling.',
    icon: 'theming',
  },
];
