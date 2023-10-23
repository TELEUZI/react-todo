import https from 'https';

/**
 * Retrieves todos from an external API.
 *
 * @return {Promise<{id: string, title: string; completed: boolean; userId: number}[]>} A promise that resolves to an array of todos.
 */
export const getTodos = () => {
  return new Promise((resolve, reject) => {
    https
      .get('https://jsonplaceholder.typicode.com/todos', (res) => {
        const data = [];
        const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
        console.log('Status Code:', res.statusCode);
        console.log('Date in Response header:', headerDate);

        res.on('data', (chunk) => {
          data.push(chunk);
        });

        res.on('end', () => {
          console.log('Response ended: ');
          const serverTodos = JSON.parse(Buffer.concat(data).toString());
          resolve(serverTodos);
        });
      })
      .on('error', (err) => {
        console.log('Error: ', err.message);
        reject([]);
      });
  });
};
