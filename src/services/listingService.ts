import type { Listing } from '../types';

const MOCK_LISTINGS: Listing[] = [
    {
        id: '1',
        title: 'Luxury Villa in Marrakech',
        description: 'A breathtaking modern villa nestled in the heart of the Palmeraie. Featuring a private infinity pool, lush gardens, and panoramic Atlas Mountain views. Every detail has been carefully crafted with premium Italian marble, handcrafted zellige tilework, and smart home automation throughout.',
        price: 12500000,
        type: 'Sale',
        property_type: 'Villa',
        city: 'Marrakech',
        address: 'Palmeraie, Route de Fès',
        bedrooms: 5,
        bathrooms: 5,
        area: 620,
        images: ['/images/modern_glass_house_1772747312955.png'],
        owner_id: 'admin',
        created_at: new Date().toISOString()
    },
    {
        id: '2',
        title: 'Modern Apartment in Casablanca Marina',
        description: 'Stunning waterfront apartment in the prestigious Casablanca Marina district. Floor-to-ceiling windows showcase sweeping Atlantic Ocean views. Features an open-plan living space, designer kitchen, and access to world-class amenities including a rooftop pool and concierge service.',
        price: 4200000,
        type: 'Sale',
        property_type: 'Apartment',
        city: 'Casablanca',
        address: 'Marina de Casablanca, Boulevard des Almohades',
        bedrooms: 3,
        bathrooms: 2,
        area: 185,
        images: ['/images/contemporary_loft_interior_1772747344222.png'],
        owner_id: 'admin',
        created_at: new Date().toISOString()
    },
    {
        id: '3',
        title: 'Traditional Riad in Marrakech Medina',
        description: 'An exquisite restored riad in the ancient Medina, blending centuries-old craftsmanship with modern luxury. Features a serene central courtyard with a marble fountain, rooftop terrace with Atlas views, private hammam, and four individually designed suites with hand-painted ceilings.',
        price: 18000,
        type: 'Rent',
        property_type: 'Riad',
        city: 'Marrakech',
        address: 'Derb Sidi Bouamar, Médina',
        bedrooms: 4,
        bathrooms: 4,
        area: 320,
        images: ['/images/luxury_mansion_exterior_1772747329285.png'],
        owner_id: 'admin',
        created_at: new Date().toISOString()
    },
    {
        id: '4',
        title: 'Sea View Apartment in Tangier',
        description: 'A sophisticated high-rise apartment overlooking the Strait of Gibraltar. Wake up to views of the Spanish coast from your private terrace. The residence includes a gourmet kitchen, spa-inspired bathroom, and access to a secured residence with pool, gym, and 24/7 concierge.',
        price: 2800000,
        type: 'Sale',
        property_type: 'Apartment',
        city: 'Tangier',
        address: 'Avenue Mohammed VI, Malabata',
        bedrooms: 3,
        bathrooms: 2,
        area: 155,
        images: ['/images/modern_glass_house_1772747312955.png'],
        owner_id: 'admin',
        created_at: new Date().toISOString()
    },
    {
        id: '5',
        title: 'Beachfront Villa in Agadir',
        description: 'A spectacular contemporary beachfront villa on the golden sands of Agadir. Designed for seamless indoor-outdoor living with retractable glass walls, heated infinity pool, and a private path to the beach. The ultimate coastal retreat with year-round sunshine.',
        price: 8900000,
        type: 'Sale',
        property_type: 'Villa',
        city: 'Agadir',
        address: 'Baie des Palmiers, Route de Taghazout',
        bedrooms: 4,
        bathrooms: 4,
        area: 450,
        images: ['/images/mediterranean_villa_evening_1772747416506.png'],
        owner_id: 'admin',
        created_at: new Date().toISOString()
    },
    {
        id: '6',
        title: 'Contemporary Villa in Rabat',
        description: 'An architectural masterpiece in the prestigious Souissi diplomatic quarter. This contemporary villa features clean lines, floor-to-ceiling glazing, and a landscaped garden with heated pool. Includes a home cinema, wine cellar, and staff quarters.',
        price: 15800000,
        type: 'Sale',
        property_type: 'Villa',
        city: 'Rabat',
        address: 'Quartier Souissi',
        bedrooms: 6,
        bathrooms: 5,
        area: 750,
        images: ['/images/hero_luxury_villa_1772747122067.png'],
        owner_id: 'admin',
        created_at: new Date().toISOString()
    },
    {
        id: '7',
        title: 'Charming Riad in Fes Medina',
        description: 'A UNESCO-protected gem in the heart of Fes el-Bali. This meticulously restored riad features original cedar wood ceilings, intricate zellige mosaics, and a tranquil garden courtyard. Five unique suites each tell a story of Moroccan artisanal heritage.',
        price: 5500000,
        type: 'Sale',
        property_type: 'Riad',
        city: 'Fes',
        address: 'Derb El Miter, Fès el-Bali',
        bedrooms: 5,
        bathrooms: 3,
        area: 380,
        images: ['/images/luxury_mansion_exterior_1772747329285.png'],
        owner_id: 'admin',
        created_at: new Date().toISOString()
    },
    {
        id: '8',
        title: 'Penthouse in Casablanca Anfa',
        description: 'The crown jewel of Anfa Place — a full-floor penthouse with 360° panoramic views of the Atlantic and the city skyline. Features a private elevator, wraparound terrace, chef\'s kitchen, and a master suite with walk-in closet and spa bathroom.',
        price: 9200000,
        type: 'Sale',
        property_type: 'Penthouse',
        city: 'Casablanca',
        address: 'Anfa Place, Boulevard de la Corniche',
        bedrooms: 4,
        bathrooms: 4,
        area: 340,
        images: ['/images/contemporary_loft_interior_1772747344222.png'],
        owner_id: 'admin',
        created_at: new Date().toISOString()
    },
    {
        id: '9',
        title: 'Oceanfront House in Essaouira',
        description: 'A whitewashed coastal gem perched on the ramparts of Essaouira with unobstructed Atlantic views. This lovingly renovated property seamlessly blends traditional Moroccan architecture with a light, airy bohemian aesthetic. Perfect as a creative retreat or boutique guesthouse.',
        price: 3800000,
        type: 'Sale',
        property_type: 'House',
        city: 'Essaouira',
        address: 'Rue de la Skala, Medina',
        bedrooms: 3,
        bathrooms: 2,
        area: 200,
        images: ['/images/scandinavian_cottage_mountain_1772747458488.png'],
        owner_id: 'admin',
        created_at: new Date().toISOString()
    },
    {
        id: '10',
        title: 'Modern Loft in Rabat Agdal',
        description: 'A stylish, light-filled loft apartment in Rabat\'s vibrant Agdal neighborhood. Open-plan living with exposed concrete, designer fixtures, and a generous sun-drenched terrace. Walking distance to boutique shops, restaurants, and the Agdal gardens.',
        price: 8500,
        type: 'Rent',
        property_type: 'Apartment',
        city: 'Rabat',
        address: 'Avenue de France, Agdal',
        bedrooms: 2,
        bathrooms: 1,
        area: 120,
        images: ['/images/hero_luxury_villa_1772747122067.png'],
        owner_id: 'admin',
        created_at: new Date().toISOString()
    },
    {
        id: '11',
        title: 'Golf Villa in Marrakech Amelkis',
        description: 'An elegant villa on the fairway of the prestigious Amelkis Golf Resort. Surrounded by manicured greens and olive groves with sweeping Atlas Mountain views. Features a private pool, outdoor dining pavilion, and a guest house.',
        price: 25000,
        type: 'Rent',
        property_type: 'Villa',
        city: 'Marrakech',
        address: 'Amelkis Golf Resort, Route de Ouarzazate',
        bedrooms: 5,
        bathrooms: 4,
        area: 500,
        images: ['/images/mediterranean_villa_evening_1772747416506.png'],
        owner_id: 'admin',
        created_at: new Date().toISOString()
    },
    {
        id: '12',
        title: 'Stylish Apartment in Tangier City Center',
        description: 'A beautifully designed apartment in the heart of Tangier, steps from the Grand Socco and the Kasbah. High ceilings, Carrara marble floors, and a balcony overlooking the bustling city life. Fully furnished with curated Moroccan contemporary art.',
        price: 12000,
        type: 'Rent',
        property_type: 'Apartment',
        city: 'Tangier',
        address: 'Rue de la Liberté, Centre Ville',
        bedrooms: 2,
        bathrooms: 2,
        area: 130,
        images: ['/images/contemporary_loft_interior_1772747344222.png'],
        owner_id: 'admin',
        created_at: new Date().toISOString()
    },
    {
        id: '13',
        title: 'Family Home in Casablanca Maarif',
        description: 'A spacious, sun-filled family home in the sought-after Maarif neighborhood. Features a private garden, modern open kitchen, double living room, and a rooftop terrace. Close to top schools, Morocco Mall, and public transport.',
        price: 3500000,
        type: 'Sale',
        property_type: 'House',
        city: 'Casablanca',
        address: 'Rue Ibnou Majid, Maarif',
        bedrooms: 4,
        bathrooms: 3,
        area: 280,
        images: ['/images/scandinavian_cottage_mountain_1772747458488.png'],
        owner_id: 'admin',
        created_at: new Date().toISOString()
    },
    {
        id: '14',
        title: 'Boutique Riad in Essaouira',
        description: 'A charming riad with just three suites, perfect for an intimate boutique guesthouse or a private holiday home. Beautifully restored with tadelakt walls, a rooftop sun deck, and a cozy salon with a fireplace. Steps from the beach.',
        price: 14000,
        type: 'Rent',
        property_type: 'Riad',
        city: 'Essaouira',
        address: 'Derb Laâlouj, Medina',
        bedrooms: 3,
        bathrooms: 3,
        area: 180,
        images: ['/images/luxury_mansion_exterior_1772747329285.png'],
        owner_id: 'admin',
        created_at: new Date().toISOString()
    },
    {
        id: '15',
        title: 'Luxury Penthouse in Agadir Bay',
        description: 'A stunning duplex penthouse with a private rooftop pool overlooking Agadir Bay. Triple-height living spaces, bespoke Italian furniture, and a chef\'s kitchen with Gaggenau appliances. The pinnacle of coastal luxury living.',
        price: 7600000,
        type: 'Sale',
        property_type: 'Penthouse',
        city: 'Agadir',
        address: 'Résidence Marina Bay, Boulevard du 20 Août',
        bedrooms: 3,
        bathrooms: 3,
        area: 290,
        images: ['/images/modern_glass_house_1772747312955.png'],
        owner_id: 'admin',
        created_at: new Date().toISOString()
    },
    {
        id: '16',
        title: 'Cozy Apartment in Fes Ville Nouvelle',
        description: 'A well-appointed apartment in the modern part of Fes, ideal for professionals or couples. Bright interiors, a fully equipped kitchen, secure parking, and a shared rooftop with panoramic views of the old city and surrounding hills.',
        price: 6500,
        type: 'Rent',
        property_type: 'Apartment',
        city: 'Fes',
        address: 'Avenue Hassan II, Ville Nouvelle',
        bedrooms: 2,
        bathrooms: 1,
        area: 95,
        images: ['/images/hero_luxury_villa_1772747122067.png'],
        owner_id: 'admin',
        created_at: new Date().toISOString()
    },
    {
        id: '17',
        title: 'Seaside Villa in Essaouira',
        description: 'An architect-designed villa just 200 meters from the beach, combining raw concrete and reclaimed wood with floor-to-ceiling ocean views. Features a heated pool, outdoor kitchen, and a meditative garden surrounded by argan trees.',
        price: 6200000,
        type: 'Sale',
        property_type: 'Villa',
        city: 'Essaouira',
        address: 'Route de Safi, Diabat',
        bedrooms: 4,
        bathrooms: 3,
        area: 350,
        images: ['/images/mediterranean_villa_evening_1772747416506.png'],
        owner_id: 'admin',
        created_at: new Date().toISOString()
    },
    {
        id: '18',
        title: 'Designer Apartment in Casablanca CFC',
        description: 'A sleek, move-in-ready apartment in Casablanca Finance City. Minimalist design with premium finishes, integrated storage, and a private balcony. Ideal for investors or executives seeking a central, high-end pied-à-terre.',
        price: 11000,
        type: 'Rent',
        property_type: 'Apartment',
        city: 'Casablanca',
        address: 'Casablanca Finance City, Anfa',
        bedrooms: 1,
        bathrooms: 1,
        area: 75,
        images: ['/images/contemporary_loft_interior_1772747344222.png'],
        owner_id: 'admin',
        created_at: new Date().toISOString()
    }
];

