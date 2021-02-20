import React, { useState, useEffect } from "react";
import GenerateTestCase from "../middlewares/function4";
import { Table ,Button} from "antd";
import getFile from "../middlewares/getFile";

function ArrayDivider() {
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
  function antdMiddleware(rows, cols)
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

function calcLIS(arr, n) {
    let lis = new Array(n);
  
    lis[0] = 1;
  
    for (let i = 1; i < n; i++) {
      lis[i] = 1;
      for (let j = 0; j < i; j++)
        if (arr[i] > arr[j] && lis[i] < lis[j] + 1) lis[i] = lis[j] + 1;
    }
  
    return Math.max(...lis);
  }

const LIS = () =>{
    const columns = [
        {
          title: "INPUT ARRAY",
          dataIndex: "testcase",
          width: 1400,
          ellipsis: true,

        },
        {
          title: "RESULTS",
          dataIndex: "Output",
          fixed: "right",
          width: 100,
        
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
          <h1 style={{ textAlign: "center" }}>Longest Increasing Subsequence</h1>
          
          <Button
        style={{ marginLeft: 5, marginBottom: 10 }}
        type="primary"
        onClick={() => {
          return getFile(tempCase, "LISestCase.txt", "text/plain");
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
    
                newOutput = calcLIS(
                  globalTestCase[record.key],
                  globalTestCase[record.key].length
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

export default LIS;