import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styles from './projectInfo.module.css'

const ProjectInfo = ({ id, openForm, data, update}) => {
    const [projectInfo, setProjectInfo] = useState();
    const [successSchedules, setSuccessSchedules] = useState();
    const getProjectInfo = async () => {
        const encoded_url = encodeURIComponent(id);
        // const res = await axios.get(`https://ancient-fjord-87078.herokuapp.com/api/p/events?projectID=${encoded_url}`);
        const res = await axios.get(`https://ancient-fjord-87078.herokuapp.com/api/p/events?projectID=${encoded_url}`)
        setProjectInfo(res);
    }
    useEffect(() => {
        getProjectInfo();
    }, [update])

    useEffect(() => {
        const success = projectInfo && projectInfo.data.filter((item) => item.status == '완료')
        setSuccessSchedules(success);
    }, [projectInfo]);

    return (
        <div className={styles.info}>
            <p className={styles.title}>{data && data.title}</p>
            <button className={styles.btn} onClick={(e) => openForm(data.title, data.projectID, e)}>+ 일정 추가하기</button>
            <div className={styles.completion}>
                <div className={styles.completionText}>
                    <span>Completion</span>
                    { successSchedules && <span>{successSchedules ? Math.round(((successSchedules.length) / (projectInfo.data.length)*100)*10)/10 : 0}%</span>}
                </div>
                <div className={styles.completionBar}>
                    <div className={styles.completionValue} style={{width: `${successSchedules && ((successSchedules.length) / (projectInfo.data.length))*100}%`}}></div>
                </div>
            </div>            
        </div>
    )
}

export default React.memo(ProjectInfo);