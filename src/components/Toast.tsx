import React from 'react';
import { Text, View, ActivityIndicator, Image } from 'react-native';
import type { ToastProps } from '../types';

const icons = [
  require('../assets/info_cirlce.png'),
  require('../assets/exclamation_circle.png'),
  require('../assets/check_circle.png'),
  require('../assets/close_circle.png'),
];

const Toast: React.FC<ToastProps> = (props) => {
  const items = [
    <ActivityIndicator size="large" color="#FFFFFFFF" />,
    <Image
      style={{ width: 32, height: 32, tintColor: '#FFFFFF' }}
      source={icons[0]}
    />,
    <Image
      style={{ width: 32, height: 32, tintColor: '#FFFFFF' }}
      source={icons[1]}
    />,
    <Image
      style={{ width: 32, height: 32, tintColor: '#FFFFFF' }}
      source={icons[2]}
    />,
    <Image
      style={{ width: 32, height: 32, tintColor: '#FFFFFF' }}
      source={icons[3]}
    />,
  ];
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
      }}
    >
      <View
        style={{
          minWidth: 130,
          maxWidth: 250,
          minHeight: 110,
          backgroundColor: '#000000',
          opacity: 0.8,
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 12,
          paddingVertical: 15,
        }}
      >
        {items[props.type]}
        <Text
          style={{
            marginTop: 15,
            fontSize: 18,
            color: '#FFFFFFFF',
            textAlign: 'center',
            lineHeight: 22,
          }}
        >
          {props.title}
        </Text>
      </View>
    </View>
  );
};

export default Toast;
