import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ListingForm from './ListingForm';
import { supabase } from '../../lib/supabaseClient';
import { listingService } from '../../services/listingService';

export default function EditListing() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: listing, isLoading } = useQuery({
        queryKey: ['listing', id],
        queryFn: () => listingService.getListingById(id!),
        enabled: !!id
    });

    const handleUpdate = async (formData: any) => {
        try {
            const { error } = await supabase
                .from('listings')
                .update({
                    ...formData,
                    price: parseFloat(formData.price),
                    bedrooms: parseInt(formData.bedrooms),
                    bathrooms: parseInt(formData.bathrooms),
                    area: parseFloat(formData.area),
                    city: formData.address.split(',').pop()?.trim() || 'Unknown'
                })
                .eq('id', id);

            if (error) throw error;
            navigate('/admin/listings');
        } catch (err: any) {
            alert(err.message || 'Error occurred while updating listing');
        }
    };

    if (isLoading) return <div className="text-center py-20 font-bold text-brand-primary animate-pulse italic">Loading property details...</div>;

    return <ListingForm title="Edit Property" initialData={listing} onSubmit={handleUpdate} />;
}
