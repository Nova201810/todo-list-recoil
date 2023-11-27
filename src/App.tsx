import { Container } from 'react-bootstrap';
import { useEffect } from 'react';

import { useGetTasks } from './store/hooks/useGetTasks';
import Filters from './components/Filters';
import AddTask from './components/AddTask';

function App() {
  const getTasks = useGetTasks();

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="App">
      <body>
        <Container className="mt-4">
          <h1>Список заданий</h1>
          <div className="mt-4">
            <Filters />
          </div>
          <AddTask />
        </Container>
      </body>
    </div>
  );
}

export default App;
