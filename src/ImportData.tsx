import styled from "styled-components";
import {useRecoilState} from 'recoil';
import React, { useState, CSSProperties } from 'react';
import {
  useCSVReader,
  lightenDarkenColor,
  formatFileSize,
} from 'react-papaparse';
import {historyArrayState} from './Button';

const GREY = '#CCC';
const GREY_LIGHT = 'rgba(255, 255, 255, 0.4)';
const DEFAULT_REMOVE_HOVER_COLOR = '#A01919';
const REMOVE_HOVER_COLOR_LIGHT = lightenDarkenColor(
  DEFAULT_REMOVE_HOVER_COLOR,
  40
);
const GREY_DIM = '#686868';

const styles = {
  zone: {
    background:"white",
    alignItems: 'center',
    border: `2px dashed ${GREY}`,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    height: '1%',
    justifyContent: 'center',
    padding: 20,
  } as CSSProperties,
  file: {
    background: 'linear-gradient(to bottom, #EEE, #DDD)',
    borderRadius: 20,
    display: 'flex',
    height: 30,
    width: 120,
    position: 'relative',
    zIndex: 10,
    flexDirection: 'column',
    justifyContent: 'center',
  } as CSSProperties,
  info: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
  } as CSSProperties,
  size: {
    backgroundColor: GREY_LIGHT,
    borderRadius: 3,
    marginBottom: '0.5em',
    justifyContent: 'center',
    display: 'flex',
  } as CSSProperties,
  name: {
    backgroundColor: GREY_LIGHT,
    borderRadius: 3,
    fontSize: 12,
    marginBottom: '0.5em',
  } as CSSProperties,
  zoneHover: {
    borderColor: GREY_DIM,
  } as CSSProperties,
  default: {
    borderColor: GREY,
  } as CSSProperties,
  remove: {
    height: 3,
    position: 'absolute',
    right: 6,
    top: 6,
    width: 23,
  } as CSSProperties,
};
const ImportData = () => {
  const { CSVReader } = useCSVReader();
  const [zoneHover, setZoneHover] = useState(false);
  const [removeHoverColor, setRemoveHoverColor] = useState(
    DEFAULT_REMOVE_HOVER_COLOR
  );
  const [historyArray, sethistoryArray] = useRecoilState(historyArrayState);
  return (
    <CSVReader
      onUploadAccepted={(results: any) => {
        sethistoryArray(results.data);
        setZoneHover(false);
      }}
      onDragOver={(event: DragEvent) => {
        event.preventDefault();
        setZoneHover(true);
      }}
      onDragLeave={(event: DragEvent) => {
        event.preventDefault();
        setZoneHover(false);
      }}
      config={
        {
          header: true,
        }
      }
    >
      {({
        getRootProps,
        acceptedFile,
        getRemoveFileProps,
        Remove,
      }: any) => (
        <>
          <div
            {...getRootProps()}
            style={Object.assign(
              {},
              styles.zone,
              zoneHover && styles.zoneHover
            )}
          >
            {acceptedFile ? (
              <>
                <div style={styles.file}>
                  <div style={styles.info}>
                    <span style={styles.size}>
                      {formatFileSize(acceptedFile.size)}
                    </span>
                    <span style={styles.name}>{acceptedFile.name}</span>
                  </div>
                  <div
                    {...getRemoveFileProps()}
                    style={styles.remove}
                    onMouseOver={(event: Event) => {
                      event.preventDefault();
                      setRemoveHoverColor(REMOVE_HOVER_COLOR_LIGHT);
                    }}
                    onMouseOut={(event: Event) => {
                      event.preventDefault();
                      setRemoveHoverColor(DEFAULT_REMOVE_HOVER_COLOR);
                    }}
                  >
                    <Remove color={removeHoverColor} />
                  </div>
                </div>
              </>
            ) : (
              'upload'
            )}
          </div>
        </>
      )}
    </CSVReader>
  );
}
export default ImportData;