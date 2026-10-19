/**
 * Facts shown on the site. Every value here traces to ./context/Shreyashi_Bista_CV.pdf
 * or to the commissioning brief. Do not add anything that is not in one of those.
 */
export const person = {
  name: 'Shreyashi Bista',
  givenName: 'Shreyashi',
  familyName: 'Bista',
  location: 'Kathmandu, Nepal',
  email: 'shreyashibista11@gmail.com',
  researchGate: 'https://www.researchgate.net/profile/Shreyashi-Bista',
  cvPdf: '/cv/Shreyashi-Bista-CV.pdf',
  description:
    'Conservation researcher from Kathmandu, Nepal, studying how people and wildlife share land. Essays on gender, family and the natural world.',
};

export const intro = {
  epigraphSource: 'little-lady-and-ladybug',
  text: 'Shreyashi Bista is a conservation researcher from Kathmandu, Nepal. She studies how people and wildlife share land, and writes essays on gender, family and the natural world.',
};

/** Each section has its own tint, used on its nav tab and its page header. */
export const nav = [
  { href: '/writing', label: 'Writing', tint: 'var(--pink)' },
  { href: '/research', label: 'Research', tint: 'var(--mint)' },
  { href: '/about', label: 'About', tint: 'var(--lilac)' },
  { href: '/contact', label: 'Contact', tint: 'var(--butter)' },
] as const;
