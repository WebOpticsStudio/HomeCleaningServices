import type { Service } from '../types';

/**
 * Kolar Cleaning Services service catalog matching the official services and flyer pricing.
 */
export const services: readonly Service[] = [
  {
    slug: 'home-cleaning',
    name: 'Basic Home Cleaning',
    shortDescription:
      'A meticulous routine clean covering living areas, bedrooms, sweeping, wet mopping, and surface sanitation.',
    description:
      'Our routine home cleaning covers every room so you come back to a home that feels reset. Essential dusting, sweeping, mopping and bathroom care.',
    icon: 'home',
    image: {
      src: '/images/services/living.webp',
      alt: 'Bright modern living room freshly cleaned',
      width: 1200,
      height: 800,
    },
    startingPrice: 2000,
    priceNote: '/ Flat Rate (Ideal for 1 BHK)',
    duration: '2 to 3 hours',
    includes: [
      'Complete dusting of open surfaces & furniture',
      'Sweeping and wet mopping of all floors',
      'Kitchen platform, counter & sink cleaning',
      '1 bathroom complete scrub & wipe',
      'Basic floor cleaning & waste bins emptied',
    ],
    idealFor: ['Busy families', '1 BHK apartments', 'Regular upkeep'],
  },
  {
    slug: 'deep-cleaning',
    name: 'Deep Cleaning',
    shortDescription:
      'A comprehensive, rigorous treatment covering all living areas, structural fixtures, hidden corners, and high-touch areas.',
    description:
      'A comprehensive, intensive clean for places that accumulate grime: switchboards, window tracks, fan blades, bathroom scale, and kitchen grease.',
    icon: 'sparkles',
    image: {
      src: '/images/services/deep-cleaning.webp',
      alt: 'Luxury living room after comprehensive deep restoration cleaning',
      width: 1200,
      height: 800,
    },
    startingPrice: 2500,
    priceNote: '1 BHK: ₹2,500 | 2 BHK: ₹3,500 | 3 BHK: ₹4,500',
    duration: '4 to 6 hours',
    includes: [
      'Complete dusting including fans & light fixtures',
      'Sweeping & deep scrubbing of all floors',
      'Kitchen cleaning & counter degreasing',
      'All bathrooms scrubbed, descaled & disinfected',
      'Doors, window glass (inside), grills & switchboards',
    ],
    idealFor: ['Festival preparation', 'Seasonal deep reset', 'Thorough household sanitisation'],
  },
  {
    slug: 'kitchen-deep-cleaning',
    name: 'Kitchen Deep Cleaning',
    shortDescription:
      'Targeted degreasing and deep sanitation for chimneys, tile grout, cabinets, burners, and stainless steel sinks.',
    description:
      'Targeted degreasing and deep sanitation for hard-working kitchens: chimneys, tile grout, cabinets, burners, and sinks.',
    icon: 'sparkles',
    image: {
      src: '/images/services/kitchen.webp',
      alt: 'Spotless modern kitchen with gleaming countertops',
      width: 1200,
      height: 800,
    },
    startingPrice: 2500,
    priceNote: '/ Per Kitchen',
    duration: '2 to 3.5 hours',
    includes: [
      'Platform & chimney exterior degreasing',
      'Tiles, backsplash & wall degreasing',
      'Sink & tap deep descaling & sanitation',
      'Cabinet exterior cleaning & handle wipe-down',
      'Grease, grime & burnt oil stain removal',
    ],
    idealFor: ['Greasy backsplashes', 'Exhaust & chimney build-up', 'Pre-festival kitchen reset'],
  },
  {
    slug: 'bathroom-cleaning',
    name: 'Bathroom Deep Cleaning',
    shortDescription:
      'Intensive scrubbing of floor and wall tiles, hard-water descaling, commode disinfection, and polished chrome fixtures.',
    description:
      'Intensive scrubbing of bathroom tiles, grout, faucets, commodes, and glass partitions to eliminate stubborn hard-water scale and bacteria.',
    icon: 'bath',
    image: {
      src: '/images/services/bathroom.webp',
      alt: 'Sparkling clean modern bathroom with glass shower',
      width: 1200,
      height: 800,
    },
    startingPrice: 1500,
    priceNote: '/ Per Bathroom',
    duration: '1.5 to 2.5 hours',
    includes: [
      'Floor & wall tiles intensive scrubbing',
      'Toilet cleaning, descaling & sanitisation',
      'Sink, taps & chrome fixtures descaling',
      'Hard-water stain & yellow scale removal',
      'Mirror, exhaust fan & floor drain disinfection',
    ],
    idealFor: ['Hard-water mineral deposits', 'Yellow tile scale', 'Hygiene sanitisation'],
  },
  {
    slug: 'move-in-out-cleaning',
    name: 'Move In/Out Cleaning',
    shortDescription:
      'Complete empty-home deep clean including cupboards inside out, floor machine scrubbing, and move-in inspection reset.',
    description:
      'Empty-house cleaning that guarantees handover inspection readiness: cupboards inside/out, deep sanitisation, and floor restoration.',
    icon: 'truck',
    image: {
      src: '/images/services/movein.webp',
      alt: 'Clean empty home ready for moving in',
      width: 1200,
      height: 800,
    },
    startingPrice: 5000,
    priceNote: '1 BHK: ₹5,000 | 2 BHK: ₹6,500 | 3 BHK: ₹8,000',
    duration: '5 to 8 hours',
    includes: [
      'Empty house deep scrub & full sanitisation',
      'Kitchen & bathroom intensive deep clean',
      'Inside & outside of empty cupboards & wardrobes',
      'Floor machine scrubbing & stain removal',
      'Doors, windows, grills & switchboards wipe',
    ],
    idealFor: ['Tenants handing back keys', 'New homeowners moving in', 'Rental turnovers'],
  },
];
