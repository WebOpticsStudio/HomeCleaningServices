import type { AccordionItem } from '@/components/ui/accordion';

/** TODO(owner): SAMPLE ANSWERS. Confirm every answer matches your real policies. */
export const faqs: readonly AccordionItem[] = [
  {
    id: 'supplies',
    question: 'Do I need to provide cleaning supplies and equipment?',
    answer:
      'No. Our team arrives fully equipped with eco-safe chemicals, vacuum cleaners, scrubbers, microfiber cloths, and ladders. If you prefer any specific product for delicate surfaces, simply let us know.',
  },
  {
    id: 'home',
    question: 'Do I need to be at home during the cleaning service?',
    answer:
      'It is helpful to be present at the beginning to orient the crew and inspect priorities, and at the end to review the results. You do not need to stay throughout the entire duration.',
  },
  {
    id: 'confirm',
    question: 'How does booking and payment work?',
    answer:
      'Submit an online request in two minutes. Our team calls you to confirm the time slot and agreed price. Payment is collected securely only after the cleaning is completed to your satisfaction.',
  },
  {
    id: 'reschedule',
    question: 'Can I reschedule or cancel my booking?',
    answer:
      'Yes, absolutely. Please call or WhatsApp us at least 4 hours ahead and we will gladly reschedule your slot with zero cancellation penalty.',
  },
  {
    id: 'coverage',
    question: 'Which areas in and around Kolar do you cover?',
    answer:
      'We operate exclusively within Kolar city. We provide comprehensive cleaning coverage across all neighborhoods in Kolar (including Gulpet, Kataripalya, Gandhi Nagar, Fort Area, APMC Yard, Gowripete, Doomlight Circle, and Kuvempu Nagar). Please note that our services are strictly limited to Kolar only—we do not cover other towns such as KGF (Robertsonpet), Mulbagal, Bangarapet, or Malur.',
  },
];
