import React, { useEffect, useCallback, useMemo } from 'react';
import { Button, Alert } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import uniqid from 'uniqid';

import { getTickets, showTickets } from '../../store/actions/actions';
import {
  selectTicketsByFilter,
  selectSearchId,
  selectTicketsToShow,
} from '../../store/selectors/selectors';
import Ticket from '../Ticket';

import styles from './TicketList.module.scss';

function TicketList() {
  const dispatch = useDispatch();

  const filteredTickets = useSelector(selectTicketsByFilter);
  const ticketsToShow = useSelector(selectTicketsToShow);
  const searchId = useSelector(selectSearchId);

  const showMoreTickets = useCallback(() => {
    dispatch(showTickets());
  }, [dispatch]);

  useEffect(() => {
    const retryGetTickets = async () => {
      try {
        const stop = await dispatch(getTickets(searchId));
        if (!stop) {
          retryGetTickets();
        }
      } catch (error) {
        retryGetTickets();
      }
    };

    if (searchId) {
      retryGetTickets();
    }
  }, [dispatch, searchId]);

  return (
    <>
      <ul className={styles['ticket-list']}>
        {filteredTickets.length ? (
          filteredTickets.slice(0, ticketsToShow).map((ticket) => (
            <li key={uniqid()}>
              <Ticket tickets={ticket} />
            </li>
          ))
        ) : (
          <Alert
            className={styles['alert-message']}
            message="No tickets found, please try to use one of the filters"
            type="warning"
            showIcon
          />
        )}
      </ul>
      <AddButton showMoreTickets={showMoreTickets} filteredTicketsLength={filteredTickets.length} />
    </>
  );
}

function AddButton({ showMoreTickets, filteredTicketsLength }) {
  const buttonStyle = useMemo(() => ({ width: '100%' }), []);

  return (
    <div className={styles['adding-btn']}>
      <Button
        onClick={showMoreTickets}
        disabled={!filteredTicketsLength}
        type="primary"
        size="large"
        style={buttonStyle}
      >
        Показать еще 5 билетов!
      </Button>
    </div>
  );
}

export default TicketList;
