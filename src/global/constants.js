const APIHost="http://localhost:5000"
const APIRoot =`${APIHost}/api/v1`
export const fileManagementAPI=`${APIRoot}/filemanagement`

export const videosAPI = `${APIRoot}/videos`
export const videoAPI = `${APIRoot}/video`

export const audiosAPI = `${APIRoot}/audios`
export const audioAPI = `${APIRoot}/audio`


export const jobsAPI = `${APIRoot}/jobs`
export const jobAPI = `${APIRoot}/job`

export const ttsListAPI = `${APIRoot}/langlist`
export const ttsAPI =`${APIRoot}/tts`

export const DownloadApi=`${APIHost}/download`


export async function getData(api,setDataFun){
    const res = await fetch(api)
    const data =await res.json()
    setDataFun(data)
}
export async function editData(api,data,setFun){
    console.log(data)
    const res=await fetch(api,{
        method:"PUT",
        headers:{
            'Content-type': 'application/json'
        },
        body: data
    })
    const result= await res.json()
    setFun((prev)=> [...prev.filter(row=>row.id!==result.id),result])
    // window.location.reload()
}
export async function deleteData(api,id,setFun){
    const res=await fetch(`${api}/${id}`,{
        method:"DELETE",
        headers:{
            'Content-type': 'application/json'
        }
    })
    const result= await res.json()
    // reduce(result)
    setFun((prev)=> [...prev.filter(row=>row.id!==result.id)])
    // return result
    // window.location.reload()
}