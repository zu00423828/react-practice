import { useState,useEffect } from 'react'
import {jobsAPI,getData} from '../../global/constants'
// import { JsonToTable } from 'react-json-to-table'
import Table from '../../compoements/Table'
function JobManagement(){
    const [jobData,setJobData] = useState([])
    useEffect(()=>{
        getData(jobsAPI,setJobData)
    },[])
    return(
        <>
        <h1 align='center'>Job管理</h1>
        <Table data={jobData} />
        </>
        
    )
}
export default JobManagement