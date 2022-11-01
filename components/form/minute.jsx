import React from 'react';

const Minute = ({ischeckTime}) => {
    return (
        <>
            <select name="time[minute]" id="minute" required disabled={ischeckTime ? true : false}>
                <option value="">-</option>
                {Array(11).fill(0).map((v,i) => 5*(i+1)).map(v => (<option value={v}>{v}</option>))}
            </select>
            <label htmlFor="minute">분</label> 
        </>
    )
}

export default Minute;