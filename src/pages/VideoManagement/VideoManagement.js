import { useState, useEffect } from 'react'
import { videosAPI, videoAPI, getData } from '../../global/common'
import Table from '../../compoements/Table'
const VideoManagement = () => {
    const [videoData, setVideoData] = useState([])
    useEffect(() => {
        getData(videosAPI, setVideoData)
    }, [])
    return (
        <>
            <h1 align='center' >Video管理</h1>
            <Table tableName="video" dataApi={videoAPI} data={videoData} setData={setVideoData} />
        </>
    )
}
export default VideoManagement






