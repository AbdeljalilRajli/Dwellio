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
        sender_id: string | null;
        receiver_id: string;
        property_id: string;
        content: string;
        sender_email: string;
    }) {
        const { error } = await supabase
            .from('messages')
            .insert([messageData]);

        if (error) throw error;
    },

    async getUserMessages(userId: string) {
        // Try joined query first
        const { data, error } = await supabase
            .from('messages')
            .select(`
                *,
                listings:property_id (title, images),
                sender:sender_id (full_name, email)
            `)
            .or(`receiver_id.eq.${userId},sender_id.eq.${userId}`)
            .order('created_at', { ascending: false });

        // If joined query works, return it
        if (!error && data) return data;

        // Fallback: fetch messages without joins, then enrich manually
        console.warn('Joined messages query failed, using fallback:', error?.message);
        const { data: rawMessages, error: rawError } = await supabase
            .from('messages')
            .select('*')
            .or(`receiver_id.eq.${userId},sender_id.eq.${userId}`)
            .order('created_at', { ascending: false });

        if (rawError) throw rawError;
        if (!rawMessages || rawMessages.length === 0) return [];

        // Enrich with listing and sender data
        const enriched = await Promise.all(
            rawMessages.map(async (msg: any) => {
                let listings = null;
                let sender = null;

                if (msg.property_id) {
                    const { data: listing } = await supabase
                        .from('listings')
                        .select('title, images')
                        .eq('id', msg.property_id)
                        .single();
                    listings = listing;
                }

                if (msg.sender_id) {
                    const { data: user } = await supabase
                        .from('users')
                        .select('full_name, email')
                        .eq('id', msg.sender_id)
                        .single();
                    sender = user;
                }

                return { ...msg, listings, sender };
            })
        );

        return enriched;
    },

    async deleteMessage(id: string) {
        console.log('Service: Deleting message ID', id);
        const { error } = await supabase
            .from('messages')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Service: Delete error', error);
            throw error;
        }
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
