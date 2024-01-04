import { FC } from 'react';

interface Props {
  title: string;
}

const Title: FC<Props> = ({ title }) => {
  return (
    <h1
      className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
      role="heading"
    >
      {title}
    </h1>
  );
};

export default Title;
