import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState, useCallback, Fragment } from 'react';
import CardList from './CardList';
import Filters from './Filters';

const API_ENDPOINT = 'https://62846288a48bd3c40b6e8c8d.mockapi.io/courses';

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  const fetchData = async () => {
    try {
      const { data: response } = await axios.get(API_ENDPOINT, {
        params: {
          ...(query && { title: query }),
          ...(selectedCategories.length && {
            category: selectedCategories.join(','),
          }),
        },
      });
      setData(response);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleQueryChange = (value) => {
    setQuery(value);
  };

  const handleSelectCategoriesChange = (value) => {
    if (selectedCategories.includes(value)) {
      setSelectedCategories(
        selectedCategories.filter((category) => category !== value)
      );
    } else {
      setSelectedCategories([...selectedCategories, value]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [query, selectedCategories]);

  return (
    <div className="App">
      {loading ? (
        <span>Loading</span>
      ) : (
        <Fragment>
          <Filters
            query={query}
            selectedCategories={selectedCategories}
            handleSelectCategoriesChange={handleSelectCategoriesChange}
            handleQueryChange={handleQueryChange}
          />
          <hr />
          <CardList data={data} />
        </Fragment>
      )}
    </div>
  );
}

export default App;
