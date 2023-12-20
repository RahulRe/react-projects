import styles from "./App.module.css"
import Display from "./components/Display"
import ButtonContainer from "./components/ButtonContainer"
import { useState } from "react"
function App() {
 let [calVal,setCalVal] = useState("")
 const onButtonClick=(buttonName)=>{
  if (buttonName==='C'){
    setCalVal("");
  }else if (buttonName==="="){
    const res=eval(calVal);
    setCalVal(res);
  }else{
    const newDispalyVal = calVal+buttonName;
    setCalVal(newDispalyVal);
  }
}

  return (
    <div className={styles.calculator}>
      <Display displayValue={calVal}/>
      <ButtonContainer onButtonClick={onButtonClick}/>

    </div>
  )
}

export default App
