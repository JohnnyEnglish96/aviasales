import React from 'react';
import { format, add } from 'date-fns';

import s7Logo from '../../assets/img/S7Logo.svg';
import styles from '../TicketList/TicketList.module.scss';

function getTimeFromMins(mins) {
  const hours = Math.round(mins / 60);
  const minutes = mins % 60;
  return `${hours}ч ${minutes}м`;
}

function transformTime(date, duration) {
  const departureTime = format(new Date(date), 'hh:mm');
  const destinationTime = format(add(new Date(date), { minutes: duration }), 'hh:mm');
  return {
    departureTime,
    destinationTime,
  };
}

const Ticket = ({ tickets }) => {
  const { price, segments } = tickets;
  const [toDestination, fromDestination] = segments;
  return (
    <div className={styles.ticket}>
      <p className={styles.price}>{price} P</p>

      <img className={styles['s7-Logo']} src={s7Logo} alt="s7 Logo" />
      <div className={styles.table}>
        <TableInfo segment={toDestination} />
        <TableInfo segment={fromDestination} />
      </div>
    </div>
  );
};

const TableInfo = ({ segment }) => {
  const { origin, destination, date, duration, stops } = segment;
  const { departureTime, destinationTime } = transformTime(date, duration);

  return (
    <ul>
      <li className={styles['table--content']}>
        <ul className={styles.enroute}>
          <li className={styles['table--title']}>
            {origin} – {destination}
          </li>
          <li className={styles['table--info']}>
            {departureTime} – {destinationTime}
          </li>
        </ul>
        <ul className={styles.onway}>
          <li className={styles['table--title']}>В пути</li>
          <li className={styles['table--info']}>{getTimeFromMins(duration)}</li>
        </ul>
        <ul className={styles.transfer}>
          <li className={styles['table--title']}>
            {stops.length ? `${stops.length} пересадки` : '0 пересадок'}
          </li>
          <li className={styles['table--info']}>{stops.join(', ')}</li>
        </ul>
      </li>
    </ul>
  );
};

export default Ticket;
