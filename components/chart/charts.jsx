import React from 'react';
import DoughnutChart from './doughnut';
import styles from './charts.module.css';

const Charts = ({data, numOfSchedule}) => (
    <div className={styles.container}>
            <p className={styles.areaText}>PROJECT OVERVIEW</p>
        <div className={styles.boxes}>
            <div className={styles.box}>
                <p className={styles.text}>일별 작업 수</p>
                <div className={styles.doughnut}>
                    <DoughnutChart data={data} numOfSchedule={numOfSchedule}/>
                </div>
            </div>

            <div className={styles.box}>
                <p className={styles.text}>세부 작업 수</p>
                <div className={styles.doughnut}>
                    <DoughnutChart data={data} numOfSchedule={numOfSchedule}/>
                </div>
            </div>
        </div>
    </div>
       
    );

export default Charts;