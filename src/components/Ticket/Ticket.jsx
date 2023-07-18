import React from 'react';

import s7Logo from '../../assets/img/S7Logo.svg';
import styles from '../TicketList/TicketList.module.scss';

const Ticket = () => {
  return (
    <li className={styles.ticket}>
      <p className={styles.price}>3400 P</p>

      <img className={styles['s7-Logo']} src={s7Logo} alt="s7 Logo" />

      <TableInfo />
    </li>
  );
};

const TableInfo = () => {
  return (
    <ul className={styles.table}>
      <li className={styles['table--content']}>
        <ul className={styles.enroute}>
          <li className={styles['table--title']}>MOW – HKT</li>
          <li className={styles['table--info']}>11:45 – 08:00</li>
        </ul>
        <ul className={styles.onway}>
          <li className={styles['table--title']}>В пути</li>
          <li className={styles['table--info']}>21ч 15м</li>
        </ul>
        <ul className={styles.transfer}>
          <li className={styles['table--title']}>2 пересадки</li>
          <li className={styles['table--info']}>HKG, JNB</li>
        </ul>
      </li>

      <li className={styles['table--content']}>
        <div className={styles.enroute}>
          <li className={styles['table--title']}>MOW – HKT</li>
          <li className={styles['table--info']}>11:45 – 08:00</li>
        </div>
        <div className={styles.onway}>
          <li className={styles['table--title']}>В пути</li>
          <li className={styles['table--info']}>21ч 15м</li>
        </div>
        <div className={styles.transfer}>
          <li className={styles['table--title']}>2 пересадки</li>
          <li className={styles['table--info']}>HKG, JNB</li>
        </div>
      </li>
    </ul>
  );
};

export default Ticket;
