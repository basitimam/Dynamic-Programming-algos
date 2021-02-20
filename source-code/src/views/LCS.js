import React, { useState, useEffect } from "react";
import GenerateTestCase from "../middlewares/function1";
import { Table,Button } from "antd";
import getFile from "../middlewares/getFile";

function Run123() {
    const s1 = "basitimam";
    let n = Math.floor(Math.random() * (100 - 30)) + 30;
    let testCase = "";
    while (n > 0) {
      let idx = Math.floor(Math.random() * s1.length);
      testCase += s1[idx];
      n--;
    }
  
    return testCase;
  }
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


function getLcsLengths(str1, str2) {
    var result = [];
    for (var i = -1; i < str1.length; i = i + 1) {
      result[i] = [];
      for (var j = -1; j < str2.length; j = j + 1) {
        if (i === -1 || j === -1) {
          result[i][j] = 0;
        } else if (str1[i] === str2[j]) {
          result[i][j] = result[i - 1][j - 1] + 1;
        } else {
          result[i][j] = Math.max(result[i - 1][j], result[i][j - 1]);
        }
      }
    }
    return result;
  }
  
  function getLcs(str1, str2, lcsLengthsMatrix) {
    var execute = function (i, j) {
      if (!lcsLengthsMatrix[i][j]) {
        return "";
      } else if (str1[i] === str2[j]) {
        return execute(i - 1, j - 1) + str1[i];
      } else if (lcsLengthsMatrix[i][j - 1] > lcsLengthsMatrix[i - 1][j]) {
        return execute(i, j - 1);
      } else {
        return execute(i - 1, j);
      }
    };
    return execute(str1.length - 1, str2.length - 1);
  }
  

const LCS = () =>{
    const columns = [
        {
          title: "dataset 1",
          dataIndex: "String1",
          width: 150,
          ellipsis: true,
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
          <h1 style={{ textAlign: "center" }}>Longest Common Subsequence</h1>
          <Button
        style={{ marginLeft: 5, marginBottom: 10 }}
        type="primary"
        onClick={() => {
          return getFile(tempCase, "LCSestCase.txt", "text/plain");
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
    
                var lcsLengthsMatrix = getLcsLengths(
                  record.String1,
                  record.String2
                );
    
                newOutput = getLcs(record.String1, record.String2, lcsLengthsMatrix)
                  .length;
    
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

export default LCS;