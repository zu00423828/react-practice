import {useState,useEffect} from 'react' 
import { SpinnerCircularFixed } from 'spinners-react';
import {fileManagementAPI,ttsListAPI,ttsAPI} from '../../global/constants'
async function getLangVoice(setLangList,setVoiceList){
    const res = await fetch(ttsListAPI)
    const data = await res.json()
    setLangList(data.lang)
    setVoiceList(data.voice)
}

function UploadFile(){
    const [video,setVideo] = useState(new Blob())
    const [audio,setAudio] = useState(new Blob())
    const [langList,setLangList] = useState([])
    const [voiceList,setVoiceList] = useState([])
    const [transformText,setTransformText]=useState("")
    const [langValue,setLangValue] = useState("en-US")
    const [voiceValue,setVoiceValue] = useState("en-US-BrandonNeural")
    const [audioBlob,setAudioBlob] = useState(new Blob())
    const [audioUrl,setAudioUrl] = useState("")
    const [tempblobname,setTempBlobName] = useState("")
    const [blobname,setBoloname] = useState("")
    const [rate,setRate] = useState(0.9)
    const [videoComment,setVideoComment] =useState("")
    const [audioComment,setAudioComment] =useState("")
    const [showSpinnner,setShowSpinner]=useState(false)
    const [videoInputKey,setVideoInputKey ]= useState(Math.random().toString(36))
    const [audioInputKey,setAudioInputKey ]= useState(Math.random().toString(36))
    const resetState=()=>{
        setVideo(new Blob())
        setAudio(new Blob())
        setTransformText("")
        setLangValue("en-US")
        setVoiceValue("en-US-BrandonNeural")
        setAudioBlob(new Blob())
        setAudioUrl("")
        setBoloname("")
        setRate(0.9)
        setVideoComment("")
        setAudioComment("")
        setShowSpinner(false)
        setVideoInputKey(Math.random().toString(36))
        setAudioInputKey(Math.random().toString(36))
    }
    useEffect(()=>{
        getLangVoice(setLangList,setVoiceList)
    },[])
    const videoChange=(e)=>{
        setVideo(e.target.files[0])
    }
    const audioChange=(e)=>{
        setAudio(e.target.files[0])
    }
    const langChange = (e) =>{
        console.log(e.target.value)
        setLangValue(e.target.value)
    }
    const voiceChange = (e) =>{
        console.log(e.target.value)
        setVoiceValue(e.target.value)
    }
    const sliderChange = (e)=>{
        setRate(e.target.value)
    }
    const textChange=(e)=>{
        setTransformText(e.target.value)
    }
    const blobnameChange=(e)=>{
        setTempBlobName(e.target.value)
    }
    const videoCommentChange=(e)=>{
        setVideoComment(e.target.value)
    }
    const AudioCommentChange=(e)=>{
        setAudioComment(e.target.value)
    }
    const createLagneOption=()=>{
        const options =[]
        Object.keys(langList).sort().forEach(key =>{
            options.push(<option key={key} value = {langList[key]} >{langList[key]}</option>)
        })
        return options
    }
    const compareObjects =(item1,item2, key)=> {
        if (item1[key] < item2[key]) {
        return -1
        }
        if (item1[key] > item2[key]) {
        return 1
        }
        return 0
   }
    const createVoiceOption=()=>{
        let options =[]
        if (langValue !=="" && voiceList.length!==0 )
            {
                voiceList[langValue].sort((item1,item2)=>{return compareObjects(item1,item2,"display")})
                    .forEach(item =>{
                    options.push(<option key={item["display"]} value = {item["name"]} >{item["display"]}</option>)
                })
                return options
            }
        return 
    }
    const showBlobName=()=>{
        setBoloname(tempblobname)
    }
    async function sendText2Audio(){
        console.log(JSON.stringify({ "transform_text": transformText, "lang": langValue, "voice": voiceValue, "rate": rate }))
        const url = new URL(ttsAPI)
        url.searchParams.append("transform_text", transformText)
        url.searchParams.append("lang", langValue)
        url.searchParams.append("voice", voiceValue)
        url.searchParams.append("rate", rate)
        
        const res= await fetch(url.toString())
        const blob = await res.blob()
        setAudioBlob(blob)
        setAudioUrl(URL.createObjectURL(blob))
        setAudioComment(`${langValue} ${voiceValue}`)
    }
    async function postData(){
        setShowSpinner(true)
        const fd=new FormData()
        fd.append("video",video)
        fd.append("audio",audio)
        fd.append("video_comment",videoComment)
        fd.append("audio_comment",audioComment)
        if (blobname!=="")
        {
            const file = new File([audioBlob],blobname)
            fd.append("blobfile",file)
        }
        console.log(video,typeof(video))
        console.log(audio,typeof(audio))
        console.log(videoComment)
        console.log(audioComment)
        const res= await fetch(fileManagementAPI,{
            method: "POST",
            body:fd
        })
        const result = await res.text()
        window.alert(result)
        resetState()
    }

    return(
        <>
        <div>
        <SpinnerCircularFixed enabled={showSpinnner} >?????????</SpinnerCircularFixed>
        </div>
        <h1>&nbsp;Upload new File</h1>
        <form encType='multipart/form-data' >
        <p>&emsp;?????????<input key={videoInputKey} id="video" type="file"  onChange={videoChange} /></p>
        <p id="audio_text">&emsp;?????????<input key={audioInputKey} id="audio" type="file"    onChange={audioChange}/></p>
        <p>&emsp;???????????????????????? ???????????????????????????????????? ??????OK????????????????????????????????????????????????????????????</p>
        <p>&emsp;??????????????????????????????SSML?????? ???????????????????????????????????????????????????</p>
        <p>&emsp;{`???????????????????????????????????????????????????<>&>???????????????SSML??????`}</p>
        <p>&emsp;<a href="https://cloud.google.com/text-to-speech/docs/voices" target="_blank" rel="noreferrer">?????????????????????</a></p>
        <p>&emsp;<a href="https://cloud.google.com/text-to-speech/docs/ssml" target="_blank" rel="noreferrer">SSML????????????</a></p>
        <p>&emsp;?????????<select id="lang" value={langValue} onChange={langChange} >
            {createLagneOption()}
             </select></p>
        <p>&emsp;???????????????<select id="voice" value={voiceValue} onChange={voiceChange}>
            {createVoiceOption()}
            </select></p>
        <p id="slider_text">&emsp;?????????{rate} </p>
        <p>&emsp;<input id="rate" type="range" min="0.5" max="1.5" step="0.1" defaultValue={rate}  onChange={sliderChange}/></p>
        <p>&emsp;???????????????<textarea id="transform_text" cols="100" rows="10" value={transformText} onChange={textChange}></textarea></p>
        <p>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<button type="button" onClick={sendText2Audio}>??????</button></p>
        <audio id='audioplayer' controls src={audioUrl} ></audio>
        <p id="filename" >&emsp;???????????????????????????<input type="text" id="blobname" value={tempblobname} onChange={blobnameChange} /><button type="button" onClick={showBlobName}  >????????????</button>{blobname}</p>
        <p>&emsp;???????????????<input type="text" onChange={videoCommentChange} /></p>
        <p>&emsp;???????????????<input type="text" id='audio_comment'  value={audioComment} onChange={AudioCommentChange} /></p>
        <p>&emsp;<input type="button" defaultValue="??????" onClick={postData} /></p>
        </form>
        </>
    )
}
export default UploadFile