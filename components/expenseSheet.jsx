import React from 'react';
import { View, Text, StyleSheet, Button, SectionList } from 'react-native';
import { homeStyles } from '../styles/styles';

const ExpenseSheet = props => {
  const splitToSections = () => {
    var sectionList = [], catList = [];
    props.DATA.map(item => {
      if(!catList.includes(item.category)) {
        catList.push(item.category);
        sectionList.push({ title: item.category, data: [] });
      }
      sectionList[catList.indexOf(item.category)]['data'].push(item);
    });
    return sectionList;
  }

  const addDefault = (item) => {
    if(item.addDefault != null) return (
      <View style={homeStyles.addButton}>
        <Button title={'+' + item.addDefault.toString()} onPress={() => props.addExpense(item.id)}/>
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
                props.setCustomAmountId(item.id);
                props.setModalTitle(item.title);
                props.setModalVisible(true);
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
    <View>
      <SectionList
        sections={splitToSections(props.DATA)}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={homeStyles.sectionTitle}>{title}</Text>
        )}
      />
    </View>
  );
}

export default ExpenseSheet;