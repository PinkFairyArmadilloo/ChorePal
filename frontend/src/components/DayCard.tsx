import { useState, useEffect } from 'react';
import AddChoreForm from './AddChore';
import { useDispatch } from 'react-redux';
import { completeChore, deleteChore } from '../redux/choreSlice';
import { fetchChoreImage } from '../api';
import type { AppDispatch } from '../redux/store';
import type { Chore } from '../types';

interface DayCardProps {
  day: string;
  chores: Chore[];
}

const DayCard = ({ day, chores }: DayCardProps): React.JSX.Element => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [images, setImages] = useState<Record<string, string>>({});
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchImages = async (): Promise<void> => {
      const newImages: Record<string, string> = {};
      for (const chore of chores) {
        if (chore.image && !images[chore._id]) {
          const imgData = await fetchChoreImage(chore.image);
          if (imgData?.imageSource) {
            newImages[chore._id] = imgData.imageSource;
          }
        }
      }
      setImages((prev) => ({ ...prev, ...newImages }));
    };

    fetchImages();
  }, [chores]);

  const handleDropdownChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    chore: Chore
  ): void => {
    const value = e.target.value;
    if (value === 'Completed') {
      dispatch(completeChore(chore));
    } else if (value === 'Delete') {
      dispatch(deleteChore(chore._id));
    }
  };

  return (
    <div className='bg-linear-to-r from-gray-300 via-gray-500 to-gray-700 text-blue-900 rounded-2xl shadow-lg p-5 flex flex-col gap-5 mt-6 w-90'>
      <h3 className='text-2xl font-bold tracking-wide'>{day.toUpperCase()}</h3>

      <div className='bg-surfaceLight rounded-xl p-4 flex flex-col gap-3'>
        {chores.length > 0 ? (
          <ul className='list-disc list-inside text-primaryDark space-y-1'>
            {chores.map((chore) => (
              <li
                key={chore._id}
                className={`text-base font-semibold flex items-center gap-2 ${
                  chore.status === 'Completed'
                    ? 'text-green-900'
                    : 'text-orange-800'
                }`}
              >
                {images[chore._id] && (
                  <img
                    src={images[chore._id]}
                    alt={`${chore.choreName} icon`}
                    className='w-8 h-8 rounded-full object-cover align-middle inline mr-2'
                  />
                )}
                {chore.childName} – {chore.choreName} –
                <select
                  onChange={(e) => handleDropdownChange(e, chore)}
                  value={chore.status}
                  aria-label={`Action for ${chore.choreName}`}
                >
                  <option
                    value='Pending'
                    disabled={chore.status === 'Completed'}
                  >
                    Select
                  </option>
                  <option value='Completed'>Completed</option>
                  <option value='Delete'>Delete</option>
                </select>
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-sm text-black/70 italic'>No chores assigned.</p>
        )}

        <button
          onClick={() => setShowAddForm(true)}
          aria-label={`Add new chore for ${day}`}
          className='self-start bg-accentOrange text-white rounded-full px-4 py-2 text-sm font-semibold hover:bg-accentOrangeDark transition duration-200'
        >
          Add New Chore
        </button>

        {showAddForm && (
          <AddChoreForm day={day} onClose={() => setShowAddForm(false)} />
        )}
      </div>
    </div>
  );
};

export default DayCard;
