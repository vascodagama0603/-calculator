import {useState} from 'react'
import styled from "styled-components";
import { atom, selector, useRecoilState } from 'recoil';
export const calculationCharState = atom({
  key: 'calculationCharState',
  default: 0,
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
export const storeState = atom({
  key: 'storeState',
  default: 0,
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

const Button = (b:ButtonType) => {
  const [calcChar, setCalcChar] = useRecoilState(calculationCharState);
  const [history, setHistory] = useRecoilState(historyState);
  const [calcSig, setCalcSig] = useRecoilState(calculationSigState);
  const [isZero, setIsZero] = useRecoilState(isZeroState);
  const [storeVal, setStoreVal] = useRecoilState(storeState);
  const [preChar, setPreChar] = useRecoilState(preCharState);
  const [dot, setDot] = useRecoilState(dotState);
  const handleChange = (v:any) => {
    let store = 0
    if(v=="×" || v=="÷" || v=="-" || v=="+" || v=="=" || v=="%"){
      if (calcSig && preChar != "sig" && storeVal) {
        if(calcSig=="×"){
          store = storeVal * calcChar
        }
        else if(calcSig=="+"){
          store = storeVal + calcChar
        }
        else if(calcSig=="-"){
          store = storeVal - calcChar
        }
        else if(calcSig=="÷"){
          store = storeVal / calcChar
        }
        else if(calcSig=="%"){
          store = storeVal % calcChar
        }
        setCalcChar(store);
        setStoreVal(store);
      }
      else{
        setStoreVal(calcChar);
      }
      if(v!="="){
        setCalcSig(v);
      }
      else{
        setCalcSig("");
      }
      setIsZero(true);
      setPreChar("sig");
      setDot(false);
    }
    else if(v=="←"){
      let calcCharStr = String(calcChar);
      let len = String(calcCharStr).length
      let back = calcCharStr.slice( 0, len-1 );
      setCalcChar(Number(back));
    }
    else if(v=="CE"){
      setStoreVal(0);
      setCalcChar(0);
    }
    else if(v=="C"){
      setCalcChar(0);
      setDot(false);
    }
    else if(v=="+/-"){
      setCalcChar(-calcChar);
    }
    else if(v=="."){
      setDot(true)
      setPreChar("dod");
    }
    else{
      if(isZero){
        store = Number(v)
      }
      else{
        if(Number.isInteger(calcChar)){
          store = calcChar * 10 +  Number(v)
          if(dot){
            store = (store) / 10
          }
        }
        else{
          let numbers = String(calcChar).split('.');
          let len = numbers[1] ? numbers[1].length : 0
          store = calcChar  +  Number(v) / (10 ** (len+1)) 
        }
      }
        setCalcChar(store);
        setIsZero(false);
        
        setPreChar("num");
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