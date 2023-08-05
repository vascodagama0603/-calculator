import styled from "styled-components";
import {useRecoilValue } from 'recoil';
import {historyArrayState} from './Button';
import CsvDownloadButton from 'react-json-to-csv'
const ExportData = () => {
  const historyArray = useRecoilValue(historyArrayState);
  return (
    <Layout>
    <ButtonLayout delimiter="," data={historyArray} >Save</ButtonLayout>
    </Layout>
  )
}

const ButtonLayout = styled(CsvDownloadButton)`
  alignItems: center;
  flexDirection: column;
  width: 100%;
`;

const Layout = styled.div`
  padding-bottom:1rem;
`;
export default ExportData;