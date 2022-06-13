import {deleteData,editData} from '../global/constants'
import {v4} from "uuid"
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
    const editClick=(id,comment)=>{
        comment = window.prompt("請輸入要修改的comment")
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
    const createTd = ()=>{
        const trs = []
        data.forEach((item) =>{
            const tds=[]
            tds.push(<td key="delete"><button  onClick= {()=>deleteClick(item.id)}>刪除</button></td>)
            Object.keys(item).forEach((key) =>{
                tds.push(<td key={key} >{item[key]}</td>)
            })

            tds.push(<td key="edit"><button  onClick={()=>editClick(item.id,null)}>修改comment</button></td>)
            trs.push(<tr key={v4()}>{tds}</tr>)
        })
       return trs
    }
    return(
        
        <table align="center" border="1" cellPadding="8" cellSpacing="3" >
            <tbody>
                <tr>
                    <th key="deleteText">刪除</th>
                    {createTh()}
                    <th key="editText">修改comment</th>
                </tr>
                {createTd()}
            </tbody>
            {console.log(dataApi)}
        </table>
    )
}
export default Table