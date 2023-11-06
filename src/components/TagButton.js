// import SearchOutlined from '@material-ui/icons/SearchOutlined';
import classes from './TagButton.module.css';
import { useState, useEffect } from 'react';
const TagButton = (props) => {
  const [select, setSelect]= useState()

//   useEffect(()=>{
//     props.onsave(select)
//   }, [select])
 
  return (
    <div>
     
     <select name="tags" id="tags" className={classes.button} value={select} onChange={(event) => setSelect(event.target.value)}>
     <option value="festive specail" name="frestive specail" >Festival Special</option>

        <option value="traditional" name="traditional">Traditional</option>
        <option value="festive specail" name="frestive specail" >Western</option>
        <option value="other" name="other">Others</option>

    </select>
    </div>
  );
};

export default TagButton;