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
    <div className="bg-lightGray min-h-screen flex items-center justify-center p-8">
      <div className="text-center w-full">
        <h2 className="text-primaryDark text-3xl font-bold mb-6">Week</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {daysOfWeek.map((day, index) => (
            <DayCard key={index} dayName={day} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default WeekView;
