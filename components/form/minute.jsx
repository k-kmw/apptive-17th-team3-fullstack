import React from 'react';

const Minute = ({ischeckTime}) => {
    return (
        <>
            <select name="time[minute]" id="minute" required disabled={ischeckTime ? true : false}>
                <option value="">-</option>
                {Array(12).fill(0).map((v,i) => 5*i).map(v => (<option value={v>9 ? v : `0${v}`} key={v.toString()}>{v}</option>))}
            </select>
            <label htmlFor="minute">분</label> 
        </>
    )
}

export default Minute;