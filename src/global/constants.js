const APIHost ="http://localhost:5000/api/v1"
export const fileManagementAPI=`${APIHost}/filemanagement`

export const videosAPI = `${APIHost}/videos`
export const videoAPI = `${APIHost}/video`

export const audiosAPI = `${APIHost}/audios`
export const audioAPI = `${APIHost}/audio`


export const jobsAPI = `${APIHost}/jobs`
export const jobAPI = `${APIHost}/job`

export const ttsListAPI = `${APIHost}/langlist`
export const ttsAPI =`${APIHost}/tts`




export async function getData(api,setDataFun){
    const res = await fetch(api)
    const data =await res.json()
    setDataFun(data)
}
export async function editData(api,data){
    console.log(data)
    const res=await fetch(api,{
        method:"PUT",
        headers:{
            'Content-type': 'application/json'
        },
        body: data
    })
    const result= await res.json()
    return window.location.reload()
}
export async function deleteData(api,id){
    const res=await fetch(`${api}/${id}`,{
        method:"DELETE",
        headers:{
            'Content-type': 'application/json'
        }
    })
    const result= await res.json()
    return window.location.reload()
}