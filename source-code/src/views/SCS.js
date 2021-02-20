import React, { useState, useEffect } from "react";
import GenerateTestCase from "../middlewares/function1";
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
function Run123() {
    const s1 = "basit";
    let n = Math.floor(Math.random() * (100 - 30)) + 30;
    let testCase = "";
    while (n > 0) {
      let idx = Math.floor(Math.random() * s1.length);
      testCase += s1[idx];
      n--;
    }
  
    return testCase;
  }

function superSeq(X, Y, m, n) {
    var dp = new Array(m + 1);
  
    for (let c = 0; c < dp.length; c++) {
      dp[c] = new Array(n + 1);
    }
  
    // Fill table in bottom up manner
    for (let i = 0; i <= m; i++) {
      for (let j = 0; j <= n; j++) {
        // Below steps follow above recurrence
        if (!i) dp[i][j] = j;
        else if (!j) dp[i][j] = i;
        else if (X[i - 1] === Y[j - 1]) dp[i][j] = 1 + dp[i - 1][j - 1];
        else dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  
    return dp[m][n];
  }

const SCS = () =>{
    const columns = [
        {
          title: "dataset 1",
          dataIndex: "String1",
          width: 150,
          ellipsis:true,
    
        },
        {
          title: "dataset 2",
          dataIndex: "String2",
          width: 150,
        },
        {
          title: "Results",
          dataIndex: "Output",
          fixed: "right",
          width: 50,
        },
      ];
    
      const [dataSource, setDataSource] = useState([]);
      const [tempCase, settempCase] = useState(``);
      useEffect(() => {
        const updateSource = [...dataSource];
        let TempTestcase = ``;
        for (let i = 0; i < 10; i++) {
          let String1 = GenerateTestCase();
          let String2 = GenerateTestCase();
          updateSource.push({
            String1: String1,
            String2: String2,
            Output: "",
          });
          TempTestcase = `${TempTestcase} ${String1} ${String2} \n`;
        }
    
        setDataSource(updateSource);
        settempCase(TempTestcase);
      }, []);
    
      return (
        <div>
          <h1 style={{ textAlign: "center" }}>Shortest Common Supersequence</h1>
          <Button
        style={{ marginLeft: 5, marginBottom: 10 }}
        type="primary"
        onClick={() => {
          return getFile(tempCase, "SCSTestCase.txt", "text/plain");
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
    
                var X = record.String1;
                var Y = record.String2;
                newOutput = superSeq(X, Y, X.length, Y.length);
    
                let updatedSource = [...dataSource];
    
                updatedSource = updatedSource.map((item) => {
                  if (item.String1 === record.String1) {
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

export default SCS;