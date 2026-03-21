-- Real Estate Marketplace Transition SQL

-- 1. Add owner_id to listings (Safe check)
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='listings' AND column_name='owner_id') THEN
        ALTER TABLE listings ADD COLUMN owner_id UUID REFERENCES auth.users(id) DEFAULT auth.uid();
    END IF;
END $$;

-- Update existing listings to belong to current user (for testing) or leave as null
-- UPDATE listings SET owner_id = auth.uid() WHERE owner_id IS NULL;

-- 2. Create messages table
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id UUID REFERENCES auth.users(id) NOT NULL,
    receiver_id UUID REFERENCES auth.users(id) NOT NULL,
    property_id UUID REFERENCES listings(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Row Level Security (RLS)

-- Listings Security
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;

-- Anyone can view listings
DROP POLICY IF EXISTS "Anyone can view listings" ON listings;
CREATE POLICY "Anyone can view listings" ON listings
    FOR SELECT USING (true);

-- Authenticated users can create listings
DROP POLICY IF EXISTS "Users can create listings" ON listings;
CREATE POLICY "Users can create listings" ON listings
    FOR INSERT WITH CHECK (auth.uid() = owner_id);

-- Only owners can update their listings
DROP POLICY IF EXISTS "Owners can update their listings" ON listings;
CREATE POLICY "Owners can update their listings" ON listings
    FOR UPDATE USING (auth.uid() = owner_id);

-- Only owners can delete their listings
DROP POLICY IF EXISTS "Owners can delete their listings" ON listings;
CREATE POLICY "Owners can delete their listings" ON listings
    FOR DELETE USING (auth.uid() = owner_id);

-- Messages Security
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Users can see messages they sent or received
DROP POLICY IF EXISTS "Users can see their own messages" ON messages;
CREATE POLICY "Users can see their own messages" ON messages
    FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

-- Anyone can send a message
DROP POLICY IF EXISTS "Anyone can send a message" ON messages;
CREATE POLICY "Anyone can send a message" ON messages
    FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- Users can delete their own messages
DROP POLICY IF EXISTS "Users can delete their own messages" ON messages;
CREATE POLICY "Users can delete their own messages" ON messages
    FOR DELETE USING (auth.uid() = sender_id OR auth.uid() = receiver_id);
-- Users Table Security (Profiles)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Anyone can view user profiles (required for property details to show owner info)
DROP POLICY IF EXISTS "Anyone can view user profiles" ON users;
CREATE POLICY "Anyone can view user profiles" ON users
    FOR SELECT USING (true);

-- Authenticated users can create their own profile
DROP POLICY IF EXISTS "Users can create their own profile" ON users;
CREATE POLICY "Users can create their own profile" ON users
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Users can update their own profile
DROP POLICY IF EXISTS "Users can update their own profile" ON users;
CREATE POLICY "Users can update their own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- 4. Create Storage Bucket for Property Images
-- Run this if you have permissions, otherwise create via dashboard
INSERT INTO storage.buckets (id, name, public) 
VALUES ('property-images', 'property-images', true)
ON CONFLICT (id) DO NOTHING;

-- Set up Storage Policies
-- Allow anyone to view images
DROP POLICY IF EXISTS "Anyone can view property images" ON storage.objects;
CREATE POLICY "Anyone can view property images" ON storage.objects
    FOR SELECT USING (bucket_id = 'property-images');

-- Allow authenticated users to upload images
DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
CREATE POLICY "Authenticated users can upload images" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'property-images' 
        AND auth.role() = 'authenticated'
    );

-- Allow owners to delete their images
DROP POLICY IF EXISTS "Owners can delete their images" ON storage.objects;
CREATE POLICY "Owners can delete their images" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'property-images' 
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

-- 5. Create favorites table
CREATE TABLE IF NOT EXISTS favorites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    listing_id UUID REFERENCES listings(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, listing_id)
);

-- Favorites Security
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- Users can see their own favorites
DROP POLICY IF EXISTS "Users can see their own favorites" ON favorites;
CREATE POLICY "Users can see their own favorites" ON favorites
    FOR SELECT USING (auth.uid() = user_id);

-- Users can add favorites for themselves
DROP POLICY IF EXISTS "Users can add their own favorites" ON favorites;
CREATE POLICY "Users can add their own favorites" ON favorites
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can remove their own favorites
DROP POLICY IF EXISTS "Users can remove their own favorites" ON favorites;
CREATE POLICY "Users can remove their own favorites" ON favorites
    FOR DELETE USING (auth.uid() = user_id);
