import { memo, useContext, useState } from 'react';
import { ITodo } from '../../interfaces/ITodo';
import { UserContext } from '../../providers/useIinfoProvider';
import styles from './TodoItem.module.css';

const TodoItem = memo(
  ({ todo, onDelete, onEdit }: { todo: ITodo; onDelete: (id: number) => void; onEdit: (todo: ITodo) => void }) => {
    const userInfo = useContext(UserContext);
    const [editMode, setEditMode] = useState(false);
    const [todoTitle, setTodoTitle] = useState(todo.title);
    console.log(todo);

    return (
      <div className={styles.item}>
        {editMode ? (
          <input type="text" value={todoTitle} onChange={(e) => setTodoTitle(e.target.value)} />
        ) : (
          <p style={todo.completed ? { textDecoration: 'line-through' } : {}} className={styles.title}>
            {todo.title}
          </p>
        )}
        <div className={styles.controls}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => {
              onEdit({ ...todo, completed: !todo.completed });
            }}
          />
          {editMode ? (
            <button
              onClick={() => {
                onEdit({ ...todo, title: todoTitle });
                setEditMode(false);
              }}
            >
              Save
            </button>
          ) : (
            <button disabled={!userInfo || todo.completed || todo.userId !== userInfo?.id} onClick={() => setEditMode(true)}>
              Edit
            </button>
          )}
          <button disabled={!userInfo || todo.userId !== userInfo?.id} onClick={() => onDelete(todo.id)}>
            Delete
          </button>
        </div>
      </div>
    );
  },
  (prev, next) =>
    prev.todo.id === next.todo.id &&
    prev.todo.completed === next.todo.completed &&
    prev.todo.userId === next.todo.userId &&
    prev.todo.title === next.todo.title
);

export default TodoItem;
