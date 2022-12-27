import React from 'react';
import styles from './form.module.css'

const Hour = ({ ischeckTime, changeTime, hour }) => (
    <>
        <select name="hour" id="hour"
            required
            disabled={ischeckTime ? true : false}
            className={styles.input}
            value={hour}
            onChange={changeTime}
        >
            <option value="">-</option>
            {Array(23).fill(0).map((v,i) => (<option value={i+1} key={i+1}>{i+1}</option>))}
        </select>
        <label htmlFor="hour">시</label>   
    </>
);

export default Hour;