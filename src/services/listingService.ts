import { supabase } from '../lib/supabaseClient';
import type { Listing } from '../types';

export const listingService = {
    async getAllListings(filters?: {
        city?: string;
        type?: 'Sale' | 'Rent';
        property_type?: string;
        minPrice?: number;
        maxPrice?: number;
        minBedrooms?: number;
    }): Promise<Listing[]> {
        let query = supabase.from('listings').select('*').order('created_at', { ascending: false });

        if (filters?.city && filters.city !== 'Any Location') {
            query = query.ilike('city', `%${filters.city}%`);
        }
        if (filters?.type) {
            query = query.eq('type', filters.type);
        }
        if (filters?.property_type && filters.property_type !== 'Any Type') {
            query = query.eq('property_type', filters.property_type);
        }
        if (filters?.minPrice) {
            query = query.gte('price', filters.minPrice);
        }
        if (filters?.maxPrice) {
            query = query.lte('price', filters.maxPrice);
        }
        if (filters?.minBedrooms) {
            query = query.gte('bedrooms', filters.minBedrooms);
        }

        const { data, error } = await query;
        if (error) throw error;
        return data as Listing[];
    },

    async getUserListings(userId: string): Promise<Listing[]> {
        const { data, error } = await supabase
            .from('listings')
            .select('*')
            .eq('owner_id', userId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data as Listing[];
    },

    async getListingById(id: string): Promise<Listing | null> {
        const { data, error } = await supabase
            .from('listings')
            .select('*')
            .eq('id', id)
            .single();

        if (error) return null;
        return data as Listing;
    },

    async deleteListing(id: string) {
        const { error } = await supabase
            .from('listings')
            .delete()
            .eq('id', id);

        if (error) throw error;
    },

    async submitInquiry(messageData: {
        sender_id: string;
        receiver_id: string;
        property_id: string;
        content: string;
    }) {
        const { error } = await supabase
            .from('messages')
            .insert([messageData]);

        if (error) throw error;
    },

    async getUserMessages(userId: string) {
        const { data, error } = await supabase
            .from('messages')
            .select(`
                *,
                listings (title, images),
                sender: sender_id (full_name, email)
            `)
            .or(`receiver_id.eq.${userId},sender_id.eq.${userId}`)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    async uploadImages(files: File[], userId: string): Promise<string[]> {
        const uploadPromises = files.map(async (file) => {
            const fileName = `${userId}/${Date.now()}-${file.name}`;
            const { error } = await supabase.storage
                .from('property-images')
                .upload(fileName, file);

            if (error) throw error;

            const { data } = supabase.storage
                .from('property-images')
                .getPublicUrl(fileName);

            return data.publicUrl;
        });

        return Promise.all(uploadPromises);
    }
};
