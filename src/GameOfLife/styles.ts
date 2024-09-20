import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  grid: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
    marginTop: 20,
  },
  cell: {
    width: 20,
    height: 20,
    margin: 1,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  aliveCell: {
    backgroundColor: 'black',
  },
  deadCell: {
    backgroundColor: 'white',
  },
  controls: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 200,
  },
});

export default styles;
