import React, { useState, useEffect } from "react";
import GenerateTestCase from "../middlewares/function4";
import { Table,Button } from "antd";
import getFile from "../middlewares/getFile";


function except() {
    let n = Math.floor(Math.random() * (100 - 30)) + 30;
    let testCase = "";
    let array = [];
    while (n > 0) {
      let i = Math.floor(Math.random() * 101);
      testCase += i.toString() + " ";
      array.push(i);
      n--;
    }
    let collc = [testCase, array];
    return collc;
  }

  function createscenario(rows, cols)
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

  function subsetSum(arr, n, sum) {
  
    let T = new Array(n + 1);
  
    for (let i = 0; i < n + 1; i++) {
      T[i] = new Array(sum + 1);
    }
    for (let j = 1; j <= sum; j++) T[0][j] = false;

    for (let i = 0; i <= n; i++) T[i][0] = true;

    for (let i = 1; i <= n; i++) {
     
      for (let j = 1; j <= sum; j++) {
    
        if (arr[i - 1] > j) T[i][j] = T[i - 1][j];

        else T[i][j] = T[i - 1][j] || T[i - 1][j - arr[i - 1]];
      }
    }

    return T[n][sum];
  }
  
  function partition(arr, n) {
    let sum = 0;
    for (let i = 0; i < n; i++) sum += arr[i];
  
   
    return !(sum & 1) && subsetSum(arr, n, sum / 2);
  }

const PP = () =>{
    const columns = [
        {
          title: "INPUT ARRAY",
          dataIndex: "testcase",
          width: 1300,
          
          ellipsis: true,
        },
        {
          title: "RESULTS",
          dataIndex: "Output",
          fixed: "right",
          width: 200,
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
        }
        setGlobalTestCase(updateTestCase);
        setDataSource(updateSource);
        settempCase(TempTestcase);
      }, []);
    
      return (
        <div>
          <h1 style={{ textAlign: "center" }}>Partition Problem</h1>
          <Button
        style={{ marginLeft: 5, marginBottom: 10 }}
        type="primary"
        onClick={() => {
          return getFile(tempCase, "PPTestCase.txt", "text/plain");
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
    
                
                if (
                  partition(
                    globalTestCase[record.key],
                    globalTestCase[record.key].length
                  ) == true
                )
                  newOutput = "can be divided";
                else newOutput = "cannot be divided";
    
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

export default PP;