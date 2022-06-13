import {deleteData,editData} from '../global/constants'
import {v4} from "uuid"
import {DownloadApi} from '../global/constants'
function Table ({tableName,data,dataApi}){

    const createTh=() =>{
        const ths=[]
        if (data.length===0)
            return 
        Object.keys(data[0]).forEach((header)=>(
           ths.push(<th key={header}>{header}</th>)
       ))
       return ths
    }
    const deleteClick=(id)=>{
        deleteData(dataApi,id)
    }
    const editClick=(id)=>{
        const comment = window.prompt("請輸入要修改的comment")
        if (comment != null)
        {
            const data={}
            data[`${tableName}_id`]=id
            data[`${tableName}_comment`]=comment
            const jsonData = JSON.stringify(data)
            console.log(data)
            editData(dataApi,jsonData)
        }
        console.log(id)
    }
    const downloadClick=(path)=>{
        const downloadUrl=`${DownloadApi}/${path}`
        console.log(downloadUrl)
        window.open(downloadUrl,"_blank")
    }
    const createTd = ()=>{
        const trs = []
        data.forEach((item) =>{
            const tds=[]
            tds.push(<td align='center' key="delete"><button  onClick= {()=>deleteClick(item.id)}>刪除</button></td>)
            Object.keys(item).forEach((key) =>{
                if(Number.isInteger(item[key])!==true && typeof(item[key])==="number")
                    tds.push(<td align='center' key={key} >{parseFloat(item[key]).toFixed(2)}</td>)
                else
                    tds.push(<td align='center' key={key} >{item[key]}</td>)
            })

            tds.push(<td align='center' key="edit"><button  onClick={()=>editClick(item.id)}>修改comment</button></td>)
            if (item.path!==null)
                tds.push(<td align='center' key="download"><button onClick={()=>downloadClick(item.path)}  >下載</button></td>)
            else
                tds.push(<td align='center' key="download">wait</td>)
            trs.push(<tr key={v4()}>{tds}</tr>)
        })
       return trs
    }
    return(
        
        <table  align="center" border="1" cellPadding="5" cellSpacing="3" >
            <tbody>
                <tr>
                    <th key="deleteText">刪除</th>
                    {createTh()}
                    <th key="editText">修改comment</th>
                    <th key="downloadText">下載</th>
                </tr>
                {createTd()}
            </tbody>
            {console.log(dataApi)}
        </table>
    )
}
export default Table