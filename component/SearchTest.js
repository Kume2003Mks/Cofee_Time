// SearchBar.js
import React, { useState } from 'react';
import { TextInput, Button, View } from 'react-native';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <View>
      <TextInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search"
      />
      <Button title="Search" onPress={handleSearch} />
    </View>
  );
};

export default SearchBar;
