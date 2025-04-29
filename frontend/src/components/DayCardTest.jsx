import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

function DayCard({ dayName }) {
  return (
    // added mt-6 and w-96 to try to fix height and width
    <div className="bg-primaryDark text-white rounded-xl shadow-lg p-4 flex flex-col gap-4 mt-6 w-96">
      <h3 className="text-2xl font-bold">{dayName}</h3>

      <div className="bg-surfaceLight rounded-lg p-4 flex flex-col gap-2">
        <h4 className="text-accentOrange text-lg font-semibold">Kevin</h4>
        <ul className="list-disc list-inside text-primaryDark">
          <li>Do the dishes</li>
          {/* More chores here */}
        </ul>
        <button className="bg-accentOrange text-white rounded-full px-4 py-2 text-sm font-semibold hover:bg-accentOrangeDark transition">
          Add New Chore
        </button>
      </div>
    </div>
  );
}

export default DayCard;

// primaryDark: '#1A2B4C', // navy blue color
// accentOrange: '#FF6600', // bright orange
// accentOrangeDark: '#CC5200', // darker orange on hover
// surface: '#2E3A59', // optional: lighter navy background for inside cards
// lightGray: '#F7F9FA', // page background