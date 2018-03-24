import * as React from 'react';

import * as Styles from './Category.css';

export interface Props {
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
      data-hook={isActive ? 'active-category' : 'category'}
    >
      {title}
    </div>
  );
};

export default Category;
