/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import uniqid from 'uniqid';

import { getTickets } from '../../store/actions/actions';
import Ticket from '../Ticket';

import styles from './TicketList.module.scss';

const TicketList = () => {
  const [ticketList, setTicketList] = useState([]);
  const dispatch = useDispatch();
  const searchId = useSelector((state) => state.ticketsReducer.searchId);
  const tickets = useSelector((state) => state.ticketsReducer.tickets);

  useEffect(() => {
    if (searchId) {
      dispatch(getTickets(searchId));
    }
  }, [dispatch, searchId]);

  useEffect(() => {
    if (tickets.length) {
      setTicketList(tickets);
    }
  }, [tickets]);

  return (
    <ul className={styles['ticket-list']}>
      {ticketList.length
        ? ticketList.map((ticket) => (
            // eslint-disable-next-line react/jsx-indent
            <li key={uniqid()}>
              <Ticket tickets={ticket} />
            </li>
          ))
        : null}

      <Button className={styles['adding-btn']} type="primary" size="large">
        Показать еще 5 билетов!
      </Button>
    </ul>
  );
};

export default TicketList;
