import InputField from "./components/InputField";
import TableFlow from "./components/TableFlow";
import axios from 'axios'
import {useEffect, useState} from 'react'

function App() {
  const [tableInfo, setTableInfo] = useState([]);

  useEffect(()=>{
    fetchData();
  },[])

  const fetchData = async() => {
    try{
      const response = await axios.get('https://67b8889a699a8a7baef4681c.mockapi.io/apimemory');
      setTableInfo(response.data);
      console.log(tableInfo)
    }catch (error){
      console.error(error);
    }
  }
  console.log(tableInfo);

  return (
    <>
      <div className="flex">
        <InputField tableInfo ={tableInfo} fetchData = {fetchData} />
        <TableFlow tableInfo ={tableInfo} fetchData = {fetchData} />
      </div>
    </>
  );
}

export default App;
