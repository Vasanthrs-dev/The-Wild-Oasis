import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

export function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  // Filter
  const filteredValue = searchParams.get('status');
  const filter =
    !filteredValue || filteredValue === 'all'
      ? null
      : { field: 'status', value: filteredValue, method: 'eq' };

  // Sort
  const sortByRaw = searchParams.get('sortBy') || 'startDate-desc';
  const [field, direction] = sortByRaw.split('-');
  const sortBy = { field, direction };

  // Pagination
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  const {
    data: { data = [], count = 0 } = {},
    error,
    isLoading,
  } = useQuery({
    queryFn: () => getBookings({ filter, sortBy, page }),
    queryKey: ['bookings', filter, sortBy, page],
  });

  // Pre-fetch
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
      queryKey: ['bookings', filter, sortBy, page + 1],
    });
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
      queryKey: ['bookings', filter, sortBy, page - 1],
    });
  }

  return { data, error, isLoading, count };
}
