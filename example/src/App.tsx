import React from 'react';
import {
  StyleSheet,
  View,
  Button,
  AppRegistry,
  TouchableWithoutFeedback,
} from 'react-native';
import Popup from 'react-native-popup';
import RNRestart from 'react-native-restart';

export default function App() {
  const alert = () => {
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
            Popup.hideBottomSheet();
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
        <View
          style={{
            width: 300,
            height: 200,
            backgroundColor: 'yellow',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button
            title="重启"
            onPress={() => {
              RNRestart.Restart();
            }}
          />
        </View>
      </View>
    );
  };

  const alert2 = () => {
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
            Popup.hideBottomSheet();
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
        title="重启"
        onPress={() => {
          RNRestart.Restart();
        }}
      />
      <Button
        title="显示"
        onPress={() => {
          AppRegistry.registerComponent('aaa', () => alert);
          Popup.showBottomSheet('aaa');
        }}
      />
      <Button
        title="显示替换"
        onPress={() => {
          AppRegistry.registerComponent('aaa', () => alert);
          Popup.showBottomSheet('aaa');
          setTimeout(() => {
            AppRegistry.registerComponent('bbb', () => alert2);
            Popup.showBottomSheet('bbb');
          }, 10);
        }}
      />
      <Button
        title="快速隐藏"
        onPress={() => {
          AppRegistry.registerComponent('aaa', () => alert);
          Popup.showBottomSheet('aaa');
          setTimeout(() => {
            Popup.hideBottomSheet().then(() => {
              console.warn('aaa');
            });
          }, 100);
        }}
      />
      <Button
        title="快速隐藏再快速显示"
        onPress={() => {
          AppRegistry.registerComponent('aaa', () => alert);
          Popup.showBottomSheet('aaa');
          setTimeout(() => {
            Popup.hideBottomSheet();
            setTimeout(() => {
              AppRegistry.registerComponent('bbb', () => alert2);
              Popup.showBottomSheet('bbb');
            }, 50);
          }, 100);
        }}
      />
      <Button
        title="在隐藏动画执行中显示"
        onPress={() => {
          AppRegistry.registerComponent('aaa', () => alert);
          Popup.showBottomSheet('aaa');
          setTimeout(() => {
            Popup.hideBottomSheet();
            setTimeout(() => {
              AppRegistry.registerComponent('bbb', () => alert2);
              Popup.showBottomSheet('bbb');
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
