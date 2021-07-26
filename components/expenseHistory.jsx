import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import ls from 'local-storage';

const ExpenseHistory = props => {
  const [history, setHistory] = useState(ls.get('HISTORY') || []);

  useEffect(() => {
    setHistory(ls.get('HISTORY') || []);
  }, [props.dataChange]);

  const renderItem = ({ item }) => (
    <View>
      <Text>{item.title}</Text>
      <Text>{item.amount}</Text>
    </View>
  );
  
  return (
    <View>
      <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

export default ExpenseHistory;