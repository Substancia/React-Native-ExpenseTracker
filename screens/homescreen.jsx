import React, { useEffect, useState } from 'react';
import { Text, View, Button, SafeAreaView, SectionList, StyleSheet } from 'react-native';
import { Summary } from '../components';
import ls from 'local-storage';
import { AddAmountModal } from '../Modals';
import { homeStyles } from '../styles/styles';

const initialDATA = [
  {
    id: 1,
    title: 'First Item',
    expense: 100,
    addDefault: 20,
    category: 'recurring',
  },
  {
    id: 2,
    title: 'Second Item',
    expense: 300,
    addDefault: 50,
    category: 'recurring',
  },
  {
    id: 3,
    title: 'Third Item',
    expense: 200,
    addDefault: null,
    category: 'recurring',
  },
  {
    id: 4,
    title: 'Fourth Item',
    expense: 300,
    addDefault: null,
    category: 'others',
  },
  {
    id: 5,
    title: 'Fifth Item',
    expense: 200,
    addDefault: null,
    category: 'others',
  },
];

const HomeScreen = ({ navigation }) => {
  const [DATA, SETDATA] = useState(ls.get('DATA') || []);
  const [dataChange, setDataChange] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [customAmountId, setCustomAmountId] = useState('');
  const [refreshHome, setRefreshHome] = useState(false);

  const splitToSections = () => {
    var sectionList = [], catList = [];
    DATA.map(item => {
      if(!catList.includes(item.category)) {
        catList.push(item.category);
        sectionList.push({ title: item.category, data: [] });
      }
      sectionList[catList.indexOf(item.category)]['data'].push(item);
    });
    return sectionList;
  }

  const addExpense = (id, amount=null) => {
    let tempDATA = DATA;
    tempDATA.map(item => {
      if(item.id == id) {
        item.expense += amount != null ? amount : item.addDefault;
        return;
      }
    });
    SETDATA(tempDATA);
    ls.set('DATA', DATA);
    setDataChange(dataChange + 1);
  }

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

  const resetTestData = () => {
    ls.set('DATA', initialDATA);
    SETDATA(ls.get('DATA'));
    ls.set('ALLOWANCE', 3000);
  }

  const addDefault = (item) => {
    if(item.addDefault != null) return (
      <View style={homeStyles.addButton}>
        <Button title={'+' + String(item.addDefault)} onPress={() => addExpense(item.id)}/>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={homeStyles.item}>
      <Text style={homeStyles.title}>{item.title}</Text>
      
      <View style={homeStyles.numericals}>
        <View style={StyleSheet.compose(homeStyles.numericals, homeStyles.buttonRow)}>
          <View style={homeStyles.addButton}>
            <Button
              title='+'
              onPress={() => {
                setCustomAmountId(item.id);
                setModalTitle(item.title);
                setModalVisible(true);
              }}
            />
          </View>
          {addDefault(item)}
        </View>
        <Text style={homeStyles.title}>{item.expense}</Text>
      </View>
    </View>
  );

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

      <SectionList
        sections={splitToSections(DATA)}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={homeStyles.sectionTitle}>{title}</Text>
        )}
      />

      {/* <Button title='Show modal' onPress={() => setModalVisible(true)} /> */}
      <Button title='Reset test data' onPress={resetTestData} />
    </SafeAreaView>
  );
}

export default HomeScreen;