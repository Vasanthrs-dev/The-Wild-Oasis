import { HiOutlineBriefcase, HiOutlineChartBar } from 'react-icons/hi';
import Stat from './Stat';
import { HiOutlineBanknotes, HiOutlineCalendarDays } from 'react-icons/hi2';
import { formatCurrency } from '../../utils/helpers';

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  const numOfBookings = bookings.length;
  const sales = bookings.reduce((acc, curr) => curr.totalPrice + acc, 0);
  const checkins = confirmedStays.length;
  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount);
  // Num check in nights / all available nights (num of days * num of cabins)

  return (
    <>
      <Stat
        title='Bookings'
        color='blue'
        icon={<HiOutlineBriefcase />}
        value={numOfBookings}
      />
      <Stat
        title='Sales'
        color='green'
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title='Check ins'
        color='indigo'
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title='Occupancy rate'
        color='yellow'
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + '%'}
      />
    </>
  );
}

export default Stats;
