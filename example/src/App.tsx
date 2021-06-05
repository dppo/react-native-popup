import React from 'react';
import {
  StyleSheet,
  View,
  Button,
  AppRegistry,
  TouchableWithoutFeedback,
} from 'react-native';
import Popup from 'react-native-popup';

export default function App() {
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
            Popup.hideToast();
          }}
        >
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              top: 0,
            }}
          />
        </TouchableWithoutFeedback>
        <View style={{ width: 300, height: 200, backgroundColor: 'white' }} />
      </View>
    );
  };

  const alert2 = () => {
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
            Popup.hideToast();
          }}
        >
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              top: 0,
            }}
          />
        </TouchableWithoutFeedback>
        <View style={{ width: 300, height: 200, backgroundColor: 'blue' }} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Button
        title="显示替换"
        onPress={() => {
          AppRegistry.registerComponent('aaa', () => alert);
          Popup.showToast('aaa', 3);
          setTimeout(() => {
            AppRegistry.registerComponent('bbb', () => alert2);
            Popup.showToast('bbb', 3);
          }, 100);
        }}
      />
      <Button
        title="快速隐藏"
        onPress={() => {
          AppRegistry.registerComponent('aaa', () => alert);
          Popup.showToast('aaa', 10);
          setTimeout(() => {
            Popup.hideToast().then(() => {
              console.warn('aaa');
            });
          }, 100);
        }}
      />
      <Button
        title="快速隐藏再快速显示"
        onPress={() => {
          AppRegistry.registerComponent('aaa', () => alert);
          Popup.showToast('aaa', 3);
          setTimeout(() => {
            Popup.hideToast();
            setTimeout(() => {
              AppRegistry.registerComponent('bbb', () => alert2);
              Popup.showToast('bbb', 4);
            }, 50);
          }, 100);
        }}
      />
      <Button
        title="在隐藏动画执行中显示"
        onPress={() => {
          AppRegistry.registerComponent('aaa', () => alert);
          Popup.showToast('aaa', 3);
          setTimeout(() => {
            Popup.hideToast();
            setTimeout(() => {
              AppRegistry.registerComponent('bbb', () => alert2);
              Popup.showToast('bbb', 3);
            }, 50);
          }, 1000);
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
