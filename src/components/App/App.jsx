import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Radio } from 'antd';

import SideFilter from '../SideFilter';
import TicketList from '../TicketList/TicketList';
import logo from '../../assets/img/Logo.svg';
import { getSearchId } from '../../store/actions/actions';

import styles from './App.module.scss';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSearchId());
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <Logo />
      <div className={styles.content}>
        <SideFilter />
        <Tabs />
        <TicketList />
      </div>
    </div>
  );
};

const Tabs = () => (
  <div className={styles.tabs}>
    <Radio.Group defaultValue="a" buttonStyle="solid" style={{ width: '100%' }}>
      <Radio.Button className={styles['custom-radio-button']} value="a">
        Самый дешевый
      </Radio.Button>
      <Radio.Button className={styles['custom-radio-button']} value="b">
        Самый быстрый
      </Radio.Button>
    </Radio.Group>
  </div>
);

const Logo = () => (
  <div className={styles.logo}>
    <img src={logo} alt="Logo" />
  </div>
);

export default App;
