import {useState,useEffect} from 'react'
// import { Spinner } from 'react-core-loading-spinner'
import {videosAPI,audiosAPI,jobAPI} from '../../global/constants'

async function getApiData(setOptions){
    const videoRes = await fetch(videosAPI)
    const videoData=await videoRes.json()
    const audioRes =await fetch(audiosAPI)
    const audioData = await audioRes.json()
    const fullData={'video':videoData,'audio':audioData}
    setOptions(fullData)
}
function Select(){
    // const [data,setData]= useState([])
    const [videoList,setVideoList]=useState([])
    const [audioList,setAudioList]=useState([])
    const [videoId,setVideoId] =useState(null)
    const [audioId,setAudioId] = useState(null)
    const [outFps,setOutFps]=useState("")
    const [ outCrf,setCrf]=useState(0)
    const [skipSeconds,setSkipSecords] =useState(0)
    const [comment,setComment] =useState("")
    useEffect(()=>{
        getApiData(setOptions)
    },[])
    const videoChange = (e) =>{
        setVideoId(e.target.value)
    }
    const audioChange = (e) =>{
        setAudioId(e.target.value)
    }
    const fpsChange = (e) =>{
        setOutFps(e.target.value)
    }
    const crfChange = (e) =>{
        setCrf(e.target.value)
    }
    const skipSecondsChange = (e) =>{
        setSkipSecords(e.target.value)
    }
    const commentChange = (e)=>{
        setComment(e.target.value)
    }
    const setOptions= (data) =>{
        console.log(data)
        const videoOptions=[]
        if (data.length===0)
            return 
        data.video.map((item) =>(
            videoOptions.push(<option key={item.id} value = {item.id} >{item.filename}</option>)
        ))

        setVideoList(videoOptions)
        const audioOptions=[]
        data.audio.map((item)=>(
            audioOptions.push(<option key={item.id} value = {item.id} >{item.filename}</option>)
        ))
        setAudioList(audioOptions)
        setVideoId(data.video[0].id)
        setAudioId(data.audio[0].id)
    }
    async function postData(){
        console.log(JSON.stringify({"video_id":videoId, "audio_id":audioId, out_fps:outFps,
        "out_crf":outCrf, start_seconds:skipSeconds, "job_comment":comment}))
        const res = await fetch(jobAPI,{
            method:"POST",
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify({"video_id":videoId, "audio_id":audioId, out_fps:outFps,
                "out_crf":outCrf, start_seconds:skipSeconds, "job_comment":comment})
         })
        
        window.alert(res.ok?"影片合成開始":"已經合成過，或是找不到檔案")
    }
    return(
        <>
        <div>
        {/* <Spinner show={false} text="Requesting..."></Spinner> */}
        </div>
        <h1>&nbsp;智能影片合成</h1>
        <form action="/job" method="post">
        <p> &emsp;請選擇使用影片：
        <select name="video_id" id="video_id"  onChange={videoChange} >{videoList}</select></p> 
        <p>&emsp;請選擇使用聲音：
        <select name="audio_id" id="audio_id" onChange={audioChange}>{audioList}</select></p>
        <p>&emsp;輸出FPS：<input name ="out_fps"  onChange={fpsChange}/></p>
        <p id="slider_text">&emsp;影片壓縮：{outCrf} </p>
        <p>&emsp;<input name="out_crf" type="range" min="0" max="16" step="1" defaultValue="0" onChange={crfChange} /></p>
        <p>&emsp;跳過秒數：<input type="text" name="start_seconds" value={skipSeconds} onChange={skipSecondsChange}/></p>
        <p>&emsp;備註：
        <input type="text" id="job_comment" name="job_comment" onChange={commentChange}/></p>
        <p>&emsp;<input type="button" value="合成" onClick={postData} /></p>
        </form>
        </>
    )
}
export default Select