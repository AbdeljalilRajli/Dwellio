export type PropertyType = 'Villa' | 'Apartment' | 'House' | 'Penthouse' | 'Riad';
export type ListingType = 'Rent' | 'Sale';

export interface Listing {
    id: string;
    title: string;
    description: string;
    price: number;
    type: ListingType;
    property_type: PropertyType;
    city: string;
    address: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
    images: string[];
    owner_id: string;
    owner_phone?: string;
    latitude?: number;
    longitude?: number;
    amenities: string[];
    created_at: string;
}

export interface Message {
    id: string;
    sender_id: string;
    receiver_id: string;
    property_id: string;
    content: string;
    created_at: string;
    listings?: {
        title: string;
        images: string[];
    };
    sender?: {
        full_name: string;
        email: string;
    };
}

export interface User {
    id: string;
    email: string;
    full_name?: string;
    avatar_url?: string;
    role: 'user' | 'admin';
}

export interface Favorite {
    id: string;
    listing_id: string;
    user_id: string;
    created_at: string;
}
