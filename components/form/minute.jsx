import React from 'react';
import styles from './form.module.css'

const Minute = ({ischeckTime, minute, changeTime}) => {
    return (
        <>
            <select className={styles.input} name="minute" id="minute" 
                required disabled={ischeckTime ? true : false} value={minute} onChange={changeTime}> 
                <option value="">-</option>
                {Array(12).fill(0).map((v,i) => 5*i).map(v => (<option value={v} key={v.toString()}>{v}</option>))}
            </select>
            <label htmlFor="minute">분</label> 
        </>
    )
}

export default Minute;