import {useState,useEffect} from 'react'
// import { JsonToTable } from 'react-json-to-table'

import { audiosAPI ,getData} from '../../global/constants'
import Table from '../../compoements/Table'
function AudioManagement(){
    const [audioData,setAudioData] = useState([])
    useEffect(() =>{
        getData(audiosAPI,setAudioData)
    },[])

    return(
        <>
        <h1 align='center'>Audio管理</h1>
        <Table data={audioData} />
        </>
    )
}
export default AudioManagement