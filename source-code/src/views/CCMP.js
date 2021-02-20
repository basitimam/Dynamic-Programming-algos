import React, { useState, useEffect } from "react";
import GenerateTestCase from "../middlewares/function4";
import getFile from "../middlewares/getFile";
import { Table,Button } from "antd";

import { Redirect } from "react-router-dom";



function antdUsecase(rows, cols)
    {
      var j=1;
      var output = "<table border='1' width='500' cellspacing='0'cellpadding='5'>";
      for(let i=1;i<=rows;i++)
      {
    	output = output + "<tr>";
        while(j<=cols)
        {
  		  output = output + "<td>" + i*j + "</td>";
   		  j = j+1;
   		}
   		 output = output + "</tr>";
   		 j = 1;
    }
}
function functionSuper() {
    let n = Math.floor(Math.random() * (100 - 10)) + 10;
    let values = "";
    let weigths = "";
    let intValues = [];
    let intWeights = [];
  
    while (n > 0) {
      let v = Math.floor(Math.random() * (100 - 1)) + 1;
      let w = Math.floor(Math.random() * (100 - 1)) + 1;
      values += v.toString() + " ";
      weigths += w.toString() + " ";
      intValues.push(v);
      intWeights.push(w);
      n--;
    }
  
    let collc = [values, intValues, weigths, intWeights];
    return collc;
  }


function findMinCoins(S, n, N) {
    console.log(S);
    let T = new Array(n + 1);
  
    T[0] = 0; 
  
    for (let i = 1; i <= N; i++) {
     
      T[i] = +2147483647;
      let res = +2147483647;
  
   
      for (let c = 0; c < n; c++) {
    
        if (i - S[c] >= 0) res = T[i - S[c]];
 
        if (res != +2147483647) T[i] = Math.min(T[i], res + 1);
      }
    }
    return T[N];
  }
  

const CCMP = () =>{

    const columns = [
        {
          title: "INPUT ARRAY",
          dataIndex: "testcase",
          width: 100,
       
        },
        {
          title: "CHANGE RESULT",
          dataIndex: "Output",
          fixed: "right",
          width: 50,
        },
      ];
    
      const [dataSource, setDataSource] = useState([]);
      const [globalTestCase, setGlobalTestCase] = useState([]);
      const [tempCase, settempCase] = useState(``);
      useEffect(() => {
        const updateSource = [...dataSource];
        const updateTestCase = [...globalTestCase];
        let TempTestcase = ``;
    
        for (let i = 0; i < 10; i++) {
          let testcase = GenerateTestCase();
    
          updateTestCase.push(testcase[1]);
    
          updateSource.push({
            testcase: testcase[0],
            Output: "",
            key: i,
          });
          TempTestcase = `${TempTestcase} ${testcase[1]} \n`;
        }
        setGlobalTestCase(updateTestCase);
        setDataSource(updateSource);
        settempCase(TempTestcase);
      }, []);
    
      return (
        <div>
          <h1 style={{ textAlign: "center" }}>Coin Change Problem</h1>
     
          <Button
        style={{ marginLeft: 5, marginBottom: 10 }}
        type="primary"
        onClick={() => {
          return getFile(tempCase, "CCPTestCase.txt", "text/plain");
        }}
      >
        GET INPUT FILE.
      </Button>
          <Table className="tables"
            columns={columns}
            dataSource={dataSource}
            onRow={(record) => ({
              onClick: () => {
                let newOutput;
    
                newOutput = findMinCoins(
                  globalTestCase[record.key],
                  globalTestCase[record.key].length,
                  296
                );
    
                let updatedSource = [...dataSource];
    
                updatedSource = updatedSource.map((item) => {
                  if (item.testcase === record.testcase) {
                    return {
                      ...record,
                      Output: newOutput,
                    };
                  } else {
                    return item;
                  }
                });
                setDataSource(updatedSource);
              },
            })}
          />
        </div>
      );

};

export default CCMP;