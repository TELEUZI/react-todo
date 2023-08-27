import { Dispatch, SetStateAction, memo, useContext, useState } from 'react';
import useTodoApi from '../../hooks/useTodoApi';
import { ITodo } from '../../interfaces/ITodo';
import * as API from '../../api/todos';
import { UserContext } from '../../providers/useIinfoProvider';

const CreateTodo = memo(({ setTodos }: { setTodos: Dispatch<SetStateAction<ITodo[]>> }) => {
  const [newTodo, setNewTodo] = useState('');
  const addTodo = useTodoApi(API.addTodo, setTodos);
  const user = useContext(UserContext);

  return user !== null ? (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)}></input>
      <button
        type="submit"
        onClick={() => {
          setNewTodo('');
          addTodo({ title: newTodo, completed: false, userId: user.id });
        }}
      >
        Add Todo
      </button>
    </form>
  ) : null;
});

export default CreateTodo;
