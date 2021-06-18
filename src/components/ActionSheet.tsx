import React from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';
import type { ActionSheetProps } from '../types';

const renderItem = (
  title: string,
  isCancel: boolean,
  index: number,
  showLine: boolean,
  hide?: Function,
  choose?: Function
) => {
  return (
    <TouchableWithoutFeedback
      key={index}
      onPress={() => {
        if (isCancel) {
          if (hide) hide();
        } else {
          if (choose) choose(index);
        }
      }}
    >
      <View
        style={{
          height: 60,
          width: '100%',
          borderBottomWidth: showLine ? 0.5 : 0,
          borderBottomColor: '#F0F0F0FF',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: isCancel ? '#000E18FF' : '#0096FFFF',
          }}
        >
          {title}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const ActionSheet: React.FC<ActionSheetProps> = (props) => {
  let items = props.items.map((item: any, index: number) => {
    return renderItem(
      item,
      false,
      index,
      index != props.items.length - 1,
      props.cancel,
      props.choose
    );
  });
  items.push(
    <View key={999}>
      <View style={{ height: 8, backgroundColor: '#FAFCFEFF' }} />
      {renderItem(
        props.cancelTitle ?? 'Cancel',
        true,
        0,
        false,
        props.cancel,
        props.choose
      )}
    </View>
  );
  return (
    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
      <TouchableWithoutFeedback
        onPress={() => {
          if (props.cancel) props.cancel();
        }}
      >
        <View style={{ flex: 1 }} />
      </TouchableWithoutFeedback>
      <SafeAreaView
        style={{
          overflow: 'hidden',
          backgroundColor: 'white',
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        }}
      >
        <View
          style={{
            width: '100%',
          }}
        >
          {items}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default ActionSheet;
