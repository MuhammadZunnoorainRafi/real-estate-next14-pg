import { cn } from '@nextui-org/react';

type Props = {
  items: { label: string }[];
  activeItem: number;
  setActiveItem: (item: number) => void;
  className?: string;
};

function Stepper({ items, activeItem, setActiveItem, className }: Props) {
  return (
    <div className={cn('flex items-center justify-around', className)}>
      {items.map((val, ind) => (
        <>
          <div className="flex flex-col items-center">
            <div
              className={cn(
                'h-6 w-6 rounded-full flex items-center justify-center transition-all',
                {
                  'bg-primary-700 text-white': activeItem === ind,
                  'bg-gray-400 text-white': activeItem < ind,
                  'bg-primary-400 text-white': activeItem > ind,
                  'cursor-pointer': activeItem >= ind,
                }
              )}
              {...(activeItem > ind
                ? { onClick: () => setActiveItem(ind) }
                : {})}
            >
              {ind}
            </div>
            <p>{val.label}</p>
          </div>
          {ind !== items.length - 1 && (
            <div
              className={cn(
                'border h-0 w-full -mt-5 relative after:absolute after:left-0 after:top-0 after:border after:transition-all after:duration-300 after:ease-in',
                {
                  'after:w-full after:border-primary-400': ind < activeItem,
                  'after:w-0': ind >= activeItem,
                }
              )}
            ></div>
          )}
        </>
      ))}
    </div>
  );
}

export default Stepper;
