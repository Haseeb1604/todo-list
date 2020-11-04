import React from 'react'

// Stateless input Function
const Input =(props)=>{
    const {InputVal,handleKeyPress,handleAddBtn,handleInputChange} = props
    const placeValue = props.placeholder!==undefined?props.placeholder:"Add Value to List"
    return(
        <div className="InputVal">
        {/* User will have an extra option to submit value either on button press or 'Enter' Keypress  */}
        <input type="text" className="Value" value={InputVal} placeholder={placeValue} onChange={handleInputChange} onKeyPress={handleKeyPress}/>
        <input type="button" className="AddBtn" onClick={handleAddBtn} value='Add'/>
        </div>
    )
}

export default Input