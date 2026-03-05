export type PropertyType = 'House' | 'Apartment' | 'Villa' | 'Condo' | 'Cottage' | 'Penthouse';
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
    created_at: string;
}

export interface User {
    id: string;
    email: string;
    full_name?: string;
    avatar_url?: string;
    role: 'user' | 'admin';
}

export interface Booking {
    id: string;
    listing_id: string;
    user_id: string;
    visit_date: string;
    status: 'pending' | 'confirmed' | 'cancelled';
    created_at: string;
}

export interface Favorite {
    id: string;
    listing_id: string;
    user_id: string;
    created_at: string;
}
