import React, { useState } from 'react';
import { Button, SafeAreaView, TextInput, View, Text, CheckBox } from 'react-native';
import ls from 'local-storage';
import { Summary } from '../components';

const AddNewExpense = ({ route, navigation }) => {
  const DATA = ls.get('DATA') || [];
  const PRIMARYKEY = ls.get('PRIMARYKEY') || [];
  const [title, setTitle] = useState('');
  const [expense, setExpense] = useState(0);
  const [addDefault, setAddDefault] = useState('');
  const [category, setCategory] = useState('others');

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

  const onSubmit = () => {
    DATA.push({
      id: PRIMARYKEY + 1,
      title: title,
      expense: parseInt(expense),
      addDefault: (addDefault.length > 0) ? parseInt(addDefault) : null,
      category: category,
    });
    ls.set('DATA', DATA);
    ls.set('PRIMARYKEY', PRIMARYKEY + 1);
    route.params.triggerRefreshHome(true);
    navigation.navigate('Home');
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
        <Button
          title='Add'
          disabled={title.length == 0}
          onPress={onSubmit}
        />
      </View>
    </SafeAreaView>
  );
}

export default AddNewExpense;