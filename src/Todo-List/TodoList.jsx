import React, { Component } from 'react'
import Table from './Table.jsx'
import Input from './Input.jsx'
import './TodoList.css'


class TodoList extends Component {
    constructor(){
        super()
        let listval=[]
        if(localStorage.list){
            let val = localStorage.getItem('list')
            listval = JSON.parse(val)
        }else{
            localStorage.setItem("list",JSON.stringify(listval))
        }
        this.state={
            List : listval,
            InputVal : "",
            EditVal : "",
            editID: 0,
            isEdit : false
        }

    }
    getDate=()=>{
        let today = new Date()
        // the time user inserted the value
        return  `${this.AddZero(today.getDate())}/${this.AddZero(today.getMonth()+1)} | ${this.AddZero(today.getHours())}:${this.AddZero(today.getMinutes())}:${this.AddZero(today.getSeconds())}`
    }
    // Adding Zero to Time value with single digit
    AddZero=(val)=>{
        val = (val<10)? "0" + val : val;
        return val
    }
    // Adding User value to List
    handleAddBtn=()=>{
        // the value should not be Empty 
        if(this.state.InputVal!==''){
            const date = this.getDate()
            // objID should be unique so ID will be increment of previous ID if previous ID is not defined the 1
            let objID = this.state.List.length===0?1:this.state.List[this.state.List.length-1].ID+1
            let updatedList = this.state.List
            // Updating the list
            updatedList.push({
                date,
                Val: this.state.InputVal,
                ID: objID
            })
            this.setState({List: updatedList,InputVal: ''},()=>localStorage.setItem("list",JSON.stringify(this.state.List)))
        }
    }
    // give result on Enter keypress
    handleKeyPress=(event)=>{
        if(event.key==='Enter'){
            this.handleAddBtn()
        }
    }
    // assign user input value to InputVal
    handleInputChange=(event)=>{
        this.setState({InputVal:event.target.value})
    }
    
    // filter the list and remove element of given id
    handleDelete=id=>{
       const updatedList = this.state.List.filter(item=>item.ID!==id)
       this.setState({List: updatedList},()=>localStorage.setItem("list",JSON.stringify(this.state.List)))
    }

    handleEditChange=(event)=>{
        this.setState({EditVal:event.target.value})
    }

    handleEditBtn=(ID)=>{
        this.setState({isEdit: true,editID: ID})
    }

    AddEditedValue=()=>{
        let tempList = this.state.List
        for(let i=0; i<this.state.List.length; i++){
            if(tempList[i].ID===this.state.editID){
                tempList[i].Val = this.state.EditVal
                break
            }
        }
        this.setState({List: tempList,isEdit: false,EditVal: ''})
    }

    render() {
        const {List, InputVal} = this.state
        return (
            <div className="ListItems">
              <h3 className="heading">Todo List</h3>

              <Input  
                InputVal={InputVal}  
                handleAddBtn={this.handleAddBtn} 
                handleInputChange={this.handleInputChange} 
                handleKeyPress={this.handleKeyPress}
                />
              
              <Table list={List} handleDelete={this.handleDelete} handleEdit={this.handleEditBtn} isEdit={this.state.isEdit} >
                  <Input 
                    InputVal={this.state.EditVal} 
                    handleAddBtn={this.AddEditedValue} 
                    handleInputChange={this.handleEditChange}
                    placeholder='edit'
                    />
              </Table>
            </div>
        )
    }
}

export default TodoList