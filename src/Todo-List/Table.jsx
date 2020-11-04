import React from 'react';
     
const Table=(props)=>{
    const {list,handleDelete,isEdit,handleEdit} = props
    return (
        <table className="list">
            <tbody>
             {isEdit?
             <tr>
                 <td>{props.children}</td>
             </tr>
             :
             list.map(item=>
                <tr key={item.ID}>
                    <td>{item.date}</td>
                    <td><span>{item.Val}</span></td>
                    <td>
                        <button className="DeleteItem" onClick={()=>handleDelete(item.ID)}>Delete</button>
                        <button className="EditItem" onClick={()=>handleEdit(item.ID)}>Edit</button>
                    </td>
                </tr>
             )
            }
            </tbody>
        </table>
    );
}

export default Table