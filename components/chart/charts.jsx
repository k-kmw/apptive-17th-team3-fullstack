import React, { useEffect, useState } from 'react';
import DoughnutChart from './doughnut';
import styles from './charts.module.css';
import BarChart from './bar';
import randomColor from 'randomcolor';

const Charts = ({numOfSchedule }) => {
    // const [colors, setColors] = useState();
    const nums = numOfSchedule && numOfSchedule.map((item) => item.num)
    const colors = [];
    let color;
    for (let i = 0; i < nums.length; i++) {
            color = randomColor({
                luminosity: 'dark',
                format: 'rgba',
                alpha: 0.2,
            })
        colors.push(color);
    }
    const result = nums.reduce(function add(sum, currValue) {
        return sum + currValue;
    }, 0);
    return (
        <div className={styles.container}>
            <p className={styles.areaText}>PROJECT OVERVIEW</p>
            <div className={styles.boxes}>
                <div className={styles.box}>
                    <p className={styles.text}>일별 작업 수</p>
                    <div className={styles.bar}>
                        <BarChart colors={colors} />
                    </div>
                </div>

                <div className={styles.box}>
                    <p className={styles.text}>세부 작업 수</p>
                    <h3 className={styles.count}>{result}개</h3>
                    <div className={styles.doughnut}>
                        <DoughnutChart numOfSchedule={numOfSchedule} colors={colors} nums={nums} />
                    </div>
                </div>
            </div>
        </div>
    )
}


export default React.memo(Charts);