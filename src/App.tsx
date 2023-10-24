import React, { useEffect, useState } from 'react';
import BarGraph from './components/BarGraph';
import './App.css';

function App() {
  const [alignment, setAlignment] = useState<boolean>(false);
  const [colour, setColour] = useState<boolean>(false);
  const handleAlignCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAlignment(!alignment);
  }
  const handleColourCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColour(!colour);
  }
  const data = [10, 20, 5, 30, 15, 10, 20, 5, ];
  const labels = ['Apple', 'Orange', 'Banana', 'Cherry', 'Kiwi', 'Watermelon', 'Pineapple', 'Strawberry'];


  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{marginTop:"0px", marginBottom: "10px"}}>Bar Graph Generator</h1>
        
        <div style={{width: '500px', height: '100%', border: '1px solid #ccc', padding: '5px', boxSizing: 'border-box', margin: '20px',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '30px'}}>
          <div style={{margin: '2px', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <label style={{fontSize:'20px', textAlign: 'center', marginBottom: '3px'}}>Change Orientation</label>
          <input 
            type="checkbox" 
            checked={alignment} 
            onChange={handleAlignCheckboxChange}
            style={{}}></input>
          </div>
          <div style={{margin: '2px', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <label style={{fontSize:'20px', textAlign: 'center', marginBottom: '3px'}}>Change Colour</label>
          <input 
            type="checkbox" 
            checked={colour} 
            onChange={handleColourCheckboxChange}
            style={{}}></input>
          </div>
        </div>
        
        
        <BarGraph data={data} labels={labels} width={500} height={420} align={alignment} colour={colour}></BarGraph>
      </header>
    </div>
  );
}

export default App;
