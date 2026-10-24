import type { GalleryItem } from '../types';

/**
 * TODO(owner): these entries use PLACEHOLDER illustrations. Replace the files in
 * public/images/gallery with real photos (4:3 ratio) and update the text.
 * Only publish photos you have the customer's permission to use.
 */
export const galleryItems: readonly GalleryItem[] = [
  {
    id: 'kitchen-1',
    title: 'Greasy Kitchen Restoration',
    category: 'kitchen',
    caption: 'Deep degreasing of primary cooking hobs and stainless steel surfaces.',
    before: {
      src: '/images/gallery/kitchen-1-before.webp',
      alt: 'Before: Greasy kitchen stove and countertops',
      width: 800,
      height: 600,
    },
    after: {
      src: '/images/gallery/kitchen-1-after.webp',
      alt: 'After: Sparkling clean stainless steel stovetop and counters',
      width: 800,
      height: 600,
    },
  },
  {
    id: 'bathroom-1',
    title: 'Hard-Water Scale Descaling',
    category: 'bathroom',
    caption: 'Restored shower tiles, white grout, and polished mirror-finish chrome fittings.',
    before: {
      src: '/images/gallery/bathroom-1-before.webp',
      alt: 'Before: Stained shower tiles and calcified faucet',
      width: 800,
      height: 600,
    },
    after: {
      src: '/images/gallery/bathroom-1-after.webp',
      alt: 'After: Spotless shower tiles, white grout, and sparkling chrome faucet',
      width: 800,
      height: 600,
    },
  },
  {
    id: 'living-room-1',
    title: 'Hardwood Living Room Revival',
    category: 'living-room',
    caption: 'Deep dust and pet hair removal, mopped hardwood, and tidy restoration.',
    before: {
      src: '/images/gallery/living-room-1-before.webp',
      alt: 'Before: Dusty living room with stained hardwood floors',
      width: 800,
      height: 600,
    },
    after: {
      src: '/images/gallery/living-room-1-after.webp',
      alt: 'After: Gleaming polished hardwood floor and spotless living room',
      width: 800,
      height: 600,
    },
  },
  {
    id: 'kitchen-2',
    title: 'Stainless Sink & Faucet Descale',
    category: 'kitchen',
    caption: 'Food stain removal, limescale treatment, and gleaming double-basin polish.',
    before: {
      src: '/images/gallery/kitchen-2-before.webp',
      alt: 'Before: Stained stainless sink with mineral deposits and residue',
      width: 800,
      height: 600,
    },
    after: {
      src: '/images/gallery/kitchen-2-after.webp',
      alt: 'After: Mirror-finish stainless sink with descaled sparkling chrome faucet',
      width: 800,
      height: 600,
    },
  },
  {
    id: 'bathroom-2',
    title: 'Vanity Mirror & Washbasin Clean',
    category: 'bathroom',
    caption: 'Soap scum wiped, toothpaste stains cleared, and ceramic sanitized.',
    before: {
      src: '/images/gallery/bathroom-2-before.webp',
      alt: 'Before: Dirty bathroom vanity with toothpaste splatters and stained basin',
      width: 800,
      height: 600,
    },
    after: {
      src: '/images/gallery/bathroom-2-after.webp',
      alt: 'After: Spotless white ceramic washbasin and gleaming polished vanity faucet',
      width: 800,
      height: 600,
    },
  },
  {
    id: 'hall-1',
    title: 'Dining Hall Table & Tile Mopping',
    category: 'living-room',
    caption: 'Coffee ring removal, dust-free timber surfaces, and mopped tiled floors.',
    before: {
      src: '/images/gallery/hall-1-before.webp',
      alt: 'Before: Messy dining table with drink rings and unmopped tile floor',
      width: 800,
      height: 600,
    },
    after: {
      src: '/images/gallery/hall-1-after.webp',
      alt: 'After: Polished gleaming dining table, organized space, and shining floor',
      width: 800,
      height: 600,
    },
  },
];
