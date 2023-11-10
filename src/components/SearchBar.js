import React, { Fragment } from 'react'
import { useState, useEffect, useCallback } from 'react';
import UserList from '../UserList/UserList';
import classes from './SearchBar.module.css'
import ClearIcon from '@material-ui/icons/Clear';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import Navbar from '../Navbar/Navbar';
const SearchBar=() =>{
    
    const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const[searchedData, setSearchedData] = useState([]);
  const[inputData, setInputData] = useState("")
  const[query, setQuery]=useState('test')
  const[tagss, setTag] = useState('story')
    const searchHandler = (event)=>{
        const enterdata = event.target.value;
        setInputData(enterdata)
        const possibleData = data.filter((data)=>{
            return data.title.toLowerCase().includes(event.target.value.toLowerCase());
        })
        if(enterdata === ""){
            setSearchedData([]);
        }
        else{
        setSearchedData(possibleData)
        }
    }

  const fetchDataHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://hn.algolia.com/api/v1/search?query=${query}&tags=${tagss}` );
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      const transformedData = data.hits.map((postData) => {
        return {
          title: postData.title,
          objectID:postData.objectID,
        };
      });
    
      setData(transformedData);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [query, tagss]);


  useEffect(() => {
    fetchDataHandler();
  }, [fetchDataHandler]);

  let content = <h1>Found no data.</h1>;

  if (error) {
    content = <p>{error}</p>;
  }

  else if (isLoading) {
    content = <p>Loading...</p>;
  }
  else if(data.length === 0){
    content = <p>Loading...</p>;
  }
  else if(searchedData.length===0){
    content = <UserList users={data} />;
  

  }
  else if (searchedData.length > 0) {
    content = <UserList users={searchedData} />;
  }

 const clearInputData =(event)=>{
     setSearchedData([])
     setInputData("")
 }

//  const submitHandler=(event)=>{
//      setQuery(event.target.value)
//  }
 
 const getDataHandler=(data)=>{
   console.log(data);
   setTag(data);
 }
 const getInputHandler=(data)=>{
   setQuery(data);
 }
    
    return (
        <Fragment>
        <Navbar onGetData = {getDataHandler} onInputData = {getInputHandler}/>
        <div className={classes['search-container']}>

        <div className={classes.search}>
        <div className={classes.icon}>
        {searchedData.length===0?<SearchOutlinedIcon/>:<ClearIcon className={classes.clear} onClick={clearInputData}/>}
        </div>
      <input type="text" className = {classes.input} placeholder="Search.." name="search" value ={inputData} onChange={searchHandler} />
      </div>
      {content}
        </div>
        </Fragment>
    )
}

export default SearchBar