import React from 'react';
import { View, Text, Button } from 'react-native';
import { summaryStyles } from '../styles/styles';

const Summary = (props) => {
  return (
    <View style={summaryStyles.topPanel}>
      <View>
        <Text style={summaryStyles.topPanelItem}>Allowance:</Text>
        <Text style={summaryStyles.topPanelItem}>Expense: {props.expense()}</Text>
      </View>
      <View>
        <Button title='Add new expense' />
      </View>
    </View>
  );
}

export default Summary;