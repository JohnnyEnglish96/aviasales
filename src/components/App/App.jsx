import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Progress } from 'antd';

import SideFilter from '../SideFilter';
import TicketList from '../TicketList';
import Tabs from '../Tabs';
import logo from '../../assets/img/Logo.svg';
import { getSearchId } from '../../store/actions/actions';

import styles from './App.module.scss';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSearchId());
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <Logo />
      <div className={styles.content}>
        <SideFilter />
        <ProgressBar />
        <Tabs />
        <TicketList />
      </div>
    </div>
  );
}

function ProgressBar() {
  const tickets = useSelector((state) => state.ticketsReducer.tickets);
  const percent = Math.round((tickets.length / 8806) * 100);
  let hidden = false;

  if (percent === 100) {
    hidden = true;
  }

  return (
    <Progress
      className={`${styles.progress} ${hidden && styles.hidden}`}
      percent={percent}
      showInfo={false}
      status="active"
    />
  );
}

function Logo() {
  return (
    <div className={styles.logo}>
      <img src={logo} alt="Logo" />
    </div>
  );
}

export default App;
