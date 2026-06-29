/**
 * Short client testimonial quotes (near-term proof).
 *
 * PLACEHOLDER: replace these with real, approved client quotes. Keep them short.
 * Video testimonials are planned for the longer term — when ready, this model can
 * grow a `videoUrl?` field and the rendering can branch on it.
 *
 * `author` should be attributable but can stay role/industry-only if the client
 * prefers not to be named (e.g. "IT Director, Manufacturing").
 */
export interface Testimonial {
  quote: string;
  author: string;
}

export const testimonials: Testimonial[] = [
  {
    quote: 'Placeholder quote — AllTech rebuilt our network and we have not had an outage since. Replace with a real client quote.',
    author: 'Operations Manager, Manufacturing',
  },
  {
    quote: 'Placeholder quote — they found gaps our last provider missed and fixed them fast. Replace with a real client quote.',
    author: 'IT Director, Title & Escrow',
  },
  {
    quote: 'Placeholder quote — a real team that answers the phone and follows through. Replace with a real client quote.',
    author: 'Administrator, K-12 School',
  },
];
