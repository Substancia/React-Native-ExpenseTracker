import React, { useState } from 'react';
import { Button, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import ls from 'local-storage';
import { radioButtonStyles } from '../styles/styles';

const SettingsScreen = ({ navigation }) => {
  const periodicResetOption = [
    'At end of every month',
    'Once every fixed number of days',
    'Never'
  ];
  const [periodicReset, setPeriodicReset] = useState(ls.get('resetPeriodic') || 'Never');

  const RadioButton = props => {
    return (
      <TouchableOpacity
        onPress={() => setPeriodicReset(props.resetOption)}
      >
        <View style={radioButtonStyles.outerRing}>
          {(props.resetOption == periodicReset) ? 
            <View style={radioButtonStyles.innerFill} />
          : null}
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView>
      <View>
        <Text>Reset periodically?</Text>
        {
          periodicResetOption.map(item => (
            <View>
              <Text>{item}</Text>
              <RadioButton resetOption={item} />
            </View>
          ))
        }
        <Button
          title='Save'
          onPress={() => {
            ls.set('resetPeriodic', periodicReset);
            navigation.goBack();
          }}
        />
      </View>
    </SafeAreaView>
  );
}

export default SettingsScreen;