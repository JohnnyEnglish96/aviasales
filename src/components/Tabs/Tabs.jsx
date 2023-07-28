import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Radio } from 'antd';
import uniqid from 'uniqid';

import { tabsToggle } from '../../store/actions/actions';
import { selectTabs } from '../../store/selectors/selectors';
import styles from '../App/App.module.scss';

function Tabs() {
  const tabs = useSelector(selectTabs);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(tabsToggle(event.target.value));
  };

  return (
    <div className={styles.tabs}>
      <Radio.Group defaultValue={1} buttonStyle="solid" style={{ width: '100%' }}>
        {tabs.map(({ name, trigger, value }) => (
          <Radio.Button
            key={uniqid()}
            onChange={handleChange}
            checked={trigger}
            value={value}
            className={styles['custom-radio-button']}
          >
            {name}
          </Radio.Button>
        ))}
      </Radio.Group>
    </div>
  );
}

export default Tabs;
