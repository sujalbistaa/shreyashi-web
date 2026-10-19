/** Transcribed from ./context/Shreyashi_Bista_CV.pdf. Keep in step with the PDF in /public/cv. */

export type CvEntry = {
  when: string;
  title: string;
  org?: string;
  body?: string;
};

export type CvSection = { id: string; title: string; entries: CvEntry[] };

export const cv: CvSection[] = [
  {
    id: 'education',
    title: 'Education',
    entries: [
      {
        when: '2025–2026',
        title: 'MSc Sustainability and Environmental Management',
        org: 'Coventry University, United Kingdom',
        body: 'Academic requirements completed; formal graduation pending. Dissertation: <i>Can Compensation Care? A Care Ethics Analysis of Nepal’s Wildlife Damage Relief Guidelines: A Case Study of Shuklaphanta National Park.</i> Dissertation awarded Distinction.',
      },
      {
        when: '2022–2024',
        title: 'MSc Environmental Science (Wildlife Ecology and Management)',
        org: 'Kathmandu University, Nepal',
        body: 'GPA 3.68/4.00. Dissertation: <i>Distribution of Asiatic Black Bear (Ursus thibetanus) and its conflict with humans in Gaurishankar Conservation Area, Nepal.</i>',
      },
      {
        when: '2017–2021',
        title: 'BSc Forestry',
        org: 'Institute of Forestry, Tribhuvan University, Nepal',
        body: 'Overall 76.45%. Dissertation: <i>Distribution of invasive alien plant species and their influence on mammals’ habitat selection in Shuklaphanta National Park, Nepal.</i>',
      },
    ],
  },
  {
    id: 'experience',
    title: 'Research and policy experience',
    entries: [
      {
        when: 'Jul 2024 – Aug 2025',
        title: 'Research Assistant, NBSAP Revision',
        org: 'UNDP Nepal',
        body: 'Supported development of the Global Biodiversity Framework target on human–wildlife conflict and integration of Gender Equality and Social Inclusion (GESI) into Nepal’s NBSAP.',
      },
      {
        when: 'Aug – Oct 2024',
        title: 'Research Assistant (Consultant), Human–Tiger Conflict Project',
        org: 'WWF Nepal',
        body: 'Conducted household surveys, focus group discussions and key informant interviews; supported community-level social data collection and analysis for a GESI Strategy and Action Plan.',
      },
      {
        when: 'Mar – May 2024',
        title: 'Consultant, Youth and Climate Project',
        org: 'British Council Nepal',
        body: 'Led a community-based project on women’s leadership and sustainable climate adaptation with the Badi community in Kanchanpur District.',
      },
      {
        when: 'Feb – Jun 2021',
        title: 'Intern',
        org: 'Shuklaphanta National Park',
        body: 'Participated in human–wildlife conflict field visits, wildlife patrols, conservation awareness, data analysis and registration of wildlife-damage compensation claims.',
      },
    ],
  },
  {
    id: 'funding',
    title: 'Research funding, scholarships and awards',
    entries: [
      { when: '2023', title: 'IDEA WILD Equipment Grant', body: 'Field equipment support for wildlife ecology and conservation research.' },
      { when: '2022', title: 'Rufford Small Grant', body: 'Research funding for Asiatic black bear distribution and human–bear coexistence in Gaurishankar Conservation Area, Nepal.' },
      { when: '2022', title: 'WWF-Nepal Memorial Grant', body: 'Scholarship support for MSc study in Environmental Science at Kathmandu University.' },
      { when: '2022', title: 'NORPART Scholarship', body: 'Fully funded Master’s exchange at Inland Norway University of Applied Sciences, Norway.' },
    ],
  },
  {
    id: 'training',
    title: 'Selected training and professional development',
    entries: [
      { when: '2024/2025', title: 'WomenDior & UNESCO Paris Mentorship Program' },
      {
        when: '2023',
        title: 'Collective Reflective Learning for Social Inclusion in Nepal’s Community-Based Natural Resource Management',
        org: 'IWMI Nepal, University of Edinburgh and Gender at Work',
      },
      { when: '2019', title: 'Wildlife Research Techniques Training', org: 'Friends of Nature, Nepal', body: '19 days.' },
      {
        when: '',
        title: '6th Annual Field Course in Conservation Biology & Global Health: At the Human–Environment Interface',
        org: 'Nepal Engineering College with the University of Washington, Seattle, USA',
      },
    ],
  },
  {
    id: 'engagement',
    title: 'Additional professional and public engagement',
    entries: [
      {
        when: '2025 – present',
        title: 'Editorial Team Member',
        org: 'GlobalNYT, Denmark',
        body: 'Contributes environmental and sustainability writing for an international editorial platform.',
      },
      {
        when: 'May – Oct 2023',
        title: 'Website Content Management Assistant, Food Green City Project',
        org: 'UNDP Nepal',
        body: 'Supported digital engagement of 16 municipalities in monitoring and reporting Food Green City progress.',
      },
      {
        when: 'Jun – Sep 2022',
        title: 'Communication Support',
        org: 'RECOFTC Nepal',
        body: 'Supported training, reporting and communication materials for gender advocacy in Nepal’s forestry sector.',
      },
    ],
  },
];

export const methods = [
  {
    title: 'Ecological and spatial methods',
    body: 'Wildlife field surveys; habitat assessment; ecological data collection and analysis; GIS and spatial analysis; biodiversity monitoring; field research techniques.',
  },
  {
    title: 'Social and qualitative methods',
    body: 'Household questionnaires; focus group discussions; key informant interviews; community engagement; participatory fieldwork; human–wildlife conflict research.',
  },
  {
    title: 'Policy and governance',
    body: 'Policy and document analysis; biodiversity-policy implementation and monitoring; conservation governance; GESI integration.',
  },
];