export const listingService = {
    async getAllListings(filters?: {
        city?: string;
        type?: 'Sale' | 'Rent';
        property_type?: string;
        minPrice?: number;
        maxPrice?: number;
        minBedrooms?: number;
    }): Promise<Listing[]> {
        await new Promise(resolve => setTimeout(resolve, 300));
        let results = [...MOCK_LISTINGS];

        if (filters?.city) {
            const q = filters.city.toLowerCase();
            results = results.filter(l =>
                l.city.toLowerCase().includes(q) ||
                l.address.toLowerCase().includes(q)
            );
        }
        if (filters?.type) {
            results = results.filter(l => l.type === filters.type);
        }
        if (filters?.property_type) {
            results = results.filter(l => l.property_type === filters.property_type);
        }
        if (filters?.minPrice !== undefined) {
            results = results.filter(l => l.price >= filters.minPrice!);
        }
        if (filters?.maxPrice !== undefined) {
            results = results.filter(l => l.price <= filters.maxPrice!);
        }
        if (filters?.minBedrooms !== undefined) {
            results = results.filter(l => l.bedrooms >= filters.minBedrooms!);
        }

        return results;
    },

    async getListingById(id: string): Promise<Listing | undefined> {
        await new Promise(resolve => setTimeout(resolve, 200));
        return MOCK_LISTINGS.find(l => l.id === id);
    }
};
