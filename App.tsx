import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';

import GameOfLife from './src/GameOfLife';

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <GameOfLife />
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
