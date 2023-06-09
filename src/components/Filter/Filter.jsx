import React from 'react';
import PropTypes from 'prop-types';
import styles from './Filter.module.css';

const Filter = ({ value, onChangeFilter }) => {
  return (
    <div className={styles.container}>
      <label>
        Filter contacts by name:
        <input
          className={styles.input}
          type="text"
          defaultValue={value}
          onChange={onChangeFilter}
        />
      </label>
    </div>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};

export default Filter;
