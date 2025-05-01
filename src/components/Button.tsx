import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Image, GestureResponderEvent } from 'react-native';

interface ButtonComponentProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: object;
  textStyle?: object;
  width?: number | string;
  height?: number;
  icon?: any;
  iconPosition?: 'left' | 'right';
  iconStyle?: object;
  backgroundColor?: string;
  borderRadius?: number;
  disabled?: boolean;
}

const Button: React.FC<ButtonComponentProps> = ({
  title,
  onPress,
  style,
  textStyle,
  width = 'auto',
  height = 50,
  icon,
  iconPosition = 'left',
  iconStyle,
  backgroundColor = '#007bff',
  borderRadius = 10,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, { width, height, backgroundColor, borderRadius }, style]}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={[styles.content, iconPosition === 'right' && { flexDirection: 'row-reverse' }]}>
        {icon && <Image source={icon} style={[styles.icon, iconStyle]} />}
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Button;
