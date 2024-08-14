const CardHeader = ({ title, children = null }) => {
  return (
    <div className='mb-4'>
      <header className='flex h-7 items-center justify-between gap-1'>
        {typeof title === 'string' ? (
          <h6 className='text-base font-normal text-neutral-300'>{title}</h6>
        ) : (
          title
        )}
      </header>
      {children}
    </div>
  );
};

export default CardHeader;
