import { useState } from 'react';
import { ChiramiViewer } from 'chirami';

function App() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    const newCount = count + 1;
    setCount(newCount);

    console.log('Button clicked!', {
      count: newCount,
      timestamp: new Date(),
      user: { name: 'Test User', role: 'admin' }
    });

    if (newCount % 3 === 0) {
      console.warn('Count is divisible by 3!', [1, 2, 3]);
    }
    if (newCount % 5 === 0) {
      console.error('Oops, divisible by 5 (Error test)', new Error('Something wrong'));
    }
    if (newCount % 7 === 0) {
      console.info('Thank you very much for choosing Chirami !');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Chirami Test</h1>
      <div className="card">
        <button onClick={handleClick}>
          count is {count} (Click to log)
        </button>
        <button onClick={() => console.log("HOGE", new Date())}>
          Single LOG
        </button>
        <p>
          Click the button and check the overlay at the bottom!
        </p>
      </div>

      <ChiramiViewer />
    </div>
  );
}

export default App;