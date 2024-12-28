import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBookingApi } from '../../services/apiBookings';
import toast from 'react-hot-toast';

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationKey: ['bookings'],
    mutationFn: (id) => deleteBookingApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['bookings'],
      });
      toast.success('Booking deleted successfully');
    },
    onError: () => toast.error('Booking could not be deleted'),
  });

  return { isDeleting, deleteBooking };
}
