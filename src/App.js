import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const debounceFetch = setTimeout(() => {
    const fetchMeals = async () => {
      setLoading(true);
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
        const data = await response.json();
        if (data.meals) {
          const filteredMeals = data.meals.filter(meal => 
            meal.strInstructions.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
            meal.strMeal.toLowerCase().includes(searchTerm.trim().toLowerCase()) //trimmed the space even if user enters space
          )
          setMeals(filteredMeals);
        } else {
          setMeals([]);
        }

      setLoading(false);
    };

    fetchMeals();
  }, 300); //debounce time of 300ms

  return () => clearTimeout(debounceFetch);
  }, [searchTerm]);

  return (
    <div>
      <h1>Meal Search</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search"
      />
      <div className='meal-container'>{loading && <p>Loading * * * *</p>}</div>
      <div className="meal-container">
        {meals.length > 0 ? (
          meals.map(meal => (
            <div key={meal.idMeal} className="meal-card">
              <h2>{meal.strMeal}</h2><img src={meal.strMealThumb} alt={meal.strMeal} />
              <p title={meal.strInstructions}>{meal.strInstructions}</p>
            </div>
          ))
        ) : (
          !loading && <p>No Data</p>
        )}
      </div>
    </div>
  );
}

export default App;