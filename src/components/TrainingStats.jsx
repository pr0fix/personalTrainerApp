import { useEffect, useState } from "react";
import { BarChart, ResponsiveContainer, Bar, XAxis, YAxis, Label } from "recharts";
import { groupBy, sumBy } from "lodash";
import axios from "axios";

export default function Trainingstats() {

    // State to save processed data with duration and activity
    const [processedData, setProcessedData] = useState([])

    // Fetch all training data and create data for barchart with groupBy and sumBy
    const getData = async () => {
        try {
            const res = await axios.get('https://traineeapp.azurewebsites.net/gettrainings');
            const resData = res.data;
           
            
            if(resData.length > 0) {

                // Makes groups of activities and saves them to constant named activity
                const activity = groupBy(resData, "activity");

                
                const chartData = Object.keys(activity).map((key) => ({
                    activity: key,
                    duration: sumBy(activity[key], "duration"),
                }));

                setProcessedData(chartData);
            }

        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <>
        <div 
            style={{
                display:"flex", 
                justifyContent:"center",
                alignItems:'center',
                height: '80vh'
            }}
        >
        <ResponsiveContainer 
            width='80%' 
            height={400}
        >
            <BarChart 
                data={processedData}
            >
               <XAxis 
                    dataKey="activity"
            	/>
               <YAxis>
                <Label
                    value="Duration (min)"
                    position="insideLeft"
                    fontSize="20px"
                    angle={270}
                />
               </YAxis>
               <Bar 
                    dataKey="duration" 
                    fill="#8884d8"
                />
            </BarChart>
        </ResponsiveContainer>
        
        </div>
        </>
    );
}