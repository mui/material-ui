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

export const imageSlides: ImageSlide[] = [
  {
    id: 1,
    url: 'https://picsum.photos/seed/1/800/400',
    alt: 'Scenic mountain landscape',
    caption: 'Mountain Adventure',
  },
  {
    id: 2,
    url: 'https://picsum.photos/seed/2/800/400',
    alt: 'Ocean waves at sunset',
    caption: 'Coastal Paradise',
  },
  {
    id: 3,
    url: 'https://picsum.photos/seed/3/800/400',
    alt: 'Urban cityscape at night',
    caption: 'City Lights',
  },
  {
    id: 4,
    url: 'https://picsum.photos/seed/4/800/400',
    alt: 'Forest pathway',
    caption: 'Nature Trail',
  },
  {
    id: 5,
    url: 'https://picsum.photos/seed/5/800/400',
    alt: 'Desert landscape',
    caption: 'Desert Dreams',
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
];
