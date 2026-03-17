import { useState } from 'react';
import './App.css';

function App() {
  type MealType = 'Japanese' | 'Chinese' | 'Italian' | 'Fast';

  const [mealType, setMealType] = useState<MealType | null>(null);
  const [dish, setDish] = useState<string | null>(null);
  const [isChoosing, setIsChoosing] = useState(false);

  const typeOptions: MealType[] = ['Japanese', 'Chinese', 'Italian', 'Fast'];

  const foodOptions: Record<MealType, string[]> = {
    Japanese: ['Ramen', 'Sushi', 'Donburi', 'Udon', 'Soba'],
    Chinese: ['Fried Rice', 'Mabo Dofu', 'Dumpling'],
    Italian: ['Pizza', 'Pasta', 'Lasagna'],
    Fast: ['Burger', 'Fried Chicken', 'Hot Dog']
  };

  const randomMealType = () => {
    setIsChoosing(true);

    setTimeout(() => {
      const randomIndex = Math.floor(typeOptions.length * Math.random());
      const selectedMealType = typeOptions[randomIndex];
      if (!selectedMealType) return;
      setMealType(selectedMealType);
      setIsChoosing(false);
    }, 1250);
  };

  const randomDish = () => {
    if (!mealType) return;

    setIsChoosing(true);

    setTimeout(() => {
      const randomIndex = Math.floor(foodOptions[mealType].length * Math.random());
      const selectedDish = foodOptions[mealType][randomIndex];
      if (!selectedDish) return;
      setDish(selectedDish);
      setIsChoosing(false);
    }, 1250);
  };

  return (
    <>
      <h1>Meal Decision Roulette</h1>
      <p>
        This is an app to make decision in today's meal. It's good to just have what you want, but there are times when
        you can't decide. So rotate this roulette.
      </p>
      {!mealType && !isChoosing && (
        <>
          <h2>What type of meal do you want to eat?</h2>

          <div>
            {typeOptions.map((option) => (
              <button key={option} onClick={() => setMealType(option)}>
                {option}
              </button>
            ))}
          </div>

          <div>
            <button onClick={randomMealType}>haven't decided yet</button>
          </div>
        </>
      )}

      {isChoosing && (
        <>
          <h2>Choosing...</h2>
          <p>Your meal will be decided shortly.</p>
        </>
      )}

      {mealType && !dish && !isChoosing && (
        <>
          <h2>Choose a dish of {mealType} Food.</h2>
          <div>
            {foodOptions[mealType].map((dish) => (
              <button key={dish} onClick={() => setDish(dish)}>
                {dish}
              </button>
            ))}
          </div>
          <div>
            <button onClick={randomDish}>can't decide</button>
          </div>
          <button onClick={() => setMealType(null)}>Back</button>
        </>
      )}

      {!isChoosing && dish && (
        <>
          <h2>Your dish would be {dish}.</h2>
        </>
      )}
    </>
  );
}

export default App;
