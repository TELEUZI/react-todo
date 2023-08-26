import { Suspense, lazy, useCallback, useEffect, useState } from 'react';

import './App.css';
import { getTodos } from '../../api/todos';
import { UserProvider } from '../../providers/useIinfoProvider';
import { ITodo } from '../../interfaces/ITodo';
import Card from '../../components/card/Card';

const TodoList = lazy(() => import('../todo-list/TodoList'));

function App() {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [showTodoList, setShowTodoList] = useState(false);
  useEffect(() => {
    getTodos().then((res) => {
      setTodos(res);
    });
  }, []);
  const increment = useCallback(() => {
    setCount((count) => count + 1);
  }, [setCount]);

  return (
    <UserProvider>
      <button onClick={() => setShowTodoList(!showTodoList)}>Show Todo List</button>
      <Card increment={increment} count={count} />
      {showTodoList && (
        <Suspense fallback={<div>Loading...</div>}>
          <TodoList todos={todos} />
        </Suspense>
      )}
    </UserProvider>
  );
}

export default App;
