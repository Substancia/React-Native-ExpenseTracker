import React, { useEffect, useState } from 'react';
import { Button, SafeAreaView, } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { checkPeriodicReset, ExpenseAnalysis, ExpenseHistory, ExpenseSheet, resetData, Summary } from '../components';
import ls from 'local-storage';
import { AddAmountModal } from '../Modals';
import { homeStyles } from '../styles/styles';

const HomeScreen = ({ navigation }) => {
  const [DATA, SETDATA] = useState(ls.get('DATA') || []);
  const [dataChange, setDataChange] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [customAmountId, setCustomAmountId] = useState('');
  const [refreshHome, setRefreshHome] = useState(false);

  useEffect(() => {
    ls.set('DATA', DATA);
    return;
  }, [dataChange]);

  useEffect(() => {
    if(refreshHome) {
      SETDATA(ls.get('DATA'));
      setRefreshHome(false);
    }
  }, [refreshHome]);

  useEffect(() => {
    // resetTestData();
    checkPeriodicReset(() => setRefreshHome(true));
  }, []);

  const Tab = createMaterialTopTabNavigator();

  const addExpense = (id, amount=null) => {
    let tempDATA = DATA;
    let HISTORY = ls.get('HISTORY');
    let date = new Date();
    tempDATA.map(item => {
      if(item.id == id) {
        item.expense += amount != null ? amount : item.addDefault;
        HISTORY.push({
          id: (HISTORY.length > 0) ? HISTORY[HISTORY.length-1].id + 1 : 0,
          primaryID: id,
          title: item.title,
          amount: amount != null ? amount : item.addDefault,
          date: {
            date: date.getDate(),
            month: date.getMonth()+1,
            year: date.getFullYear()
          },
        });
        return;
      }
    });
    SETDATA(tempDATA);
    ls.set('DATA', tempDATA);
    ls.set('HISTORY', HISTORY);
    setDataChange(dataChange + 1);
  }

  // Metadata: delete before deploying
  // const resetTestData = () => {
  //   resetData();
  //   SETDATA(ls.get('DATA'));
  //   setDataChange(dataChange + 1);
  // }

  return (
    <SafeAreaView style={homeStyles.container}>
      <Summary 
        expense={() => {
          var sum = 0;
          DATA.map(item => sum += item.expense)
          return sum;
        }}
        navigation={navigation}
        triggerRefreshHome={setRefreshHome}
      />

      <AddAmountModal
        modalVisible={modalVisible}
        modalTitle={modalTitle}
        setModalVisible={setModalVisible}
        onSubmit={(amount) => addExpense(customAmountId, amount)}
      />

      <Tab.Navigator>
        <Tab.Screen name='Expenses'>
          {() => <ExpenseSheet
            DATA={DATA}
            setCustomAmountId={setCustomAmountId}
            setModalTitle={setModalTitle}
            setModalVisible={setModalVisible}
            addExpense={addExpense}
            navigation={navigation}
            triggerRefreshHome={setRefreshHome}
            />}
        </Tab.Screen>
        <Tab.Screen name='History'>
          {() => 
            <ExpenseHistory
              dataChange={dataChange}
              refreshHome={refreshHome}
              triggerRefreshHome={setRefreshHome}
            />
          }
        </Tab.Screen>
        <Tab.Screen name='Statistics'>
          {() => 
            <ExpenseAnalysis
              DATA={DATA}
              dataChange={dataChange}
              refreshHome={refreshHome}
            />
          }
        </Tab.Screen>
      </Tab.Navigator>

      {/* Metadata: delete before deploying */}
      {/* <Button title='Periodic reset' onPress={() => checkPeriodicReset(() => setRefreshHome(true))} />
      <Button title='Reset test data' onPress={resetTestData} /> */}
    </SafeAreaView>
  );
}

export default HomeScreen;