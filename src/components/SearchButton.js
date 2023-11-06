// import SearchOutlined from '@material-ui/icons/SearchOutlined'
import { Button } from '@mui/material'
import classes from './SearchButton.module.css'
import React from 'react'
import { useState } from 'react'
import { SearchOffOutlined } from '@mui/icons-material'
function SearchButton(props) {
  const[value, setValue]=useState()
  const changeHandler = (event)=>{
       setValue(event.target.value)
  }
  const submitHandler=(event)=>{
    // console.log(value)
    props.onInputData(value)
  }
    return (
        <div>
            <div className={classes.button}>
      <span className={classes.icon}>
        <SearchOffOutlined onClick={submitHandler}/>
      </span>
      <input className="queryinp" type = "text" placeholder="Search for best" onChange={changeHandler}/>
    </div>
        </div>
    )
}

export default SearchButton