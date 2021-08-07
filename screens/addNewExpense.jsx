import React, { useEffect, useState } from 'react';
import { Button, SafeAreaView, TextInput, View, Text, CheckBox } from 'react-native';
import ls from 'local-storage';
import { Summary } from '../components';
import { DeleteModal } from '../Modals';

const AddNewExpense = ({ route, navigation }) => {
  const DATA = ls.get('DATA') || [];
  const PRIMARYKEY = ls.get('PRIMARYKEY') || [];
  const HISTORY = ls.get('HISTORY') || [];
  const newDate = new Date();
  const [title, setTitle] = useState('');
  const [expense, setExpense] = useState(0);
  const [addDefault, setAddDefault] = useState('');
  const [category, setCategory] = useState('others');
  const [date, setDate] = useState({});
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const editExpense = ('item' in route.params);

  useEffect(() => {
    if(editExpense) {
      setTitle(route.params.item.title);
      setExpense(route.params.item.expense.toString());
      setCategory(route.params.item.category);
      if(route.params.item.addDefault != null)
        setAddDefault(route.params.item.addDefault.toString());
      setDate(route.params.item.date);
    }
  }, [route.params]);

  const addDefaultView = () => {
    if(category == 'recurring') return (
      <View>
        <Text>Default increment</Text>
        <TextInput
          keyboardType='numeric'
          onChangeText={val => setAddDefault(val)}
          value={addDefault}
        />
      </View>
    );
  }

  const CreatedDate = () => editExpense ?
    <View>
      <Text>Created on: {date.date}-{date.month}-{date.year}</Text>
    </View> :
    null;

  const onSubmit = () => {
    if(editExpense) {
      DATA.map(item => {
        if(item.id == route.params.item.id) {
          item.title = title;
          item.expense = parseInt(expense);
          item.addDefault = parseInt(addDefault);
          item.category = category;
        }
        return;
      });
    } else {
      DATA.push({
        id: PRIMARYKEY + 1,
        title: title,
        expense: parseInt(expense),
        addDefault: (addDefault.length > 0) ? parseInt(addDefault) : null,
        category: category,
        date: {
          date: newDate.getDate(),
          month: newDate.getMonth()+1,
          year: newDate.getFullYear()
        },
      });
      ls.set('PRIMARYKEY', PRIMARYKEY + 1);
      HISTORY.push({
        id: (HISTORY.length > 0) ? HISTORY[HISTORY.length-1].id + 1 : 0,
        primaryID: PRIMARYKEY,
        title: title,
        amount: parseInt(expense),
        date: {
          date: newDate.getDate(),
          month: newDate.getMonth()+1,
          year: newDate.getFullYear()
        },
      });
      ls.set('HISTORY', HISTORY);
    }
    ls.set('DATA', DATA);
    route.params.triggerRefreshHome(true);
    navigation.navigate('Home');
  }

  const deleteButton = () => {
    if(editExpense) return (
      <Button
        title='Delete expense'
        onPress={() => {
          setDeleteModalVisible(true);
        }}
      />
    );
  }

  const deleteItem = () => {
    DATA.map((item, index) => {
      if(item.id == route.params.item.id) {
        DATA.splice(index, 1);
        return;
      }
    });
    ls.set('DATA', DATA);
    // route.params.triggerRefreshHome(true);
    navigation.navigate('Home');
  }

  const deleteModalView = () => {
    if(editExpense) return (
      <DeleteModal
        deleteType='expenseItem'
        deleteModalVisible={deleteModalVisible}
        setDeleteModalVisible={setDeleteModalVisible}
        item={{id: route.params.item.id, title: title}}
        deleteItem={deleteItem}
        triggerRefreshHome={route.params.triggerRefreshHome}
      />
    );
  }

  return (
    <SafeAreaView>
      <Summary 
        expense={() => {
          var sum = 0;
          DATA.map(item => sum += item.expense)
          return sum;
        }}
        disable
      />
      <View>
        <View>
          <Text>Expense name</Text>
          <TextInput
            keyboardType='default'
            onChangeText={val => setTitle(val)}
            value={title}
            autoFocus
          />
        </View>
        <View>
          <Text>Expense</Text>
          <TextInput
            keyboardType='numeric'
            onChangeText={val => setExpense(val)}
            value={expense}
          />
        </View>
        <View>
          <Text>Recurring expense</Text>
          <CheckBox
            value={category == 'recurring'}
            onValueChange={() => setCategory((category == 'recurring') ? 'others' : 'recurring')}
          />
        </View>
        {addDefaultView()}
        <CreatedDate />
        <Button
          title={editExpense ? 'Update' : 'Add'}
          disabled={title.length == 0}
          onPress={onSubmit}
        />
        {deleteButton()}
        {deleteModalView()}
      </View>
    </SafeAreaView>
  );
}

export default AddNewExpense;