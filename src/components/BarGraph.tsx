import { integer } from 'aws-sdk/clients/cloudfront';
import React, { useEffect, useState } from 'react';

interface BarGraphProps {
  data: number[];
  labels: string[];
  width: number;
  height: number;
  align: boolean;
  colour: boolean;
}

const BarGraph: React.FC<BarGraphProps> = ({ data, labels, width, height, align, colour }) => {
  const barArray = Array(data.length).fill(0)
  const [barSizeVer, setBarSizeVer] = useState<number[]>(barArray)
  const [barSizeHor, setBarSizeHor] = useState<number[]>(barArray)
  const [isVisible, setIsVisible] = useState<boolean[]>(Array.from({length: data.length}))
  // false for horizontal, true for vertical

  // useEffect(() => {
  //   setMaxValue(Math.max(...data));
  // }, [data]);

  useEffect(() => {
    // console.log("Barsize")
    const maxValue = Math.max(...data)

    if (align) {
      setBarSizeVer(barArray);
  
      setBarSizeHor(prevBarSize => (
        data.map(value => (value / maxValue) * 100)
      ));
    } else {
      setBarSizeHor(barArray);
  
      setBarSizeVer(prevBarSize => (
        data.map(value => (value / maxValue) * 100)
      ));
    }

    
  }, [data, align])


  const handleMouseEnter = (event: React.MouseEvent, index: number) => {
    console.log("Here")
    console.log(data[index]);
    const tempArray = [...isVisible]
    tempArray.fill(false)
    tempArray[index] = true;
    setIsVisible(tempArray)
  }

  const handleMouseLeave = (event: React.MouseEvent, index: number) => {
    console.log("There")
    console.log(data[index]);
    const tempArray = [...isVisible]
    tempArray.fill(false)
    setIsVisible(tempArray)
  }
  return (
    <>
      {/* {menuVisible ? <Menu label={menuValue.label} value={menuValue.value} position={menuPosition}></Menu> : <div></div>} */}
      {align ? <div style={{ maxWidth: '60vw', width: '100%', minWidth: '30vw', height, padding: '10px', boxSizing: 'border-box', 
                                  display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'end', paddingBottom: '30px'}}>
        <div></div>
        
        {data.map((value, index) => (
          <div style={{ 
            margin: '0 5px',
            width: '100%',
            height: '100%', 
            position: 'relative',
            display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'end', 
          }}>
          <div
            key={index}
            onMouseEnter={(e) => handleMouseEnter(e, index)}
            onMouseLeave={(e) => handleMouseLeave(e, index)}
            style={{
              height: `${barSizeHor[index]}%`,
              width: '100%',
              backgroundColor: !isVisible[index] ? (colour ? "#DD571C" : "#0062cc") : (colour ? "#e77645" : '#007bff'),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              transition: 'height 1s ease-in-out'
            }}
          >
            {isVisible[index] ? value : ''}
          </div>
          <div style={{
            position: 'absolute',
            transformOrigin: 'top right',
            transform: 'translateX(-50%) translateY(100%) rotate(-30deg)',
            fontSize: '20px'
          }}>{labels[index]}</div>
          </div>
        ))}
      </div> : <div style={{ width, maxHeight: '68vh', height: '100%', minHeight: '35vh', border: '1px solid #ccc', padding: '10px', boxSizing: 'border-box',
                              display: 'flex', flexDirection: 'column', paddingBottom: '10px'}}>
        {data.map((value, index) => (
          <div style={{
            width: '100%', 
            position: 'relative',
            display: 'flex', flexDirection: 'column', 
          }}>
          <div
            key={index}
            onMouseEnter={(e) => handleMouseEnter(e, index)}
            onMouseLeave={(e) => handleMouseLeave(e, index)}
            style={{
              width: `${barSizeVer[index]}%`,
              height: '30px',
              backgroundColor: !isVisible[index] ? (colour ? "#DD571C" : "#0062cc") : (colour ? "#e77645" : '#007bff'),
              margin: '5px 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              transition: 'width 1s ease-in-out'
            }}
          >
            {isVisible[index] ? value : ""}
          </div>
          {/* <div className="tooltip">{data}</div> */}
          
          <div style={{
            position: 'absolute',
            transformOrigin: 'top right',
            transform: 'translateX(-100%) translateX(-20px) translateY(8px)',
            fontSize: '20px'
          }}>{labels[index]}</div>
          </div>
        ))}
      </div>}
    </>
  );
};

export default BarGraph;