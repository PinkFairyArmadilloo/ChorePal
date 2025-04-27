function DayCard({ dayName }) {
  return (
    <div className="w-1/4 h-72 p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 flex items-center">
      <div className="flex-shrink-0 mr-6">
        <svg className="w-16 h-16 text-accentOrange" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v12m6-6H6" />
        </svg>
      </div>
      
      <div className="flex-1 h-full">
        <a href="#">
          <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{dayName}</h3>
        </a>

        <div className="bg-surface p-4 rounded-lg h-full">
          <h4 className="text-accentOrange text-xl font-semibold mb-2">Kevin</h4>
          <ul className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            <li>Do the dishes</li>
          </ul>

          <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Add New Chore
            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
          </a>

          <button className="bg-accentOrange text-white py-2 px-4 rounded-lg hover:bg-accentOrangeDark mt-3">
            {/* add new chore moved from here */}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DayCard;
