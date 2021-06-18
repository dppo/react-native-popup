import React from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import type { AlertProps } from '../types';

const Alert: React.FC<AlertProps> = (props) => {
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
          alignItems: 'center',
          backgroundColor: '#FFFFFFFF',
          width: 280,
          borderRadius: 20,
          padding: 20,
          ...props.containerStyle,
        }}
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 2,
            flexDirection: 'row',
            paddingHorizontal: 6,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: '#000E18FF',
              lineHeight: 30,
              marginBottom: 23,
              textAlign: 'center',
            }}
          >
            {props.title}
          </Text>
          {props.hlTitle ? (
            <Text
              style={{
                fontSize: 18,
                color: '#FF7000FF',
                lineHeight: 30,
                marginBottom: 23,
                textAlign: 'center',
              }}
            >
              {props.hlTitle}
            </Text>
          ) : null}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: props.force ? 'center' : 'space-between',
            width: '100%',
          }}
        >
          {props.force ? null : (
            <TouchableWithoutFeedback
              onPress={() => {
                props.cancel && props.cancel();
              }}
            >
              <View
                style={{
                  width: 114,
                  height: 40,
                  borderRadius: 30,
                  borderWidth: 0.5,
                  borderColor: '#F0F0F0FF',
                  justifyContent: 'center',
                  alignItems: 'center',
                  ...props.cancelContainerStyle,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: '#666F74FF',
                    ...props.cancelTextStyle,
                  }}
                >
                  {props.cancelTitle ?? 'Cancel'}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          )}
          <TouchableWithoutFeedback
            onPress={() => {
              props.submit && props.submit();
            }}
          >
            <View
              style={{
                width: props.force ? 150 : 114,
                height: 40,
                borderRadius: 30,
                backgroundColor: '#0096FFFF',
                justifyContent: 'center',
                alignItems: 'center',
                ...props.submitContainerStyle,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: '#FFFFFFFF',
                  ...props.submitTextStyle,
                }}
              >
                {props.submitTitle ?? 'Submit'}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};

export default Alert;
