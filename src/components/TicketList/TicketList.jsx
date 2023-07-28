import React, { useEffect, useCallback } from 'react';
import { Button, Alert } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import uniqid from 'uniqid';

import { getTickets, showTickets } from '../../store/actions/actions';
import { selectTicketsByFilter, selectSearchId } from '../../store/selectors/selectors';
import Ticket from '../Ticket';

import styles from './TicketList.module.scss';

function TicketList() {
  const dispatch = useDispatch();

  const filteredTickets = useSelector(selectTicketsByFilter);
  const searchId = useSelector(selectSearchId);

  const showMoreTickets = () => {
    dispatch(showTickets());
  };

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
    <ul className={styles['ticket-list']}>
      {filteredTickets.length ? (
        filteredTickets.map((ticket) => (
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

      <MemoizedAddButton showMoreTickets={showMoreTickets} filteredTickets={filteredTickets} />
    </ul>
  );
}

function AddButton({ showMoreTickets, filteredTickets }) {
  const buttonStyle = { width: '100%' };
  const handleButtonClick = useCallback(() => {
    showMoreTickets();
  }, [showMoreTickets]);
  return (
    <div className={styles['adding-btn']}>
      <Button
        onClick={handleButtonClick}
        disabled={!filteredTickets.length}
        type="primary"
        size="large"
        style={buttonStyle}
      >
        Показать еще 5 билетов!
      </Button>
    </div>
  );
}

const MemoizedAddButton = React.memo(AddButton);

export default TicketList;
