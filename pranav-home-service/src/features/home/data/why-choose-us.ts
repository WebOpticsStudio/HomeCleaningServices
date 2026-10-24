export type ReasonIcon = 'shield' | 'clock' | 'leaf' | 'badge';

export const reasons: readonly {
  id: string;
  icon: ReasonIcon;
  title: string;
  description: string;
}[] = [
  {
    id: 'trained',
    icon: 'shield',
    title: 'Trained, uniformed team',
    description: 'Cleaners are trained on surfaces and products, and arrive ready to work.',
  },
  {
    id: 'ontime',
    icon: 'clock',
    title: 'On time, every time',
    description: 'Pick a two-hour window. We call ahead if anything changes.',
  },
  {
    id: 'supplies',
    icon: 'leaf',
    title: 'Our supplies, your peace',
    description: 'We bring our own equipment and gentle, household-safe products.',
  },
  {
    id: 'price',
    icon: 'badge',
    title: 'Price confirmed upfront',
    description: 'We agree the total before we start. No add-ons on the day.',
  },
];
