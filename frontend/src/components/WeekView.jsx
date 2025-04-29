import DayCard from './DayCard';

function WeekView() {
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  return (
    <div className="bg-lightGray min-h-screen p-8 ">
      <h2 className="text-primaryDark text-4xl font-bold mb-8">Week</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {daysOfWeek.map((day, index) => (
          <DayCard key={index} dayName={day} />
        ))}
      </div>
    </div>
  );
}

export default WeekView;
