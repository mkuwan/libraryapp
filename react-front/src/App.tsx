import React from 'react';
import logo from './logo.svg';
import './App.css';
import TopBar, {MailInfoProps} from "./components/TopBar";

function App() {

    const demoMailInfo: MailInfoProps[] = [
        {
            num: 1,
            content: 'メールその1だよ'
        },
        {
            num: 2,
            content: 'メールその2'
        }
    ]


  return (
    <div className="App">
      <TopBar mailProps={demoMailInfo}/>
    </div>
  );
}

export default App;
