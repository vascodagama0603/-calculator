import styled from "styled-components";
import { atom, useRecoilValue } from 'recoil';
import {calculationCharState,historyState,historyArrayState} from './Button';


const CalcWindow = () => {
  const calcChar = useRecoilValue(calculationCharState);
  const history = useRecoilValue(historyState);
  return (
    <>
      <MainLayout>
        <PreviewLayout>{history}</PreviewLayout>
        <WindowLayout>{calcChar}</WindowLayout>
      </MainLayout>

    </>
  )
}
const MainLayout = styled.div`
`;
const WindowLayout = styled.div`
  font-size: 40px;
  text-align: center;
  height: 25vh;
  vertical-align:middle;
  line-height: 50px;
  word-break: break-all;
`;

const PreviewLayout = styled.div`
  font-size: 20px;
  text-align: right;
  height: 15vh;
  vertical-align:middle;
  line-height: 30px;
  color:gray;
  overflow-wrap: break-word;
`;
export default CalcWindow;