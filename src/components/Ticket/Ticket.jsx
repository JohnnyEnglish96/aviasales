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

function transferAmount(stops) {
  const numStops = stops.length;

  if (numStops === 0) {
    return 'пересадок';
  }
  if (numStops === 1) {
    return '1 пересадка';
  }
  return `${numStops} пересадки`;
}

function addSpacesToNumber(num) {
  const NumString = String(num);
  const requiredNum = NumString.length === 5 ? 2 : 3;
  const regex = new RegExp(`(\\d{${requiredNum}})(\\d{1,})`, 'gi');
  return `${NumString.replace(regex, '$1 $2')} P`;
}

function Ticket({ tickets }) {
  const { price, segments } = tickets;
  const [toDestination, fromDestination] = segments;
  return (
    <div className={styles.ticket}>
      <p className={styles.price}>{addSpacesToNumber(price)}</p>

      <img className={styles['s7-Logo']} src={s7Logo} alt="s7 Logo" />
      <div className={styles.table}>
        <TableInfo segment={toDestination} />
        <TableInfo segment={fromDestination} />
      </div>
    </div>
  );
}

function TableInfo({ segment }) {
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
          <li className={styles['table--title']}>{transferAmount(stops)}</li>
          <li className={styles['table--info']}>{stops.length ? stops.join(', ') : 'НЕТ'}</li>
        </ul>
      </li>
    </ul>
  );
}

export default Ticket;
