import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uniqid from 'uniqid';
import { Checkbox } from 'antd';

import { filterToggle, filterAllToggle } from '../../store/actions/actions';
import { selectFilters } from '../../store/selectors/selectors';

import styles from './SideFilter.module.scss';

function SideFilter() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  const handleChange = (e) => {
    if (e.target.id === 4) {
      return dispatch(filterAllToggle());
    }
    return dispatch(filterToggle(e.target.id));
  };

  return (
    <div className={styles['side-filter']}>
      <p className={styles['side-filter--title']}>Количество пересадок</p>

      <ul className={styles['side-filter--radio-wrapper']}>
        {filters.map(({ id, name, trigger }) => {
          if (id === 4) {
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
}

function Filter({ handleChange, trigger, id, name }) {
  return (
    <Checkbox onChange={handleChange} checked={trigger} id={id}>
      {name}
    </Checkbox>
  );
}

export default SideFilter;
