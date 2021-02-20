import React, { useState, useEffect } from "react";
import GenerateTestCase from "../middlewares/function6";
import { Table,Button } from "antd";
import getFile from "../middlewares/getFile";

function Lengths(rows, cols)
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




function rodCut(price, n) {
    console.log(price);
    console.log(n);
    let val = new Array(n + 1);
    val[0] = 0;
    let i, j;
  

    for (i = 1; i <= n; i++) {
      let max_val = -2147483648;
      for (j = 0; j < i; j++)
        max_val = Math.max(max_val, price[j] + val[i - j - 1]);
      val[i] = max_val;
    }
  
    return val[n];
  }
const RCP = () =>{
    const columns = [
        {
          title: "LENGTHS",
          dataIndex: "weight",
          width: 150,
        },
        {
          title: "COSTS",
          dataIndex: "value",
          width: 150,
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
    
          updateTestCase.push(testcase[3]);
    
          updateSource.push({
            weight: testcase[0],
            value: testcase[2],
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
          <h1 style={{ textAlign: "center" }}>Rod cutting Problem</h1>
          <Button
        style={{ marginLeft: 5, marginBottom: 10 }}
        type="primary"
        onClick={() => {
          return getFile(tempCase, "RCPTestCase.txt", "text/plain");
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
    
                newOutput = rodCut(globalTestCase[record.key], 20);
    
                let updatedSource = [...dataSource];
    
                updatedSource = updatedSource.map((item) => {
                  if (item.key === record.key) {
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

export default RCP;