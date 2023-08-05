import {useEffect} from 'react'
import styled from "styled-components";
import { atom, selector, useRecoilState } from 'recoil';
import BigNumber from "bignumber.js";
import { v4 as uuidv4 } from 'uuid';
import internal from 'stream';
export const calculationCharState = atom({
  key: 'calculationCharState',
  default: "0",
});

export const calculationSigState = atom({
  key: 'calculationSigState',
  default: "",
});
export const isZeroState = atom({
  key: 'isZeroState',
  default: false,
});
export const historyState = atom({
  key: 'historyState',
  default: "",
});
export const historyArrayState = atom<Item[]>({
  key: 'historyArrayState',
  default: [],
});
export const storeState = atom({
  key: 'storeState',
  default: "",
});
export const preCharState = atom({
  key: 'preCharState',
  default: "",
});
export const dotState = atom({
  key: 'dotState',
  default: false,
});
interface ButtonType{
  name:String
}
interface Item {
  id: string
  label: string
  val: string
  memo: string
}

const Button = (b:ButtonType) => {
  const [calcChar, setCalcChar] = useRecoilState(calculationCharState);
  const [history, setHistory] = useRecoilState(historyState);
  const [historyArray, setHistoryArray] = useRecoilState(historyArrayState);
  const [calcSig, setCalcSig] = useRecoilState(calculationSigState);
  const [isZero, setIsZero] = useRecoilState(isZeroState);
  const [storeVal, setStoreVal] = useRecoilState(storeState);
  const [preChar, setPreChar] = useRecoilState(preCharState);
  const handleKeyDown = (e: KeyboardEvent) => {
    handleChange(e.key);
    }    
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, false)
    return () => {
      document.removeEventListener("keydown", handleKeyDown, false);
    }
  }, [handleKeyDown])   
  const handleChange = (v:any) => {
    if(!isNaN(v)){
      if (isZero){
        setCalcChar(v)
        setIsZero(false);
      }
      else if (calcChar == "0"){
        setCalcChar(v)
      }
      else{
        setCalcChar(calcChar + v)          
      }        
      setPreChar("num");
      
    }
    else if(v=="."){
    if (calcChar.indexOf('.') == -1){
      setCalcChar(calcChar + v)
    }
    else if(isZero){
      setCalcChar("0" + v)    
      setIsZero(false);  
    }
    setPreChar("num");
    }
    else if(v=="*" || v=="×" || v=="÷" || v=="/" || v=="-" || v=="+" || v=="=" || v=="%"|| v=="Enter"){
      let store = BigNumber(0)
      let isCalc = false;
      if (calcSig && preChar != "sig" && storeVal) {
        let a = BigNumber(parseFloat(storeVal));
        let b = BigNumber(parseFloat(calcChar));
        if(calcSig=="×" || calcSig=="*"){
          store = a.times(b);
        }
        else if(calcSig=="+"){
          store = a.plus(b);
        }
        else if(calcSig=="-"){
          store = a.minus(b);
        }
        else if(calcSig=="÷" || calcSig=="/"){
          store = a.div(b);
        }
        else if(calcSig=="%"){
          store = a.mod(b);
        }
        setCalcChar(String(store));
        setStoreVal(String(store));
        isCalc = true;
      }
      else{
        setStoreVal(calcChar);
      }
      if(v=="=" || v=="Enter"){
        setCalcSig("");
      }
      else{
        setCalcSig(v);
      }
      setPreChar("sig");
      setIsZero(true);

      let txt = ""
      if(isCalc){
        txt = storeVal + " " + calcSig + " " + calcChar + " " + " = "+ String(store)
        setHistoryArray(previous => [
          {
              id: uuidv4(),
              label:txt,
              val:String(store),
              memo:""
          },
          ...previous])
      }
      else{
        txt = calcChar + " " + v
      }
      setHistory(txt);
    }
    else if(v=="←" || v == "Backspace"){
      let back = calcChar.slice( 0, calcChar.length-1 );
      if (back.slice( -1 ) == "."){
        back = back.slice( 0, back.length-1 );
      }
      else if(back.length==0){
        back = "0"
      }
      
      setCalcChar(back);
      setIsZero(false);
    }
    else if(v=="C" ||v=="Delete"){
      setStoreVal("");
      setCalcChar("0");
      setIsZero(false);
      setHistory("");
    }
    else if(v=="CE"){
      setCalcChar("0");
      setIsZero(false);
    }
    else if(v=="+/-"){
      if (calcChar.charAt(0) == "-"){
        setCalcChar(calcChar.slice(1));
      }
      else{
        setCalcChar("-" + calcChar);
      }
      setIsZero(true);
    }
  }
  return (
    <ButtonLayout onClick={() => handleChange(b.name)}>{b.name}</ButtonLayout>
  )
}
const ButtonLayout = styled.button`
  text-align: center;
  color: Black;
  width: 100%;
`;

export default Button;