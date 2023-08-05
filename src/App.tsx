import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import Layout from "./Layout"
import { RecoilRoot } from 'recoil';


function App() {
  return (
    <RecoilRoot>
      <Layout/>
    </RecoilRoot>
  );
}
export default App;
