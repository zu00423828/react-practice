import { useState, useEffect } from 'react'

import { audiosAPI, audioAPI, getData } from '../../global/common'
import Table from '../../compoements/Table'
const AudioManagement = () => {
    const [audioData, setAudioData] = useState([])
    useEffect(() => {
        getData(audiosAPI, setAudioData)
    }, [])

    return (
        <>
            <h1 align='center'>Audio管理</h1>
            <Table tableName="audio" dataApi={audioAPI} data={audioData} setData={setAudioData} />
        </>
    )
}
export default AudioManagement