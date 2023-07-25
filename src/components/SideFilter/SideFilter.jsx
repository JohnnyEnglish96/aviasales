import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uniqid from 'uniqid';

import Filter from '../Filter';
import { filterToggle, filterAllToggle } from '../../store/actions/actions';

import styles from './SideFilter.module.scss';

const SideFilter = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filterReducer.filters);

  const handleChange = (e) => {
    if (e.target.id === 1) {
      return dispatch(filterAllToggle());
    }
    return dispatch(filterToggle(e.target.id));
  };

  return (
    <div className={styles['side-filter']}>
      <p className={styles['side-filter--title']}>Количество пересадок</p>

      <ul className={styles['side-filter--radio-wrapper']}>
        {filters.map(({ id, name, trigger }) => {
          if (id === 1) {
            return (
              <li key={uniqid()}>
                <Filter id={id} name={name} trigger={trigger} handleChange={handleChange} />
              </li>
            );
          }
          return (
            <li key={uniqid()}>
              <Filter id={id} name={name} trigger={trigger} handleChange={handleChange} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SideFilter;
