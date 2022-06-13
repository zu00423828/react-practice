import { useState,useEffect } from 'react'
import {jobsAPI,jobAPI,getData} from '../../global/constants'
// import { JsonToTable } from 'react-json-to-table'
import Table from '../../compoements/Table'
function JobManagement(){
    const [jobData,setJobData] = useState([])
    useEffect(()=>{
        getData(jobsAPI,setJobData)
    },[])
    return(
        <>
        <head lang="UTF-8">
        <meta charSet="UTF-8" httpEquiv="refresh" content="300"/>
        </head>
        <h1 align='center'>Job管理</h1>
        <Table tableName="job" data={jobData} dataApi={jobAPI} />
        </>
        
    )
}
export default JobManagement