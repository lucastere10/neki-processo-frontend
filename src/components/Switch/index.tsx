import { FC } from 'react';

export const Switch: FC<unknown> = () => {
  return (
    <div
      className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-disabled dark:peer-focus:ring-dark-secondary rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-primary dark:peer-checked:bg-dark-primary"
      tabIndex={0}
    ></div>
  );
};
