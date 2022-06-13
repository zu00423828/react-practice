import {useState,useEffect} from 'react'
// import { JsonToTable } from 'react-json-to-table'
import { videosAPI,videoAPI,getData } from '../../global/constants'
import Table from '../../compoements/Table'
function VideoManagement(){
    const [videoData,setVideoData] = useState([])
    useEffect(() =>{
        getData(videosAPI,setVideoData)
    },[])
    return(
        <>
        <h1 align='center'>Video管理</h1>
        <Table tableName="video" data={videoData} dataApi={videoAPI}/>
        </>
    )
}
export default VideoManagement






