import { Suspense, lazy, useCallback, useEffect, useState } from 'react';

import './App.css';
import * as API from '../../api/todos';
import { ITodo } from '../../interfaces/ITodo';
import Card from '../../components/card/Card';
import useTodoApi from '../../hooks/useTodoApi';

const TodoList = lazy(() => import('../todo-list/TodoList'));
const CreateTodo = lazy(() => import('../../components/create-todo/CreateTodo'));
function App() {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [showTodoList, setShowTodoList] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const getTodos = useTodoApi(API.getTodos, setTodos);
  const increment = useCallback(() => {
    setCount((count) => count + 1);
  }, [setCount]);
  const deleteTodo = useTodoApi(API.deleteTodo, setTodos);
  const editTodo = useTodoApi(API.patchTodo, setTodos);

  const Loading = <div>Loading...</div>;

  useEffect(() => {
    if (showTodoList) {
      setIsLoading(true);
      getTodos({ limit: 10 }).finally(() => setIsLoading(false));
    }
  }, [getTodos, showTodoList]);

  return (
    <>
      <button onClick={() => setShowTodoList(!showTodoList)}>Show Todo List</button>
      <Card increment={increment} count={count} />
      {showTodoList && <CreateTodo setTodos={setTodos} />}
      {showTodoList && (
        <Suspense fallback={Loading}>{isLoading ? Loading : <TodoList todos={todos} onDelete={deleteTodo} onEdit={editTodo} />}</Suspense>
      )}
    </>
  );
}

export default App;
