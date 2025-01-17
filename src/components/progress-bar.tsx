export const ProgressBar = ({
  target,
  current,
}: {
  target: number;
  current: number;
}) => {
  return (
    <div className='relative w-full overflow-hidden rounded-md bg-stone-100 shadow-inner shadow-stone-300'>
      <div
        style={{
          width: `${(current / target) * 100}%`,
        }}
        className='h-7 bg-gradient-to-t from-green-600 via-green-400 to-green-600 transition-[width] ease-in-out duration-250'
      />
      <p className='absolute text-sm right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2 text-gray-600'>
        {`${Math.floor((current / target) * 100)}%`} Complete
      </p>
    </div>
  );
};
