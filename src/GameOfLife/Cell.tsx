import {memo} from 'react';
import {TouchableOpacity} from 'react-native';

import styles from './styles';

const Cell: React.FC<{
  isAlive: boolean;
  onPress: () => void;
  disabled: boolean;
}> = memo(({isAlive, onPress, disabled}) => {
  return (
    <TouchableOpacity
      style={[styles.cell, isAlive ? styles.aliveCell : styles.deadCell]}
      onPress={onPress}
      disabled={disabled}
    />
  );
});

export default Cell;
