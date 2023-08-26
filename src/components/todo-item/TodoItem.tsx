import { useContext } from 'react';
import { ITodo } from '../../interfaces/ITodo';
import { UserContext } from '../../providers/useIinfoProvider';
import styles from './TodoItem.module.css';

const TodoItem = ({ todo, onDelete, onEdit }: { todo: ITodo; onDelete: (id: number) => void; onEdit: (id: number) => void }) => {
  const userInfo = useContext(UserContext);
  return (
    <div className={styles.item} style={todo.completed ? { textDecoration: 'line-through' } : {}}>
      <p className={styles.title}>{todo.title}</p>
      <div className={styles.controls}>
        <button disabled={!userInfo || todo.completed || todo.userId !== userInfo?.id} onClick={() => onEdit(todo.id)}>
          Edit
        </button>
        <button disabled={!userInfo || todo.userId !== userInfo?.id} onClick={() => onDelete(todo.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
