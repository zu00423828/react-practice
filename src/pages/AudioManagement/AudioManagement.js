import {useState,useEffect} from 'react'

import { audiosAPI,audioAPI,getData} from '../../global/constants'
import Table from '../../compoements/Table'
function AudioManagement(){
    const [audioData,setAudioData] = useState([])
    useEffect(() =>{
        getData(audiosAPI,setAudioData)
    },[])

    return(
        <>
        <h1 align='center'>Audio管理</h1>
        <Table tableName="audio" dataApi={audioAPI} data={audioData} setData={setAudioData} />
        </>
    )
}
export default AudioManagement