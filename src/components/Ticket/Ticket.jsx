import React from 'react';
import { format, add } from 'date-fns';

import S7 from '../../assets/img/S7.svg';
import UT from '../../assets/img/UT.svg';
import DP from '../../assets/img/DP.svg';
import FV from '../../assets/img/FV.svg';
import U6 from '../../assets/img/U6.svg';
import W6 from '../../assets/img/W6.svg';
import BT from '../../assets/img/BT.svg';
import AK from '../../assets/img/AK.svg';
import styles from '../TicketList/TicketList.module.scss';

const airlineLogos = {
  S7,
  UT,
  DP,
  FV,
  U6,
  W6,
  BT,
  AK,
};

function showLogo(name) {
  return airlineLogos[name] || null;
}

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
  const { price, segments, carrier } = tickets;
  const [toDestination, fromDestination] = segments;
  return (
    <div className={styles.ticket}>
      <p className={styles.price}>{addSpacesToNumber(price)}</p>

      <img className={styles['s7-Logo']} src={showLogo(carrier)} alt={carrier} />
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
