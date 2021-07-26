import React, { useState } from 'react';
import { Modal, View, Text, Button, TextInput } from 'react-native';
import { modalStyles } from '../styles/styles';

const AddAmountModal = (props) => {
  const [amount, setAmount] = useState('');

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => props.setModalVisible(false)}
    >
      <View style={modalStyles.centeredView}>
        <View style={modalStyles.modalBg} />
        <View style={modalStyles.modalView}>
          <Text style={modalStyles.title}>Expense name</Text>
          <Text>Enter Amount</Text>
          <TextInput
            style={modalStyles.enterAmount}
            keyboardType='numeric'
            onChangeText={(val) => setAmount(val)}
            value={amount}
            autoFocus
          />
          <Button
            title={amount == '' ? 'Close' : 'Add'}
            onPress={() => {
              props.setModalVisible(false);
              if(amount != '') props.onSubmit(parseInt(amount));
              setAmount('');
            }}
          />
        </View>
      </View>
    </Modal>
  );
}

export default AddAmountModal;