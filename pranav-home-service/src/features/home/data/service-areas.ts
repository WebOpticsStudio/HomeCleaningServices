export interface ServiceAreaLocation {
  id: string;
  name: string;
  type: 'city-core' | 'surrounding-taluk' | 'industrial-zone';
  status: 'confirmed' | 'requires-phone-confirmation';
  distanceNote: string;
  description: string;
  popularFor: readonly string[];
}

/**
 * Service coverage areas in and around Kolar, Karnataka, India.
 * Note: Areas marked 'requires-phone-confirmation' are configurable placeholders
 * and require confirmation by service dispatch prior to final booking commitment.
 */
export const serviceAreaLocations: readonly ServiceAreaLocation[] = [
  {
    id: 'kolar-city',
    name: 'Kolar City (All Neighborhoods)',
    type: 'city-core',
    status: 'confirmed',
    distanceNote: 'Local Core Service Area',
    description:
      'Full coverage across Kolar town including Gulpet, Kataripalya, Gandhi Nagar, Fort Area, APMC Yard, Gowripete, Doomlight Circle, and Kuvempu Nagar.',
    popularFor: ['Home Deep Cleaning', 'Standard Upkeep', 'Kitchen Degreasing'],
  },
  {
    id: 'bangarapet',
    name: 'Bangarapet',
    type: 'surrounding-taluk',
    status: 'requires-phone-confirmation',
    distanceNote: '~18 km from Kolar Center',
    description:
      'Serving homes and commercial establishments across Bangarapet town and railway colony upon prior booking confirmation.',
    popularFor: ['Move-in/Move-out Clean', 'Bathroom & Kitchen Deep Clean'],
  },
  {
    id: 'kgf-robertsonpet',
    name: 'Robertsonpet / KGF (Kolar Gold Fields)',
    type: 'surrounding-taluk',
    status: 'requires-phone-confirmation',
    distanceNote: '~30 km from Kolar Center',
    description:
      'Coverage for residential bungalows, heritage quarters, and flats across Robertsonpet, Champion Reefs, and Marikuppam.',
    popularFor: ['Deep Cleaning', 'Move-in Cleaning', 'Post-Renovation Clean'],
  },
  {
    id: 'malur',
    name: 'Malur',
    type: 'surrounding-taluk',
    status: 'requires-phone-confirmation',
    distanceNote: '~28 km from Kolar Center',
    description:
      'Serving residences, apartments, and commercial complexes in Malur town with advance slot reservation.',
    popularFor: ['Standard Cleaning', 'Deep Clean Packages'],
  },
  {
    id: 'mulbagal',
    name: 'Mulbagal',
    type: 'surrounding-taluk',
    status: 'requires-phone-confirmation',
    distanceNote: '~30 km from Kolar Center',
    description:
      'Coverage for homes and spaces across Mulbagal taluk. Service availability confirmed during scheduling call.',
    popularFor: ['Festival Deep Clean', 'Full Home Sanitisation'],
  },
  {
    id: 'srinivaspur',
    name: 'Srinivaspur',
    type: 'surrounding-taluk',
    status: 'requires-phone-confirmation',
    distanceNote: '~28 km from Kolar Center',
    description:
      'Covering residential properties in Srinivaspur town. Travel and slot timing confirmed over phone.',
    popularFor: ['Deep Cleaning', 'Move-out Cleaning'],
  },
  {
    id: 'vemagal-narasapura',
    name: 'Vemagal & Narasapura Corridor',
    type: 'industrial-zone',
    status: 'requires-phone-confirmation',
    distanceNote: '~15-22 km from Kolar',
    description:
      'Serving corporate guest houses, staff quarters, and residences along the Vemagal and Narasapura industrial belts.',
    popularFor: ['Office Sanitisation', 'Staff Quarter Cleaning', 'Deep Clean'],
  },
];
