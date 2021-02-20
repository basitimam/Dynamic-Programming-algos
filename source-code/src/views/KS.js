import React, { useState, useEffect } from "react";
import GenerateTestCase from "../middlewares/function6";
import { Table,Button } from "antd";
import getFile from "../middlewares/getFile";

function cutLength() {
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


function knapsack(items, capacity) {
 
    var memo = [];
    
    for (var i = 0; i < items.length; i++) {

      var row = [];
      for (var cap = 1; cap <= capacity; cap++) {
        row.push(getSolution(i, cap));
      }
      memo.push(row);
    }

    return getLast();
  
    function getLast() {
      var lastRow = memo[memo.length - 1];
      return lastRow[lastRow.length - 1];
    }
  
    function getSolution(row, cap) {
      const NO_SOLUTION = { maxValue: 0, subset: [] };
     
      var col = cap - 1;
      var lastItem = items[row];

      var remaining = cap - lastItem.w;
  
      var lastSolution =
        row > 0 ? memo[row - 1][col] || NO_SOLUTION : NO_SOLUTION;

      var lastSubSolution =
        row > 0 ? memo[row - 1][remaining - 1] || NO_SOLUTION : NO_SOLUTION;
  
      if (remaining < 0) {
        return lastSolution;
      }

      var lastValue = lastSolution.maxValue;
      var lastSubValue = lastSubSolution.maxValue;
  
      var newValue = lastSubValue + lastItem.v;
      if (newValue >= lastValue) {
        var _lastSubSet = lastSubSolution.subset.slice();
        _lastSubSet.push(lastItem);
        return { maxValue: newValue, subset: _lastSubSet };
      } else {
        return lastSolution;
      }
    }
  }
  
const KS = () =>{
    const columns = [
        {
          title: "Weights",
          dataIndex: "weight",
          width: 150,
        },
        {
          title: "Profits",
          dataIndex: "value",
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
      const [globalTestCase, setGlobalTestCase] = useState([]);
      const [tempCase, settempCase] = useState(``);
      useEffect(() => {
        const updateSource = [...dataSource];
        const updateTestCase = [...globalTestCase];
        let TempTestcase = ``;
        for (let i = 0; i < 10; i++) {
          let testcase = GenerateTestCase();
    
          updateTestCase.push(testcase[1]);
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
          <h1 style={{ textAlign: "center" }}> Knapsack Problem</h1>
        
          <Button
        style={{ marginLeft: 5, marginBottom: 10 }}
        type="primary"
        onClick={() => {
          return getFile(tempCase, "KPTestCase.txt", "text/plain");
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
    
                let items = [];
    
                let traceArray = new Array(10);
                for (let i = 0; i < 10; i++) {
                  traceArray[i] = 0;
                }
    
                traceArray[record.key] = 1;
    
                let counter = 0;
                let i = 0;
                for (i = 0; i < 10; i++) {
                  if (traceArray[i] === 1) {
                    break;
                  }
                }
    
                counter = i * 2;
    
                for (let i = 0; i < globalTestCase[counter + 1].length; i++) {
                  let w = globalTestCase[counter][i];
                  let v = globalTestCase[counter + 1][i];
                  items.push({
                    w: w,
                    v: v,
                  });
                }
    
                newOutput = knapsack(items, 274);
    
                let updatedSource = [...dataSource];
    
                updatedSource = updatedSource.map((item) => {
                  if (item.key === record.key) {
                    return {
                      ...record,
                      Output: newOutput.maxValue,
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

export default KS;