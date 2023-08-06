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
`;

const PreviewLayout = styled.div`
  font-size: 20px;
  text-align: right;
  height: 10vh;
  vertical-align:middle;
  line-height: 30px;
  color:gray;
`;
export default CalcWindow;