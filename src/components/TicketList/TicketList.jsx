import React from 'react';
import { Button } from 'antd';

import Ticket from '../Ticket';

import styles from './TicketList.module.scss';

const TicketList = () => {
  return (
    <ul className={styles['ticket-list']}>
      <Ticket />
      <Ticket />
      <Ticket />
      <Ticket />
      <Ticket />
      <Button className={styles['adding-btn']} type="primary" size="large">
        Показать еще 5 билетов!
      </Button>
    </ul>
  );
};

export default TicketList;
