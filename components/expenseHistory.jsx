import React, { useEffect, useState } from 'react';
import { Button, FlatList, Text, View } from 'react-native';
import ls from 'local-storage';
import { DeleteModal } from '../Modals';

const ExpenseHistory = props => {
  const [history, setHistory] = useState(ls.get('HISTORY') || []);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [historyItem, setHistoryItem] = useState({});

  useEffect(() => {
    setHistory(ls.get('HISTORY') || []);
  }, [props.dataChange, props.refreshHome]);

  const renderItem = ({ item }) => (
    <View>
      <View>
        <Text>{item.title}</Text>
        <Text>{item.amount}</Text>
      </View>
      <Button title='X' onPress={() => deleteButton(item)} />
    </View>
  );

  const deleteButton = props => {
    setHistoryItem({ id: props.id, primaryID: props.primaryID, title: props.title });
    setDeleteModalVisible(true);
  }
  
  return (
    <View>
      <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      <DeleteModal
        deleteType='expenseHistory'
        deleteModalVisible={deleteModalVisible}
        setDeleteModalVisible={setDeleteModalVisible}
        item={historyItem}
        triggerRefreshHome={props.triggerRefreshHome}
      />
    </View>
  );
}

export default ExpenseHistory;