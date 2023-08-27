import { memo } from 'react';
import TodoItem from '../../components/todo-item/TodoItem';
import { ITodo } from '../../interfaces/ITodo';

const TodoList = memo(({ todos, onDelete, onEdit }: { todos: ITodo[]; onDelete: (id: number) => void; onEdit: (todo: ITodo) => void }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onDelete={onDelete} onEdit={onEdit}></TodoItem>
      ))}
    </ul>
  );
});

export default TodoList;
