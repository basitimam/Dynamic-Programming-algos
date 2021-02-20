import React, { useState, useEffect } from "react";
import GenerateTestCase from "../middlewares/function4";
import { Table,Button } from "antd";
import getFile from "../middlewares/getFile";

function createTable(rows, cols)
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
function SuperFunction() {
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
  

function MatrixChainMultiplication(dims, n) {
  
    let c = new Array(n + 1);
  
    for (let counter = 0; counter < c.length; counter++) {
      c[counter] = new Array(n + 1);
    }
  
    for (let i = 1; i <= n; i++) c[i][i] = 0;
  
    for (
      let len = 2;
      len <= n;
      len++
    ) {
      for (let i = 1; i <= n - len + 1; i++) {
        let j = i + len - 1;
        c[i][j] = 2147483647;
  
        for (let k = i; j < n && k <= j - 1; k++) {
          let cost = c[i][k] + c[k + 1][j] + dims[i - 1] * dims[k] * dims[j];
  
          if (cost < c[i][j]) c[i][j] = cost;
        }
      }
    }
    return c[1][n - 1];
  }

const MCM = () =>{
    const columns = [
        {
          title: "INPUT MATRIX",
          dataIndex: "testcase",
          width: 1300,
        },
        {
          title: "RESULTS",
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
        }
        setGlobalTestCase(updateTestCase);
        setDataSource(updateSource);
        settempCase(TempTestcase);
      }, []);
    
      return (
        <div>
          <h1 style={{ textAlign: "center" }}>Matrix Chain Multiplication</h1>
          <Button
        style={{ marginLeft: 5, marginBottom: 10 }}
        type="primary"
        onClick={() => {
          return getFile(tempCase, "MCMTestCase.txt", "text/plain");
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
    
                newOutput = MatrixChainMultiplication(
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

export default MCM;