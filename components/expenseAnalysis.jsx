import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import ls from 'local-storage';

const ExpenseAnalysis = props => {
  const allowanceColor = 'yellow';
  const colorChart = ['cyan', 'lime', 'red', 'orange', 'purple'];

  const [processedData, setProcessedData] = useState([]);
  const allowance = ls.get('ALLOWANCE') || 100;
  const [processedAllowance, setProcessedAllowance] = useState(0);

  useEffect(() => {
    dataToPieChart();
  }, [props.dataChange, props.refreshHome]);

  const dataToPieChart = () => {
    let processedRecurring = [];
    let processedOthers = 0;
    for(var i=0; i<props.DATA.length; ++i) {
      if(props.DATA[i].category == 'recurring') {
        processedRecurring.push(0);
        props.DATA.slice(i).map(item => processedRecurring[processedRecurring.length-1] += item.expense);
      } else {
        processedOthers += props.DATA[i].expense;
      }
    }
    if(processedRecurring[0] == 0) {
      setProcessedData([]);
      setProcessedAllowance(100);
      // return;
    } else if(processedRecurring[0] < allowance) {
      processedOthers = 100 * processedOthers / allowance;
      processedRecurring = processedRecurring.map(expense => 
        100 * expense / allowance
      );
      processedRecurring.push(processedOthers);
      setProcessedData(processedRecurring);
      setProcessedAllowance(100);
    } else {
      processedOthers = 100 * processedOthers / processedRecurring[0];
      setProcessedAllowance(100 * allowance / processedRecurring[0]);
      processedRecurring = processedRecurring.map(expense => 
        100 * expense / processedRecurring[0]
      );
      processedRecurring.push(processedOthers);
      setProcessedData(processedRecurring);
    }
  }

  const totalPie = () => {
    if(processedAllowance == 100) {
      return <Circle cx='60' cy='60' r='50' fill={allowanceColor} />
    } else {
      return <Circle cx='60' cy='60' r='30' fill='transparent'
        stroke={allowanceColor}
        strokeWidth='60'
        strokeDasharray={`${2*3.14*30 * processedAllowance / 100} ${2*3.14*30}`}
      />
    }
  }

  const LoadPieChart = () => (
    <Svg height='120' width='120'>
      {totalPie()}
      {
        processedData.map((expense, index) =>
          <Circle cx='60' cy='60' r='25' fill='transparent'
            key={index}
            stroke={colorChart[index%colorChart.length]}
            strokeWidth='50'
            strokeDasharray={`${2*3.14*30 * expense / 100} ${2*3.14*30}`}
          />
        )
      }
      <Circle cx='60' cy='60' r='30' fill='white' />
    </Svg>
  );

  return (
    <View>
      <LoadPieChart />
    </View>
  );
}

export default ExpenseAnalysis;