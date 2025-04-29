import DayCarousel from './components/DayCarousel'; // adjust the path!
import DayCard from './components/DayCard'; // still needed because DayCarousel uses it inside

function WeekView() {
  const daysOfWeek = [
    { dayName: 'Sunday', userName: 'Jamila', tasks: ['Laundry', 'Vacuum'] },
    { dayName: 'Monday', userName: 'Jamila', tasks: ['Groceries', 'Call Grandma'] },
    { dayName: 'Tuesday', userName: 'Jamila', tasks: ['Work on project'] },
    { dayName: 'Wednesday', userName: 'Jamila', tasks: [] },
    { dayName: 'Thursday', userName: 'Jamila', tasks: ['Buy dog food'] },
    { dayName: 'Friday', userName: 'Jamila', tasks: ['Clean room'] },
    { dayName: 'Saturday', userName: 'Jamila', tasks: ['Chill 😎'] },
  ];

  return (
    <div className="bg-lightGray min-h-screen p-8">
      <h2 className="text-primaryDark text-3xl font-bold mb-6 text-center">Week</h2>
      <DayCarousel data={daysOfWeek} />
    </div>
  );
}

export default WeekView;
