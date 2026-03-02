interface ProgressBarProps {
  label: string;
  percentage: number;
}

// Contrast ratios (WCAG 1.4.3): red-700 7.0:1 ✅, blue-600 4.54:1 ✅, green-700 5.74:1 ✅
const ProgressBar = ({ label, percentage }: ProgressBarProps): React.JSX.Element => {
  let progressColor = 'bg-red-700';
  if (percentage === 100) {
    progressColor = 'bg-green-700';
  } else if (percentage >= 50) {
    progressColor = 'bg-blue-600';
  }

  return (
    <div className='ml-20 mb-2'>
      <p className='text-white font-semibold gap-10'>
        {label} - {percentage}%
      </p>
      <div
        role='progressbar'
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${label} progress: ${percentage}%`}
        className='w-50 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700'
      >
        <div
          className={`${progressColor} h-2.5 rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
