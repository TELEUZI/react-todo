import TodoItem from '../../components/todo-item/TodoItem';
import { ITodo } from '../../interfaces/ITodo';

const TodoList = ({ todos }: { todos: ITodo[] }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onDelete={console.log} onEdit={console.log}></TodoItem>
      ))}
    </ul>
  );
};

export default TodoList;
