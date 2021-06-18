import React from 'react';
import {
  StyleSheet,
  View,
  Button,
  TouchableWithoutFeedback,
} from 'react-native';
import Popup from '../../src';

export default function App() {
  return (
    <View style={styles.container}>
      <Button
        title="Loading"
        onPress={() => {
          Popup.loading({
            title: 'Loading',
          });
        }}
      />
      <Button
        title="Success"
        onPress={() => {
          Popup.success({
            title: 'Success',
          });
        }}
      />
      <Button
        title="Error"
        onPress={() => {
          Popup.error({
            title: 'Failure',
          });
        }}
      />
      <Button
        title="Info"
        onPress={() => {
          Popup.info({
            title: 'This is Info',
          });
        }}
      />
      <Button
        title="Warning"
        onPress={() => {
          Popup.warning({
            title: 'This is Warning',
          });
        }}
      />
      <Button
        title="Alert"
        onPress={() => {
          Popup.alert({
            title: 'Alert',
            submit: () => {
              console.warn('submit');
            },
          });
        }}
      />
      <Button
        title="ActionSheet"
        onPress={() => {
          Popup.actionSheet({
            items: ['Camera', 'ImageLibrary'],
            choose: (index) => {
              console.warn('index = ', index);
            },
          });
        }}
      />
      <Button
        title="Show Alert"
        onPress={() => {
          const alert = () => {
            return (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <TouchableWithoutFeedback
                  onPress={() => {
                    Popup.hideAlert();
                  }}
                >
                  <View
                    style={{
                      backgroundColor: 'red',
                      width: 300,
                      height: 300,
                    }}
                  />
                </TouchableWithoutFeedback>
              </View>
            );
          };
          Popup.showAlert(() => alert);
        }}
      />
      <Button
        title="Show BottomSheet"
        onPress={() => {
          const bottomSheet = () => {
            return (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}
              >
                <TouchableWithoutFeedback
                  onPress={() => {
                    Popup.hideBottomSheet().then(() => {
                      console.warn('hide');
                    });
                  }}
                >
                  <View
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      top: 0,
                      bottom: 0,
                    }}
                  />
                </TouchableWithoutFeedback>
                <View
                  style={{
                    backgroundColor: 'red',
                    width: 300,
                    height: 300,
                  }}
                />
              </View>
            );
          };
          Popup.showBottomSheet(() => bottomSheet);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
