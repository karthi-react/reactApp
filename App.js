import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [searchText, setSearchText] = useState();
  const [newData, setNewData] = useState([{ title: 'milk' },
  { title: 'curd' },
  { title: 'buttermilk' },
  { title: 'butter' },
  { title: 'ghee' },
  { title: 'item' }]);
  const [Data, setData] = useState(newData);


  const handleText = () => {
    const singleData = newData[Math.floor(Math.random() * newData.length)]
    setNewData([...newData, singleData])
    setData(newData)
  }

  const handleSearchText = (text) => {
    setSearchText(text)
    console.log(searchText);
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const filter = Data.filter(
        function (item) {
          // Applying filter for the inserted text in search bar
          const inData = item.title
            ? item.title.toLowerCase()
            : ''.toLowerCase();
          const textData = text.toLowerCase();
          return inData.indexOf(textData) > -1;
          // return inData === textData ? textData : null;
        }
      );
      setData(filter);
    } else if (text === '') {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setData(newData)

    }

  }
  return (
    <View >
      <View style={styles.container}>
        <StatusBar style="auto" />
        <TextInput
          placeholder={'Search'}
          placeholderTextColor={'white'}
          onChangeText={text => handleSearchText(text)}

          style={styles.searchBar}
        />
        <Text
          style={styles.addItems}
          onPress={() => handleText()}
        >
          +
        </Text>
      </View>

      <ScrollView>
        {
          Data.map((item, idx) => {
            return <Text style={styles.textContainer} key={idx}>{item.title}</Text>
          })}
      </ScrollView>


    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30
  },
  searchBar: {

    width: '75%',
    height: 50,
    paddingLeft: 20,
    letterSpacing: 3,
    fontSize: 20,
    borderRadius: 25,
    backgroundColor: 'grey',
    color: 'white'
  },
  addItems: {
    marginTop: -5,
    marginLeft: -10,
    fontSize: 40,
    color: 'black'
  },
  textContainer: {
    color: 'black',
    fontSize: 20,
    marginLeft: 30,
    marginTop: 20,
    fontWeight: 'bold'
  }

});
