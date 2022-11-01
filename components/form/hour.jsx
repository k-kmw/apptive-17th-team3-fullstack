import React from 'react';
import styles from './select.module.css'

const Hour = ({ ischeckTime }) => (
    <>
        <select name="time[hour]" id="hour"
            required
            disabled={ischeckTime ? true : false}
            className={styles.select}
        >
            <option value="">-</option>
            {Array(24).fill(0).map((v,i) => (<option value={i+1} key={i+1}>{i+1}</option>))}
        </select>
        <label htmlFor="hour">시</label>   
    </>
);

export default Hour;