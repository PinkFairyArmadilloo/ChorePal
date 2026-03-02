import ProgressBar from './ProgressBar';
import type { Chore } from '../types';

interface ProgressWeeklyProps {
  choreList: Chore[];
}

const ProgressWeekly = ({ choreList }: ProgressWeeklyProps): React.JSX.Element => {
  const choresByChild = choreList.reduce<Record<string, Chore[]>>((acc, chore) => {
    const name = chore.childName?.trim();
    if (!name) return acc;
    if (!acc[name]) acc[name] = [];
    acc[name].push(chore);
    return acc;
  }, {});

  return (
    <div>
      {Object.entries(choresByChild).map(([childName, chores]) => {
        const total = chores.length;
        const completed = chores.filter((c) => c.status === 'Completed').length;
        const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

        return (
          <section
            key={childName}
            aria-label={`${childName} progress`}
            className='mb-3'
          >
            <ProgressBar label={childName} percentage={percent} />
            <p className='mt-2 ml-20 text-amber-300 font-medium'>
              {completed} of {total} completed
            </p>
          </section>
        );
      })}
    </div>
  );
};

export default ProgressWeekly;
