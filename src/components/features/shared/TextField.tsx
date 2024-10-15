import React, { useCallback, useRef, useState } from 'react';
import { TextInput, StyleSheet, Animated, TextInputProps } from 'react-native';
import ButtonIcon from './ButtonIcon';

interface TextFieldProps extends TextInputProps {}

const TextField: React.FC<TextFieldProps> = ({
  placeholder,
  value,
  onChangeText,
}) => {
  const [inputValue, setInputValue] = useState(value || '');

  const [isFocused, setIsFocused] = useState(false);
  const borderColorAnim = useState(new Animated.Value(0))[0];
  const refInput = useRef<TextInput>(null);

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(borderColorAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(borderColorAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const borderColor = borderColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#ccc', '#0A0A0A'],
  });

  const onPressClear = () => {
    setInputValue('');
    refInput.current?.clear();
    if (onChangeText) {
      onChangeText('');
    }
  };

  const handleOnChange = useCallback(
    (text: string) => {
      setInputValue(text);

      if (typeof onChangeText === 'function') {
        onChangeText(text);
      }
    },
    [onChangeText]
  );

  return (
    <Animated.View style={[styles.inputContainer, { borderColor }]}>
      <TextInput
        ref={refInput}
        style={styles.textInput}
        placeholder={placeholder}
        value={inputValue}
        onChangeText={handleOnChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />

      {inputValue && inputValue?.length > 0 && (
        <ButtonIcon
          icon="close-circle-sharp"
          style={styles.clearBtn}
          onPress={onPressClear}
        />
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    color: '#000',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    height: 24,
  },
  clearBtn: {},
});

export default TextField;
