export type Category = 'all' | 'toys' | 'art' | 'cards' | 'personal'

export interface ConceptProduct {
  id: string
  image: string
  category: Exclude<Category, 'all'>
  nameKey: 'wanderer' | 'rabbit' | 'cards' | 'bear'
  color: string
}

export const products: readonly ConceptProduct[] = [
  { id: 'wanderer', image: '/images/moon-wanderer-concept.jpg', category: 'toys', nameKey: 'wanderer', color: '#c9b3ef' },
  { id: 'rabbit', image: '/images/moon-rabbit-concept.jpg', category: 'art', nameKey: 'rabbit', color: '#f0c2ce' },
  { id: 'cards', image: '/images/cosmic-cards-concept.jpg', category: 'cards', nameKey: 'cards', color: '#8ac2d8' },
  { id: 'bear', image: '/images/star-bear-concept.jpg', category: 'personal', nameKey: 'bear', color: '#f2cc83' },
]
