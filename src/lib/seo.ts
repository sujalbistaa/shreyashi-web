import { person } from '../data/site';
import type { Essay } from './essays';
import { essayHref } from './essays';

export function personLd(site: URL) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': new URL('/#person', site).href,
    name: person.name,
    givenName: person.givenName,
    familyName: person.familyName,
    url: site.href,
    email: `mailto:${person.email}`,
    image: new URL('/og/default.png', site).href,
    description: person.description,
    homeLocation: { '@type': 'Place', name: person.location },
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: 'Coventry University' },
      { '@type': 'CollegeOrUniversity', name: 'Kathmandu University' },
      { '@type': 'CollegeOrUniversity', name: 'Institute of Forestry, Tribhuvan University' },
    ],
    knowsAbout: ['Human–wildlife coexistence', 'Wildlife ecology', 'Conservation governance', 'Environmental justice'],
    sameAs: [person.researchGate],
  };
}

export function articleLd(essay: Essay, site: URL) {
  const url = new URL(essayHref(essay), site).href;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: essay.data.title,
    description: essay.data.summary,
    url,
    mainEntityOfPage: url,
    image: new URL(`/og/${essay.id}.png`, site).href,
    inLanguage: 'en',
    wordCount: essay.data.words,
    timeRequired: `PT${essay.data.readingTime}M`,
    about: essay.data.theme,
    author: { '@id': new URL('/#person', site).href, '@type': 'Person', name: person.name },
    // Only claim a date once it has been confirmed.
    ...(essay.data.yearIsPlaceholder ? {} : { datePublished: String(essay.data.year) }),
  };
}
