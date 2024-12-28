import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import { useFetchCabins } from './useFetchCabins';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { useSearchParams } from 'react-router-dom';
import Empty from '../../ui/Empty';

function CabinTable() {
  const { isLoading, cabins } = useFetchCabins();
  const [searchParams] = useSearchParams();
  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resourceName='cabins' />;

  // Filter

  const filteredValue = searchParams.get('discount') || 'all';
  let filterCabins;

  if (filteredValue === 'all') filterCabins = cabins;
  if (filteredValue === 'with-discount')
    filterCabins = cabins.filter((cabin) => cabin.discount > 0);
  if (filteredValue === 'no-discount')
    filterCabins = cabins.filter((cabin) => cabin.discount === 0);

  // Sort

  const sortBy = searchParams.get('sortBy') || 'startDate-asc';
  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;
  const sortedCabins = filterCabins.sort((a, b) => {
    const diff = a[field] - b[field];
    return diff * modifier;
  });

  return (
    <Menus>
      <Table columns={'0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'}>
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
