const FEEDS = [
  { name: 'ScienceDaily Paleo', rss: 'https://www.sciencedaily.com/rss/fossils_ruins/paleontology.xml', color: '#4f9cf7' },
  { name: 'ScienceDaily Anthropology', rss: 'https://www.sciencedaily.com/rss/fossils_ruins/anthropology.xml', color: '#60a5fa' },
  { name: 'Nature Paleo', rss: 'https://www.nature.com/subjects/palaeontology.rss', color: '#f472b6' },
  { name: 'Science News', rss: 'https://www.sciencenews.org/feed', color: '#a78bfa', filterRequired: true },
  { name: 'Live Science', rss: 'https://www.livescience.com/feeds/all', color: '#f87171', filterRequired: true },
  { name: 'Sci.News', rss: 'https://www.sci.news/feed', color: '#22d3ee', filterRequired: true },
  { name: 'Nautilus', rss: 'https://nautil.us/feed/', color: '#06b6d4', filterRequired: true },
  { name: 'SciTechDaily', rss: 'https://scitechdaily.com/feed/', color: '#facc15', filterRequired: true }
];

const KEYWORDS = [
  'paleontolog', 'palaeontolog', 'fossil', 'dinosaur', 'extinct',
  'prehistoric', 'jurassic', 'cretaceous', 'triassic', 'permian',
  'cambrian', 'ordovician', 'silurian', 'devonian', 'carboniferous',
  'mesozoic', 'paleozoic', 'cenozoic', 'holocene', 'pleistocene',
  'pliocene', 'miocene', 'eocene', 'oligocene', 'paleocene',
  'megafauna', 'sauropod', 'theropod', 'pterosaur', 'ichthyosaur',
  'plesiosaur', 'ammonite', 'trilobite', 'mammoth', 'mastodon',
  'tyrannosaur', 'velociraptor', 'triceratops', 'stegosaur',
  'ankylosaur', 'hadrosaurus', 'spinosaur', 'brachiosaurus',
  'excavat', 'dig site', 'bone bed',
  'anthropolog', 'ethnograph', 'archaeolog', 'ancient human',
  'neanderthal', 'denisovan', 'hominin', 'hominid', 'homo sapiens',
  'homo erectus', 'homo habilis', 'australopithecus', 'ardipithecus',
  'ancient civilization', 'stone age', 'bronze age', 'iron age',
  'stone tool', 'lithic', 'artifact', 'artefact',
  'human origin', 'human migration', 'out of africa',
  'ancient dna', 'ancient genome', 'paleogenomic',
  'burial', 'ritual', 'cave art', 'cave painting', 'petroglyph',
  'hunter-gatherer', 'forager', 'subsistence',
  'primatolog', 'primate', 'great ape',
  'ancient species', 'ancient animal', 'skeleton', 'skull'
];

const EMPTY_EMOJI = '🦕';
const EMPTY_TEXT = 'No articles found matching your criteria.';

function isRelevant(text) {
  const lower = text.toLowerCase();
  return KEYWORDS.some(kw => lower.includes(kw));
}
