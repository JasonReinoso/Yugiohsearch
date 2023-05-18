import React, {useEffect, useState}from 'react'
import {
    LineChart,
    ResponsiveContainer,
    Legend, Tooltip,
    Line,
    XAxis,
    YAxis,
    CartesianGrid
} from 'recharts';
import axios from 'axios';

function PriceGraph(props) {

    const [graphdata, setgraphdata] = useState([]);
    const [graphmonth,setgraphmonth] = useState([]);
    const [graphthreemonths,setgraphthreemonths] = useState([]);
    const [graphall,setgraphall] = useState([]);
    const prices = [];


    useEffect( ()=>{
        axios({
            method:"get",
            url:"https://yugiohprices.com/api/price_history/"+props.graphcode})
            .then(data => 
            {

                    for(var i=0;i < data.data.data.length;i++)
                    {
                        data.data.data[i].created_at= data.data.data[i].created_at.replace("00:00:00 -0400","");
                        data.data.data[i].created_at= data.data.data[i].created_at.replace("00:00:00 -0500","");
                    }

                    const dataa = data.data.data.slice();
                    dataa.reverse();
                    setgraphdata(dataa);
                    setgraphall(dataa);
                // console.log(data.data.data.reverse());
                    const orignal = data.data.data;


                    // start of graph month
                    var counter =0;
                    const test = [];
            
        
            const date = new Date();
            let day = date.getDate()-1;
            let month = String(date.getMonth()).padStart(2,"0");
            let fakemonth = date.getMonth(); //  <-------------
            if(fakemonth ===0)
            fakemonth= 12;
            console.log(fakemonth);
            test.push(data.data.data[0])
            for(var i =0; i < orignal.length;i++)
            {
            
                
                
                    if(orignal[i].created_at.includes(month+"-"+ day) && counter !=11)
                    {
                        
                        test.push(orignal[i]);
                        counter= counter+1; 
                        fakemonth = fakemonth-1;
                        if(fakemonth ==0)
                        fakemonth=12;
                        month = fakemonth.toString();
                        
                    
                    }  
            }
            test.push(data.data.data[data.data.data.length-1]);
            setgraphmonth(test.reverse());

            console.log(test);
            // end of graph months

            //start of graph 3!!!!!!!!!!!- months
            const date3 = new Date();
            const test3 =[];
            var counter3 =0;
            let day3 = date3.getDate()-1;
            let month3 = String(date3.getMonth()-2).padStart(2,"0");
            let fakemonth3 = date.getMonth()-2; //  <-------------

            test3.push(data.data.data[0]);
            if(fakemonth3 <= 0)
            fakemonth3+= 12;

            for(var i =0; i < orignal.length;i++)
            {
                if(orignal[i].created_at.includes(month3+"-"+day3) && counter3 !=9)
                {
                    console.log(fakemonth3)
                    test3.push(orignal[i]);
                    counter +=3;
                    fakemonth3-=3;
                    if(fakemonth3 <=0)
                    fakemonth3 = fakemonth3 + 12;
                    month3=fakemonth3.toString()
                }
            }
            setgraphthreemonths(test3.reverse());



            
            }) // from axios 
    } , []  )



  return (
    <div id='graph-container'>
        <label>The price history of {props.graphcode}</label>
        <br></br>
      

        <button onClick={()=>{
            setgraphdata(graphthreemonths);
        }}>Quarterly</button>

        <button onClick={()=>{
            setgraphdata(graphmonth);
        }}> Monthly</button>

        <button onClick={()=>{
            setgraphdata(graphall);
        }}>Daily</button>


        <br></br>
        <br></br>

<>
           
          
           <ResponsiveContainer  width="100%" aspect={3}>
             
               <LineChart width={1000} height={850} data={graphdata} margin={{ right: -0, top:0 }}>
                   <CartesianGrid />
                   <XAxis dataKey="created_at" 
                       interval={'preserveStartEnd'} />
                   <YAxis></YAxis>
                   <Legend />
                   <Tooltip />
                   <Line dataKey="price_average"
                       stroke="black" activeDot={{ r: 8 }} />
                   
               </LineChart>
               
           </ResponsiveContainer>
          
           </>



    </div>
  )
}

export default PriceGraph