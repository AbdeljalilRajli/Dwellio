import type { Listing } from '../types';

const MOCK_LISTINGS: Listing[] = [
    {
        id: '1',
        title: 'Modern Minimalist Villa',
        description: 'A stunning modern minimalist house featuring floor-to-ceiling windows and breathtaking city views. This property boasts a gourmet kitchen, expansive living areas, and a private terrace perfect for entertaining.',
        price: 2500000,
        type: 'Sale',
        property_type: 'House',
        city: 'San Francisco',
        address: '123 Market St',
        bedrooms: 4,
        bathrooms: 3,
        area: 2500,
        images: [
            '/images/modern_glass_house_1772747312955.png'
        ],
        owner_id: 'admin',
        created_at: new Date().toISOString()
    },
    {
        id: '2',
        title: 'Sunset Luxury Estate',
        description: 'An elegant luxury villa nestled in the prestigious hills of Beverly. This retreat offers unmatched privacy, a resort-style pool, and exquisite architectural details throughout its spacious interior.',
        price: 850000,
        type: 'Rent',
        property_type: 'Villa',
        city: 'Beverly Hills',
        address: '90210 Sunset Blvd',
        bedrooms: 2,
        bathrooms: 2,
        area: 1200,
        images: [
            '/images/luxury_mansion_exterior_1772747329285.png'
        ],
        owner_id: 'admin',
        created_at: new Date().toISOString()
    },
    {
        id: '3',
        title: 'Palo Alto Smart Home',
        description: 'Sophisticated smart home designed for the ultimate tech-driven lifestyle. Featuring integrated automation, energy-efficient systems, and sleek contemporary finishes in a quiet, tree-lined neighborhood.',
        price: 3700000,
        type: 'Sale',
        property_type: 'House',
        city: 'Palo Alto',
        address: '456 University Ave',
        bedrooms: 4,
        bathrooms: 4,
        area: 3200,
        images: [
            '/images/hero_luxury_villa_1772747122067.png'
        ],
        owner_id: 'admin',
        created_at: new Date().toISOString()
    },
    {
        id: '4',
        title: 'Mediterranean Evening Villa',
        description: 'Exquisite mediterranean villa offering a blend of classic charm and modern luxury. Features a stunning infinity pool, manicured gardens, and panoramic ocean views.',
        price: 4200000,
        type: 'Sale',
        property_type: 'Villa',
        city: 'Malibu',
        address: '789 Coast Hwy',
        bedrooms: 5,
        bathrooms: 6,
        area: 4500,
        images: [
            '/images/mediterranean_villa_evening_1772747416506.png'
        ],
        owner_id: 'admin',
        created_at: new Date().toISOString()
    },
    {
        id: '5',
        title: 'Scandinavian Mountain Retreat',
        description: 'A cozy yet ultra-modern mountain retreat. Perfect for those seeking tranquility and adventure in a high-end architectural masterpiece.',
        price: 1500000,
        type: 'Sale',
        property_type: 'Cottage',
        city: 'Aspen',
        address: '101 Alpine Way',
        bedrooms: 3,
        bathrooms: 2,
        area: 1800,
        images: [
            '/images/scandinavian_cottage_mountain_1772747458488.png'
        ],
        owner_id: 'admin',
        created_at: new Date().toISOString()
    },
    {
        id: '6',
        title: 'Contemporary City Loft',
        description: 'Premium living in the heart of the city. High ceilings, industrial-chic design, and luxury finishes make this the ultimate urban sanctuary.',
        price: 1200000,
        type: 'Sale',
        property_type: 'Apartment',
        city: 'New York',
        address: '55 5th Ave',
        bedrooms: 2,
        bathrooms: 2,
        area: 1500,
        images: [
            '/images/contemporary_loft_interior_1772747344222.png'
        ],
        owner_id: 'admin',
        created_at: new Date().toISOString()
    }
];

export const listingService = {
    async getAllListings(): Promise<Listing[]> {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return MOCK_LISTINGS;
    },

    async getListingById(id: string): Promise<Listing | undefined> {
        await new Promise(resolve => setTimeout(resolve, 300));
        return MOCK_LISTINGS.find(l => l.id === id);
    }
};
