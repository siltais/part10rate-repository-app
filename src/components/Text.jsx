import { Text as NativeText, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
    textAlign: theme.textAlign.left,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
  colorTextMenu: {
    color: theme.colors.textMenu
  },
  textAlignCenter: {
    textAlign: theme.textAlign.center
  }
});

const Text = ({ color, fontSize, fontWeight, textAlign, style, ...props }) => {
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
    color === 'textMenu' && styles.colorTextMenu,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontWeight === 'bold' && styles.fontWeightBold,
    textAlign === 'center' && styles.textAlignCenter,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;