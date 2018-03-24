import * as React from 'react';

import * as Styles from './Category.css';

interface Props {
  title: string;
  id: string;
  isActive: boolean;
  setActive: (id: string) => void;
}

const Category = ({ title, id, isActive, setActive }: Props) => {
  return (
    <div
      className={`${Styles.category} ${isActive ? Styles.active : ''}`}
      onClick={() => setActive(id)}
    >
      {title}
    </div>
  );
};

export default Category;
