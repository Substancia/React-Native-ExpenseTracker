import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import ls from 'local-storage';
import { AddAmountModal } from '../Modals';
import { summaryStyles } from '../styles/styles';

const Summary = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [allowance, setAllowance] = useState(ls.get('ALLOWANCE'));

  const addExpenseButton = () => {
    if(!props.disable) return (
      <View>
        <View style={summaryStyles.summaryButtons}>
          <Button
            title='Edit allowance'
            onPress={() => setModalVisible(true)}
          />
        </View>
        <View style={summaryStyles.summaryButtons}>
          <Button
            title='Add new expense'
            onPress={() => props.navigation.navigate('Add new expense',
              {triggerRefreshHome: props.triggerRefreshHome})}
          />
        </View>
      </View>
    );
  }

  const editAllowance = (amount) => {
    ls.set('ALLOWANCE', amount);
    setAllowance(amount);
  }
  
  useEffect(() => {
    setAllowance(ls.get('ALLOWANCE'));
  });

  return (
    <View style={summaryStyles.summary}>
      <View style={summaryStyles.summaryTexts}>
        <Text style={summaryStyles.summaryItem}>Allowance: {allowance}</Text>
        <Text style={summaryStyles.summaryItem}>Expense: {props.expense()}</Text>
      </View>
      {addExpenseButton()}
      <AddAmountModal
        modalVisible={modalVisible}
        modalTitle='Allowance'
        setModalVisible={setModalVisible}
        defVal={ls.get('ALLOWANCE')}
        onSubmit={(amount) => editAllowance(amount)}
      />
    </View>
  );
}

export default Summary;