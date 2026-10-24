import type { Testimonial } from '../types';

/**
 * Client feedback matching the Cleanora design layout with customer avatars.
 * Note: Marked as illustrative sample reviews until authenticated with customers.
 */
export const testimonials: readonly Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah M.',
    role: 'Home Cleaning Client',
    location: 'Gandhi Nagar, Kolar',
    rating: 5,
    review:
      'Kolar Clean did an amazing job! My home has never looked this clean and fresh. The team was highly professional, incredibly friendly, and arrived exactly on time.',
    image: {
      src: '/images/avatars/sarah.jpg',
      alt: 'Sarah M.',
      width: 100,
      height: 100,
    },
  },
  {
    id: 't2',
    name: 'James T.',
    role: 'Business & Office Client',
    location: 'APMC Yard Road, Kolar',
    rating: 5,
    review:
      "We've been using Kolar Clean for our office and home deep cleaning for months, and the results are always outstanding. Highly recommend their services!",
    image: {
      src: '/images/avatars/james.jpg',
      alt: 'James T.',
      width: 100,
      height: 100,
    },
  },
  {
    id: 't3',
    name: 'Emily R.',
    role: 'Repeat Residential Client',
    location: 'Bangarapet, Kolar Dist.',
    rating: 5,
    review:
      'Reliable, detailed, and eco-friendly! I love that they use safe products and always leave our home sparkling. Fantastic service!',
    image: {
      src: '/images/avatars/emily.jpg',
      alt: 'Emily R.',
      width: 100,
      height: 100,
    },
  },
  {
    id: 't4',
    name: 'Priya K.',
    role: 'Deep Cleaning Client',
    location: 'Robertsonpet, Kolar Dist.',
    rating: 5,
    review:
      'Booked their full villa deep cleaning before the festival. Every corner, balcony, and ceiling fan was spotless. Unbeatable attention to detail!',
    image: {
      src: '/images/avatars/priya.jpg',
      alt: 'Priya K.',
      width: 100,
      height: 100,
    },
  },
  {
    id: 't5',
    name: 'Anand N.',
    role: 'Kitchen Cleaning Client',
    location: 'Gulpet, Kolar',
    rating: 5,
    review:
      'The grease and hard water stains on our kitchen tiles and chimney were completely eliminated. Super courteous staff and zero chemical odor.',
    image: {
      src: '/images/avatars/anand.jpg',
      alt: 'Anand N.',
      width: 100,
      height: 100,
    },
  },
  {
    id: 't6',
    name: 'Rekha S.',
    role: 'Move-in Cleaning Client',
    location: 'Fort Area, Kolar',
    rating: 5,
    review:
      'Moved into a newly painted 3BHK and Kolar Clean made it ready to live in 4 hours. Inspection walkthrough at the end gave us total peace of mind.',
    image: {
      src: '/images/avatars/sarah.jpg',
      alt: 'Rekha S.',
      width: 100,
      height: 100,
    },
  },
];
