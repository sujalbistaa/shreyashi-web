/**
 * Publications: the union of ./context/PApers.docx and the CV.
 * Author lists, volumes and years for DOIs were checked against Crossref.
 */
export type Publication = {
  year: number | null;
  status?: 'Under review';
  title: string;
  /** Titles may contain <i> for species names. */
  authors?: string;
  venue?: string;
  details?: string;
  role: 'First and corresponding author' | 'Sole author' | 'Co-author';
  href?: string;
  linkLabel?: string;
};

export const publications: Publication[] = [
  {
    year: 2026,
    title: 'Ecological and social dimensions of human–bear coexistence in Nepal’s Gaurishankar Conservation Area',
    authors: '<b>Bista, S.</b>, Raut, N., Neupane, S. S., Odden, M., & Chetri, M.',
    venue: 'Ecology and Evolution',
    details: '16(6), e73776',
    role: 'First and corresponding author',
    href: 'https://doi.org/10.1002/ece3.73776',
    linkLabel: 'doi:10.1002/ece3.73776',
  },
  {
    year: null,
    status: 'Under review',
    title: 'Can compensation care? A care ethics analysis of Nepal’s wildlife damage relief guidelines: A case study of Shuklaphanta National Park',
    authors: '<b>Bista, S.</b>',
    role: 'Sole author',
  },
  {
    year: 2023,
    title: 'Factors affecting the occupancy of Chinese pangolins (<i>Manis pentadactyla</i>) suggest a highly specialized ecological niche',
    authors:
      'Dhami, B., Neupane, B., Devkota, B. P., Maraseni, T., Sadadev, B. M., <b>Bista, S.</b>, Adhikari, A., Chhetri, N. B., Panta, M., & Stewart, A. B.',
    venue: 'Ecosphere',
    details: '14(1), e4356',
    role: 'Co-author',
    href: 'https://doi.org/10.1002/ecs2.4356',
    linkLabel: 'doi:10.1002/ecs2.4356',
  },
  {
    year: 2022,
    title: 'Ecological factors determining barking deer distribution and habitat use in the mid-hills of Nepal',
    authors:
      'Neupane, B., Dhami, B., <b>Bista, S.</b>, Sadadev, B. M., Regmi, S., Shrestha, S., Shrestha, B., Traxmandlová, I., Varachova, S., & Kindlmann, P.',
    venue: 'Frontiers in Ecology and Evolution',
    details: '10, 894369',
    role: 'Co-author',
    href: 'https://doi.org/10.3389/fevo.2022.894369',
    linkLabel: 'doi:10.3389/fevo.2022.894369',
  },
  {
    // Not indexed by Crossref; year, venue and authors still to be confirmed.
    year: null,
    title: 'Exploring distributional evidences and threats to initiate conservation of Great Hornbill (<i>Buceros bicornis</i>) in Nepal',
    role: 'Co-author',
    href: 'https://www.researchgate.net/publication/342378440_Exploring_Distributional_Evidences_and_Threats_to_Initiate_Conservation_of_Great_Hornbill_Buceros_bicornis_In_Nepal',
    linkLabel: 'ResearchGate',
  },
];

export const interests = [
  'Human–wildlife conflict and coexistence',
  'Large carnivore ecology and conservation',
  'Human–tiger coexistence',
  'Spatial ecology',
  'Conservation social science',
  'Conservation governance',
  'Environmental justice',
  'Political ecology',
];

export const dissertations = [
  {
    years: '2025–26',
    degree: 'MSc Sustainability and Environmental Management, Coventry University',
    title: 'Can Compensation Care? A Care Ethics Analysis of Nepal’s Wildlife Damage Relief Guidelines: A Case Study of Shuklaphanta National Park',
    note: 'Awarded Distinction',
  },
  {
    years: '2022–24',
    degree: 'MSc Environmental Science, Kathmandu University',
    title: 'Distribution of Asiatic Black Bear (<i>Ursus thibetanus</i>) and its conflict with humans in Gaurishankar Conservation Area, Nepal',
  },
  {
    years: '2017–21',
    degree: 'BSc Forestry, Institute of Forestry, Tribhuvan University',
    title: 'Distribution of invasive alien plant species and their influence on mammals’ habitat selection in Shuklaphanta National Park, Nepal',
  },
];

export const presentations = [
  {
    year: '2026',
    event: 'Student Conference on Conservation Science, University of Cambridge',
    kind: 'Poster',
    title: 'Distribution of Asiatic Black Bear, <i>Ursus thibetanus</i> and its conflict with humans in Gaurishankar Conservation Area, Nepal',
  },
  {
    year: '2024',
    event: 'Youth and Climate Symposium, British Council',
    kind: 'Presentation',
    title: 'A community-based project on women’s leadership and sustainable climate adaptation',
  },
  {
    year: '2022',
    event: 'Student Conference on Conservation Science, New York',
    kind: 'Poster',
    title: 'Invasive alien plant species and their influence on mammal habitat selection',
  },
];
