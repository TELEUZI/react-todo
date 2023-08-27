import { Dispatch, SetStateAction, useCallback } from 'react';
import * as API from '../api/todos';
import { ITodo } from '../interfaces/ITodo';

const useTodoApi = <T>(fn: (arg: T) => Promise<unknown>, setTodos: Dispatch<SetStateAction<ITodo[]>>) => {
  const getTodoFactory = useCallback(
    (arg: T) => {
      return fn(arg)
        .then(() => API.getTodos())
        .then((res) => {
          setTodos(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [setTodos, fn]
  );

  return getTodoFactory;
};

export default useTodoApi;
