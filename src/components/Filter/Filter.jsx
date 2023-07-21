import React from 'react';
import { Checkbox } from 'antd';

const Filter = ({ handleChange, trigger, id, name }) => {
  return (
    <Checkbox onChange={handleChange} checked={trigger} id={id}>
      {name}
    </Checkbox>
  );
};
export default Filter;
