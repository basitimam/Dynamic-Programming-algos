import React, { useState, useEffect } from "react";
import GenerateTestCase from "../middlewares/function1";
import { Table,Button } from "antd";
import getFile from "../middlewares/getFile";

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
function calculateLevDistance(src, tgt) {
    var realCost;
  
    var srcLength = src.length,
      tgtLength = tgt.length,
      tempString,
      tempLength; // for swapping
  
    var resultMatrix = new Array();
    resultMatrix[0] = new Array(); // Multi dimensional
  
    // To limit the space in minimum of source and target,
    // we make sure that srcLength is greater than tgtLength
    if (srcLength < tgtLength) {
      tempString = src;
      src = tgt;
      tgt = tempString;
      tempLength = srcLength;
      srcLength = tgtLength;
      tgtLength = tempLength;
    }
  
    for (var c = 0; c < tgtLength + 1; c++) {
      resultMatrix[0][c] = c;
    }
  
    for (var i = 1; i < srcLength + 1; i++) {
      resultMatrix[i] = new Array();
      resultMatrix[i][0] = i;
      for (var j = 1; j < tgtLength + 1; j++) {
        realCost = src.charAt(i - 1) == tgt.charAt(j - 1) ? 0 : 1;
        resultMatrix[i][j] = Math.min(
          resultMatrix[i - 1][j] + 1,
          resultMatrix[i][j - 1] + 1,
          resultMatrix[i - 1][j - 1] + realCost // same logic as our previous example.
        );
      }
    }
  
    return resultMatrix[srcLength][tgtLength];
  }

const LD = () =>{

    const columns = [
        {
          title: "dataset 1",
          dataIndex: "String1",
          width: 150,
        },
        {
          title: "datset 2",
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
          <h1 style={{ textAlign: "center" }}>
            The Levenshtein distanc problem
          </h1>
          <Button
        style={{ marginLeft: 5, marginBottom: 10 }}
        type="primary"
        onClick={() => {
          return getFile(tempCase, "LDestCase.txt", "text/plain");
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
    
                newOutput = calculateLevDistance(record.String1, record.String2);
    
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

export default LD;