import React, { useState } from 'react';
import { Button, SafeAreaView, Text, TouchableOpacity, View, CheckBox } from 'react-native';
import ls from 'local-storage';
import { radioButtonStyles } from '../styles/styles';
import { periodicResetOption } from '../components';

const SettingsScreen = ({ navigation }) => {
  const [periodicReset, setPeriodicReset] = useState(ls.get('RESETPERIODIC') || 'Never');

  const RadioButton = props => {
    return (
      <TouchableOpacity
        onPress={() => setPeriodicReset(props.resetOption)}
      >
        <View style={radioButtonStyles.outerRing}>
          {(props.resetOption.expense == periodicReset.expense) ? 
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
          periodicResetOption.map((item, index) => (
            <View key={index}>
              <Text>{item}</Text>
              <RadioButton
                resetOption={{
                  expense: item,
                  history: (index < periodicResetOption.length-1) ? false : null
                }}
              />
              {(item == periodicReset.expense) && (index < periodicResetOption.length-1) ?
                <View>
                  <Text>Reset history too?</Text>
                  <CheckBox
                    value={(periodicReset.history == null) ? false : periodicReset.history}
                    onValueChange={() => setPeriodicReset({
                      expense: item,
                      history: !periodicReset.history,
                    })}
                  />
                </View>
              : null}
            </View>
          ))
        }
        <Button
          title='Save'
          onPress={() => {
            ls.set('RESETPERIODIC', periodicReset);
            navigation.goBack();
          }}
        />
      </View>
    </SafeAreaView>
  );
}

export default SettingsScreen;