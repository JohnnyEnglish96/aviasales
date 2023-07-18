import React from 'react';
import { Checkbox } from 'antd';

import styles from './SideFilter.module.scss';

const SideFilter = () => {
  return (
    <div className={styles['side-filter']}>
      <p className={styles['side-filter--title']}>Количество пересадок</p>

      <div className={styles['side-filter--radio-wrapper']}>
        <Checkbox>Все</Checkbox>
        <Checkbox>Без пересадок</Checkbox>
        <Checkbox>1 пересадка</Checkbox>
        <Checkbox>2 пересадки</Checkbox>
        <Checkbox>3 пересадки</Checkbox>
      </div>
    </div>
  );
};

export default SideFilter;
