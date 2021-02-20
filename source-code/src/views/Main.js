import React from 'react';
import {Button} from 'antd';
import {Link} from 'react-router-dom';


const Main = () =>{
    return(
        <>
        
        <div className="Main">
            <Link to="/LCS"className="links">Longest common Subsequence</Link>
            <Link to="/SCS" className="links">Shortest Common supersequence</Link>
            <Link to="/LIS" className="links">Longest common Subarray</Link>
            <Link to="/LD"className="links">Levenshtein Distance (edit-distance)</Link>
            <Link to="/MCM" className="links"> Matrix Chain Multiplication</Link>
            <Link to="/KS" className="links">0-1-knapsack-problem</Link>
            <Link to="/PP"className="links">Partition-problem</Link>
            <Link to="/RCP" className="links">Rod Cutting Problem</Link>
            <Link to="/CCMP" className="links">Coin-change-making-problem</Link>
            <Link to="/WBP" className="links">Word Break Problem</Link>
        </div>
       
    </>
    )
}

export default Main;