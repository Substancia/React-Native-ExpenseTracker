import React, { useState } from 'react';
import { Modal, View, Text, Button, CheckBox } from 'react-native';
import ls from 'local-storage';
import { modalStyles } from '../styles/styles';

const DeleteModal = props => {
  const [deleteFromHistory, setDeleteFromHistory] = useState(false);

  const deleteExpense = () => {
    if(props.deleteType == 'expenseItem') {
      props.deleteItem();
      if(deleteFromHistory) {
        var HISTORY = ls.get('HISTORY');
        HISTORY = HISTORY.filter(item => {
          if(item.primaryID != props.item.id) return item;
        });
        ls.set('HISTORY', HISTORY);
      }
    } else if (props.deleteType == 'expenseHistory') {
      let HISTORY = ls.get('HISTORY');
      let DATA = ls.get('DATA');
      HISTORY.map((item, index) => {
        if(item.id == props.item.id) {
          DATA.map((dataItem, jndex) => {
            if(dataItem.id == item.primaryID) {
              DATA[jndex].expense -= item.amount;
              return;
            }
          });
          HISTORY.splice(index, 1);
          return;
        }
      });
      ls.set('HISTORY', HISTORY);
      ls.set('DATA', DATA);
      console.log(HISTORY);
      console.log(DATA);
    }
    props.triggerRefreshHome(true);
    props.setDeleteModalVisible(false);
  }

  const itemDeletesHistory = () => {
    if(props.deleteType == 'expenseItem') return (
      <View>
        <Text>Delete expense from history?</Text>
        <CheckBox
          value={deleteFromHistory}
          onValueChange={() => setDeleteFromHistory(!deleteFromHistory)}
        />
      </View>
    );
  }

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={props.deleteModalVisible}
      onRequestClose={() => props.setDeleteModalVisible(false)}
    >
      <View style={modalStyles.centeredView}>
        <View style={modalStyles.modalBg} />
        <View style={modalStyles.modalView}>
          <Text style={modalStyles.title}>{props.item.title}</Text>
          <Text>Delete expense?</Text>
          {itemDeletesHistory()}
          <Button
            title='Delete'
            onPress={deleteExpense}
          />
          <Button title='Cancel' onPress={() => props.setDeleteModalVisible(false)} />
        </View>
      </View>
    </Modal>
  );
}

export default DeleteModal;