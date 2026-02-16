export type Category =
  | "science"
  | "history"
  | "people"
  | "geography"
  | "art"
  | "technology"
  | "space"
  | "biology"
  | "all";

export interface ArticleEntry {
  title: string;
  category: Category;
  difficulty: "easy" | "medium" | "hard";
}

export const CATEGORY_LABELS: Record<Exclude<Category, "all">, { label: string; emoji: string }> = {
  science: { label: "Science", emoji: "🔬" },
  history: { label: "History", emoji: "📜" },
  people: { label: "People", emoji: "👤" },
  geography: { label: "Geography", emoji: "🌍" },
  art: { label: "Art & Culture", emoji: "🎨" },
  technology: { label: "Technology", emoji: "💻" },
  space: { label: "Space", emoji: "🚀" },
  biology: { label: "Biology", emoji: "🧬" },
};

export const ARTICLES: ArticleEntry[] = [
  // Science
  { title: "Photosynthesis", category: "science", difficulty: "medium" },
  { title: "DNA", category: "science", difficulty: "easy" },
  { title: "Quantum mechanics", category: "science", difficulty: "hard" },
  { title: "Evolution", category: "science", difficulty: "easy" },
  { title: "Plate tectonics", category: "science", difficulty: "medium" },
  { title: "Periodic table", category: "science", difficulty: "easy" },
  { title: "Gravity", category: "science", difficulty: "easy" },
  { title: "Electricity", category: "science", difficulty: "easy" },
  { title: "Magnetic field", category: "science", difficulty: "medium" },
  { title: "Magnetism", category: "science", difficulty: "medium" },
  { title: "Entropy", category: "science", difficulty: "hard" },
  { title: "Catalyst", category: "science", difficulty: "medium" },
  { title: "Osmosis", category: "science", difficulty: "medium" },
  { title: "Photon", category: "science", difficulty: "hard" },
  { title: "Climate change", category: "science", difficulty: "easy" },
  { title: "Pangaea", category: "science", difficulty: "medium" },
  { title: "Earthquake", category: "science", difficulty: "easy" },
  { title: "Volcano", category: "science", difficulty: "easy" },
  { title: "Tornado", category: "science", difficulty: "medium" },
  { title: "Tsunami", category: "science", difficulty: "medium" },

  // History
  { title: "Roman Empire", category: "history", difficulty: "easy" },
  { title: "French Revolution", category: "history", difficulty: "medium" },
  { title: "World War II", category: "history", difficulty: "easy" },
  { title: "Renaissance", category: "history", difficulty: "medium" },
  { title: "Ancient Egypt", category: "history", difficulty: "easy" },
  { title: "Industrial Revolution", category: "history", difficulty: "medium" },
  { title: "Cold War", category: "history", difficulty: "easy" },
  { title: "Viking Age", category: "history", difficulty: "medium" },
  { title: "Silk Road", category: "history", difficulty: "medium" },
  { title: "Byzantine Empire", category: "history", difficulty: "hard" },
  { title: "Spanish Inquisition", category: "history", difficulty: "hard" },
  { title: "Ottoman Empire", category: "history", difficulty: "medium" },
  { title: "Aztec Empire", category: "history", difficulty: "medium" },
  { title: "Inca Empire", category: "history", difficulty: "medium" },
  { title: "Mongol Empire", category: "history", difficulty: "medium" },
  { title: "Persian Empire", category: "history", difficulty: "hard" },
  { title: "Ming dynasty", category: "history", difficulty: "hard" },
  { title: "Tang dynasty", category: "history", difficulty: "hard" },
  { title: "Han dynasty", category: "history", difficulty: "hard" },
  { title: "Pompeii", category: "history", difficulty: "medium" },
  { title: "Democracy", category: "history", difficulty: "easy" },
  { title: "Moon landing", category: "history", difficulty: "easy" },
  { title: "Titanic", category: "history", difficulty: "easy" },
  { title: "Samurai", category: "history", difficulty: "medium" },
  { title: "Carthage", category: "history", difficulty: "hard" },
  { title: "Phoenicia", category: "history", difficulty: "hard" },
  { title: "Sumer", category: "history", difficulty: "hard" },
  { title: "Babylon", category: "history", difficulty: "hard" },
  { title: "Assyria", category: "history", difficulty: "hard" },
  { title: "Hittites", category: "history", difficulty: "hard" },

  // People
  { title: "Albert Einstein", category: "people", difficulty: "easy" },
  { title: "Leonardo da Vinci", category: "people", difficulty: "easy" },
  { title: "William Shakespeare", category: "people", difficulty: "easy" },
  { title: "Marie Curie", category: "people", difficulty: "easy" },
  { title: "Nikola Tesla", category: "people", difficulty: "easy" },
  { title: "Charles Darwin", category: "people", difficulty: "easy" },
  { title: "Isaac Newton", category: "people", difficulty: "easy" },
  { title: "Cleopatra", category: "people", difficulty: "medium" },
  { title: "Galileo Galilei", category: "people", difficulty: "medium" },
  { title: "Genghis Khan", category: "people", difficulty: "medium" },
  { title: "Napoleon", category: "people", difficulty: "easy" },
  { title: "Alexander the Great", category: "people", difficulty: "medium" },
  { title: "Sigmund Freud", category: "people", difficulty: "medium" },
  { title: "Pablo Picasso", category: "people", difficulty: "easy" },
  { title: "Frida Kahlo", category: "people", difficulty: "medium" },
  { title: "Plato", category: "people", difficulty: "medium" },
  { title: "Aristotle", category: "people", difficulty: "medium" },
  { title: "Martin Luther King Jr.", category: "people", difficulty: "easy" },
  { title: "Stephen Hawking", category: "people", difficulty: "easy" },
  { title: "Alan Turing", category: "people", difficulty: "medium" },
  { title: "Ada Lovelace", category: "people", difficulty: "medium" },
  { title: "Nelson Mandela", category: "people", difficulty: "easy" },
  { title: "Archimedes", category: "people", difficulty: "medium" },
  { title: "Florence Nightingale", category: "people", difficulty: "medium" },
  { title: "Mozart", category: "people", difficulty: "easy" },
  { title: "Beethoven", category: "people", difficulty: "easy" },
  { title: "Hippocrates", category: "people", difficulty: "hard" },
  { title: "Confucius", category: "people", difficulty: "medium" },
  { title: "Pythagoras", category: "people", difficulty: "medium" },
  { title: "Socrates", category: "people", difficulty: "medium" },
  { title: "Copernicus", category: "people", difficulty: "hard" },
  { title: "Rosa Parks", category: "people", difficulty: "easy" },
  { title: "Amelia Earhart", category: "people", difficulty: "medium" },
  { title: "Rosalind Franklin", category: "people", difficulty: "hard" },
  { title: "Jane Goodall", category: "people", difficulty: "medium" },
  { title: "Wright brothers", category: "people", difficulty: "medium" },
  { title: "Marco Polo", category: "people", difficulty: "medium" },
  { title: "Christopher Columbus", category: "people", difficulty: "easy" },
  { title: "James Cook", category: "people", difficulty: "hard" },
  { title: "Euclid", category: "people", difficulty: "hard" },
  { title: "Descartes", category: "people", difficulty: "hard" },

  // Geography
  { title: "Amazon rainforest", category: "geography", difficulty: "easy" },
  { title: "Great Wall of China", category: "geography", difficulty: "easy" },
  { title: "Coral reef", category: "geography", difficulty: "medium" },
  { title: "Amazon River", category: "geography", difficulty: "easy" },
  { title: "Taj Mahal", category: "geography", difficulty: "easy" },
  { title: "Great Barrier Reef", category: "geography", difficulty: "easy" },
  { title: "Sahara", category: "geography", difficulty: "easy" },
  { title: "Mount Everest", category: "geography", difficulty: "easy" },
  { title: "Machu Picchu", category: "geography", difficulty: "medium" },
  { title: "Glacier", category: "geography", difficulty: "medium" },
  { title: "Rainforest", category: "geography", difficulty: "easy" },
  { title: "Parthenon", category: "geography", difficulty: "medium" },
  { title: "Stonehenge", category: "geography", difficulty: "medium" },
  { title: "Colosseum", category: "geography", difficulty: "easy" },
  { title: "Versailles", category: "geography", difficulty: "medium" },
  { title: "Angkor Wat", category: "geography", difficulty: "hard" },
  { title: "Chichen Itza", category: "geography", difficulty: "hard" },
  { title: "Petra", category: "geography", difficulty: "hard" },
  { title: "Hagia Sophia", category: "geography", difficulty: "hard" },
  { title: "Alhambra", category: "geography", difficulty: "hard" },
  { title: "Notre-Dame de Paris", category: "geography", difficulty: "medium" },
  { title: "Kremlin", category: "geography", difficulty: "medium" },
  { title: "Forbidden City", category: "geography", difficulty: "medium" },
  { title: "Eiffel Tower", category: "geography", difficulty: "easy" },
  { title: "Buckingham Palace", category: "geography", difficulty: "easy" },
  { title: "Tower of London", category: "geography", difficulty: "medium" },
  { title: "Pyramids of Giza", category: "geography", difficulty: "easy" },
  { title: "Great Sphinx of Giza", category: "geography", difficulty: "medium" },
  { title: "Great Pyramid of Giza", category: "geography", difficulty: "medium" },
  { title: "Sistine Chapel", category: "geography", difficulty: "medium" },
  { title: "Acropolis of Athens", category: "geography", difficulty: "hard" },

  // Art & Culture
  { title: "Impressionism", category: "art", difficulty: "medium" },
  { title: "Cubism", category: "art", difficulty: "medium" },
  { title: "Surrealism", category: "art", difficulty: "medium" },
  { title: "Baroque", category: "art", difficulty: "hard" },
  { title: "Gothic architecture", category: "art", difficulty: "medium" },
  { title: "Art Nouveau", category: "art", difficulty: "hard" },
  { title: "Romanticism", category: "art", difficulty: "hard" },
  { title: "Neoclassicism", category: "art", difficulty: "hard" },
  { title: "Expressionism", category: "art", difficulty: "hard" },
  { title: "Dadaism", category: "art", difficulty: "hard" },
  { title: "Futurism", category: "art", difficulty: "hard" },
  { title: "Minimalism", category: "art", difficulty: "medium" },
  { title: "Bauhaus", category: "art", difficulty: "hard" },
  { title: "Pop art", category: "art", difficulty: "medium" },
  { title: "Abstract expressionism", category: "art", difficulty: "hard" },
  { title: "Mona Lisa", category: "art", difficulty: "easy" },
  { title: "Olympic Games", category: "art", difficulty: "easy" },
  { title: "Conceptual art", category: "art", difficulty: "hard" },
  { title: "Rosetta Stone", category: "art", difficulty: "medium" },
  { title: "Dead Sea Scrolls", category: "art", difficulty: "hard" },
  { title: "Terracotta Army", category: "art", difficulty: "medium" },

  // Technology
  { title: "Artificial intelligence", category: "technology", difficulty: "easy" },
  { title: "Internet", category: "technology", difficulty: "easy" },
  { title: "Telescope", category: "technology", difficulty: "medium" },
  { title: "Hubble Space Telescope", category: "technology", difficulty: "medium" },
  { title: "Vaccination", category: "technology", difficulty: "medium" },
  { title: "Antibiotics", category: "technology", difficulty: "medium" },

  // Space
  { title: "Solar System", category: "space", difficulty: "easy" },
  { title: "Black hole", category: "space", difficulty: "easy" },
  { title: "Mars", category: "space", difficulty: "easy" },
  { title: "Saturn", category: "space", difficulty: "easy" },
  { title: "Jupiter", category: "space", difficulty: "easy" },
  { title: "Neptune", category: "space", difficulty: "medium" },
  { title: "Mercury (planet)", category: "space", difficulty: "medium" },
  { title: "Venus", category: "space", difficulty: "medium" },
  { title: "Uranus", category: "space", difficulty: "medium" },
  { title: "Pluto", category: "space", difficulty: "easy" },
  { title: "Supernova", category: "space", difficulty: "medium" },
  { title: "Northern Lights", category: "space", difficulty: "easy" },
  { title: "Aurora borealis", category: "space", difficulty: "medium" },
  { title: "Neutron star", category: "space", difficulty: "hard" },
  { title: "Asteroid", category: "space", difficulty: "medium" },
  { title: "Comet", category: "space", difficulty: "medium" },
  { title: "Galaxy", category: "space", difficulty: "easy" },
  { title: "Nebula", category: "space", difficulty: "medium" },
  { title: "Pulsar", category: "space", difficulty: "hard" },
  { title: "Quasar", category: "space", difficulty: "hard" },
  { title: "Exoplanet", category: "space", difficulty: "hard" },
  { title: "Dwarf planet", category: "space", difficulty: "medium" },
  { title: "Constellation", category: "space", difficulty: "medium" },
  { title: "Dark matter", category: "space", difficulty: "hard" },
  { title: "Dark energy", category: "space", difficulty: "hard" },
  { title: "Antimatter", category: "space", difficulty: "hard" },
  { title: "Gravitational wave", category: "space", difficulty: "hard" },
  { title: "Orbit", category: "space", difficulty: "medium" },
  { title: "Solar wind", category: "space", difficulty: "hard" },
  { title: "Cosmic ray", category: "space", difficulty: "hard" },
  { title: "Redshift", category: "space", difficulty: "hard" },
  { title: "Meteor", category: "space", difficulty: "medium" },

  // Biology
  { title: "Human brain", category: "biology", difficulty: "easy" },
  { title: "Immune system", category: "biology", difficulty: "medium" },
  { title: "Mitochondrion", category: "biology", difficulty: "hard" },
  { title: "Dinosaur", category: "biology", difficulty: "easy" },
  { title: "Bacteria", category: "biology", difficulty: "medium" },
  { title: "Biodiversity", category: "biology", difficulty: "medium" },
  { title: "Chromosome", category: "biology", difficulty: "medium" },
  { title: "Ecosystem", category: "biology", difficulty: "medium" },
  { title: "Symbiosis", category: "biology", difficulty: "hard" },
  { title: "Metamorphosis", category: "biology", difficulty: "medium" },
  { title: "Migration", category: "biology", difficulty: "medium" },
  { title: "Tuberculosis", category: "biology", difficulty: "hard" },
  { title: "Enzyme", category: "biology", difficulty: "hard" },
  { title: "Protein", category: "biology", difficulty: "medium" },
  { title: "Genome", category: "biology", difficulty: "medium" },
  { title: "Virus", category: "biology", difficulty: "easy" },
  { title: "Hormone", category: "biology", difficulty: "medium" },
  { title: "Neuron", category: "biology", difficulty: "medium" },
  { title: "Ribosome", category: "biology", difficulty: "hard" },
  { title: "Mitosis", category: "biology", difficulty: "hard" },
  { title: "Meiosis", category: "biology", difficulty: "hard" },
  { title: "Chloroplast", category: "biology", difficulty: "hard" },
  { title: "Cytoplasm", category: "biology", difficulty: "hard" },
  { title: "Cell membrane", category: "biology", difficulty: "hard" },
  { title: "Nucleus (cell)", category: "biology", difficulty: "hard" },
  { title: "Endoplasmic reticulum", category: "biology", difficulty: "hard" },
  { title: "Golgi apparatus", category: "biology", difficulty: "hard" },
  { title: "Lysosome", category: "biology", difficulty: "hard" },
];

// Flat pool for daily puzzle indexing
export const ARTICLE_POOL = ARTICLES.map((a) => a.title);

// Start date for puzzle numbering - Day 1
export const START_DATE = new Date("2025-01-01T00:00:00Z");

export function getPuzzleNumber(): number {
  const now = new Date();
  const diffMs = now.getTime() - START_DATE.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return diffDays + 1;
}

export function getArticleTitleForPuzzle(puzzleNumber: number): string {
  const index = (puzzleNumber - 1) % ARTICLE_POOL.length;
  return ARTICLE_POOL[index];
}

export function getArticlesByCategory(category: Category): ArticleEntry[] {
  if (category === "all") return ARTICLES;
  return ARTICLES.filter((a) => a.category === category);
}

export function getRandomArticle(
  category: Category = "all",
  difficulty?: "easy" | "medium" | "hard"
): ArticleEntry {
  let pool = getArticlesByCategory(category);
  if (difficulty) {
    pool = pool.filter((a) => a.difficulty === difficulty);
  }
  if (pool.length === 0) pool = ARTICLES;
  return pool[Math.floor(Math.random() * pool.length)];
}
