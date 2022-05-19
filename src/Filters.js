import { useState, useEffect } from 'react';

const categories = ['IT', 'Leadership'];

function Filters({
  query,
  selectedCategories,
  handleSelectCategoriesChange,
  handleQueryChange,
}) {
  const [categoryQuery, setCategoryQuery] = useState('');
  const [filteredCategories, setFilteredCategories] = useState(categories);

  useEffect(() => {
    setFilteredCategories(
      categories.filter((category) => {
        return category.toLowerCase().includes(categoryQuery.toLowerCase());
      })
    );
  }, [categoryQuery]);

  const handleCategoryQueryChange = (e) => {
    const {
      target: { value },
    } = e;
    setCategoryQuery(value);
  };

  const handleCategoryChange = (e) => {
    handleSelectCategoriesChange(e.target.name);
  };

  const handleAllCategoriesChange = () => {
    // TODO
  };

  return (
    <div>
      <div>
        Search
        <input
          placeholder="Search"
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
        />
      </div>

      <div>
        Category
        <input
          value={categoryQuery}
          placeholder="Search categories"
          onChange={handleCategoryQueryChange}
        />
        <div>
          {!!filteredCategories.length && (
            <div>
              <input type="checkbox" onChange={handleAllCategoriesChange} />
              All
            </div>
          )}
          {filteredCategories.map((category) => (
            <div key={category}>
              <input
                type="checkbox"
                name={category}
                checked={selectedCategories.includes(category)}
                onChange={handleCategoryChange}
              />
              {category}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Filters;
