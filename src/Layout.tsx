import "./App.css";
import Button from "./Button"
import CalcWindow from "./CalcWindow"
import ExportData from "./ExportData"
import ImportData from "./ImportData"

import styled from "styled-components";
import { useRecoilState } from 'recoil';

import {historyArrayState} from './Button';

interface Item {
  id: string
  label: string
  val: string
  memo: string
}

const Layout = () => {
  const [historyArray, sethistoryArray] = useRecoilState(historyArrayState);
  const deleteItem = (item:Item) => {
    const index = historyArray.findIndex((listItem:Item) => listItem.id === item.id);
    const newhistoryArray = [
      ...historyArray.slice(0, index),
      ...historyArray.slice(index + 1),
    ];
    sethistoryArray(newhistoryArray);
  };
  const changeLabel = (event:any,item:Item) =>{
    const index = historyArray.findIndex((listItem:Item) => listItem.id === item.id);
    const newhistoryArray = [
      ...historyArray.slice(0, index),
      {
        id:historyArray[index].id,
        label:historyArray[index].label,
        val:historyArray[index].val,
        memo:event.target.value,
      },
      ...historyArray.slice(index + 1),
    ];
    sethistoryArray(newhistoryArray);
    ;   
  }
  return (
    <TopLayout>
      <MainLayout>
        <CalcWindow/>
        <ButtonsLayout>
          <Row>
            <Button name="CE"/>
            <Button name="C"/>
            <Button name="%"/>
            <Button name="←"/>
            <Button name="÷"/>
          </Row>
          <Row>
            <Button name="7"/>
            <Button name="8"/>
            <Button name="9"/>
            <Button name="×"/>
          </Row>
          <Row>
            <Button name="4"/>
            <Button name="5"/>
            <Button name="6"/>
            <Button name="-"/>
          </Row>
          <Row>
            <Button name="1"/>
            <Button name="2"/>
            <Button name="3"/>
            <Button name="+"/>
          </Row>
          <Row>
            <Button name='+/-'/>
            <Button name='0'/>
            <Button name='.'/>
            <Button name="="/>
          </Row>
        </ButtonsLayout>
      </MainLayout>
      <SubLayout>
        <h2>履歴</h2>
        <ExportData/>
        <ImportData/>

      {historyArray.map((item:Item) => {
        return (
          <Item key={item.id}>
            <ItemRow>
              <ItemStyle>
              {item.label}
              </ItemStyle>
              <CloseButtonStyle>
                <CloseButton onClick={() =>deleteItem(item)}>×</CloseButton>
              </CloseButtonStyle>
            </ItemRow>
            <Label placeholder="メモ" value ={item.memo} onChange={(e) =>changeLabel(e,item)}></Label>
          </Item>
        );
      })}
      </SubLayout>
  </TopLayout>
  );
}
const TopLayout = styled.div`
  display:flex;
`;
const MainLayout = styled.div`
  flex-direction: column;
  align-items: flex-end;
  height:98vh;
  width:150vh;
`;
const Row = styled.div`
  display:flex;
  min-height:80px;
  padding: 0.2rem;
`;
const ButtonsLayout = styled.div`
  align-items: flex-end;
  height:40vh;
`;

const SubLayout = styled.div`
  flex-direction: column;
  text-align: center;
  height:98vh;
  width:40vh;
`;

const Label = styled.input`
  margin:5px;
`;
const Item = styled.div`
padding: 1em 1.5em;
margin: 1em 0;
background-color:#f4f9ff;
border:1px solid #84c1ff;
box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
color:#000000;
`;
const ItemRow = styled.div`
  display:flex;
`;

const ItemStyle = styled.div`
  width:150vh;
`;
const CloseButtonStyle = styled.div`
  width:100px;
  text-align: left;
`;

const CloseButton = styled.div`
font-size: 100%;/*ボタンの大きさ*/
font-weight: bold;
border: 1px solid #999;
color: #999;
display: flex;
justify-content: center;
align-items: center;
border-radius: 100%;
width: 1.3em;
line-height: 1.3em;
cursor: pointer;
transition: .2s;
&:hover {
  background: #333;
  border-color: #333;
  color: #FFF;
}
`;
export default Layout;
