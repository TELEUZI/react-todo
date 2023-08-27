import { ITodo } from '../interfaces/ITodo';

const LOCAL_TODOS_URL = 'http://localhost:3004/todos';

export function getTodos(
  { limit = 10 }: { limit?: number } = {
    limit: 10,
  }
): Promise<ITodo[]> {
  return fetch(`${LOCAL_TODOS_URL}?limit=${limit}`).then((res) => res.json());
}

export function addTodo(todo: Omit<ITodo, 'id'>) {
  return fetch(LOCAL_TODOS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  }).then((res) => res.json());
}

export function deleteTodo(id: number) {
  return fetch(`${LOCAL_TODOS_URL}/${id}`, {
    method: 'DELETE',
  });
}

export function updateTodo(todo: ITodo) {
  return fetch(`${LOCAL_TODOS_URL}/${todo.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  }).then((res) => res.json());
}

export function patchTodo(todo: Partial<ITodo>) {
  return fetch(`${LOCAL_TODOS_URL}/${todo.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  }).then((res) => res.json());
}
