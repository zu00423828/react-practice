import { useState, useEffect } from 'react'
import { jobsAPI, jobAPI, getData } from '../../global/common'
import Table from '../../compoements/Table'
const JobManagement = () => {
    const [jobData, setJobData] = useState([])
    useEffect(() => {
        getData(jobsAPI, setJobData)
    }, [])
    useEffect(() => {
        const interval = setInterval(() => {
            getData(jobsAPI, setJobData)
        }, 60000);
        return () => clearInterval(interval);
    }, []);
    return (
        <>
            <h1 align='center'>Job管理</h1>
            <Table tableName="job" dataApi={jobAPI} data={jobData} setData={setJobData} />
        </>
    )
}
export default JobManagement