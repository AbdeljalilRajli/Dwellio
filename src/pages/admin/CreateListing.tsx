import { useNavigate } from 'react-router-dom';
import ListingForm from './ListingForm';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../hooks/useAuth';

export default function CreateListing() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleCreate = async (formData: any) => {
        try {
            const { error } = await supabase
                .from('listings')
                .insert([{
                    ...formData,
                    owner_id: user?.id,
                    price: parseFloat(formData.price),
                    bedrooms: parseInt(formData.bedrooms),
                    bathrooms: parseInt(formData.bathrooms),
                    area: parseFloat(formData.area),
                    latitude: formData.latitude ? parseFloat(formData.latitude) : null,
                    longitude: formData.longitude ? parseFloat(formData.longitude) : null,
                }]);

            if (error) throw error;
            navigate('/dashboard/listings');
        } catch (err: any) {
            alert(err.message || 'Error occurred while creating listing');
        }
    };

    return <ListingForm title="Create New Listing" onSubmit={handleCreate} />;
}
