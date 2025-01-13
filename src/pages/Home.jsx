import React, { useState, useEffect } from 'react';

function Home() {
  const [task, setTask] = useState('');
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodo(storedTodos);
  }, []);

  const handleTodo = (event) => {
    event.preventDefault();
    if (task.trim().length < 3) {
      alert("Vazifa kamida 3 ta belgidan iborat bo'lishi kerak!");
      return;
    }
    const newTodo = { task, id: Date.now(), comments: [] };
    const updatedTodos = [...todo, newTodo];
    setTodo(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setTask('');
  };

  const handleComment = (id, comment) => {
    if (!comment || comment.trim() === '') {
      alert("Komment bo'sh bo'lishi mumkin emas!");
      return;
    }
    const updatedTodos = todo.map((todoItem) => {
      if (todoItem.id === id) {
        todoItem.comments.push(comment);
      }
      return todoItem;
    });
    setTodo(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const deleteComment = (todoId, commentIndex) => {
    const updatedTodos = todo.map((todoItem) => {
      if (todoItem.id === todoId) {
        todoItem.comments.splice(commentIndex, 1);
      }
      return todoItem;
    });
    setTodo(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  return (
    <div className=" flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full bg-white p-10 rounded-xl shadow-slate-700 shadow-2xl">
        <h2 className="text-4xl font-extrabold text-center text-indigo-800 mb-8">Task qo'shish</h2>

        <form onSubmit={handleTodo} className="space-y-6">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Maqola kiriting..."
            className="w-full p-4 bg-gray-50 border-2 border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
          />
          <button
            type="submit"
            className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-blue-500 text-white font-semibold rounded-lg transition duration-300"
          >
            Add Task
          </button>
        </form>

        <ul className="mt-10 space-y-6">
          {todo.map(({ task, id, comments }) => (
            <li key={id} className="bg-white p-6 rounded-xl shadow-lg space-y-4 hover:shadow-xl transition duration-300">
              <span className="block text-xl font-medium text-gray-900">{task}</span>
              <div>
                <button
                  onClick={() => handleComment(id, prompt('Kommentni kiriting:'))}
                  className="text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Komment yozish+
                </button>
                {comments.length > 0 && (
                  <div className="mt-4">
                    <strong className="block mb-2 text-indigo-700">Kommentlar:</strong>
                    <ul className="space-y-3">
                      {comments.map((comment, index) => (
                        <li key={index} className="flex justify-between items-center bg-indigo-50 p-3 rounded-lg shadow-md">
                          <span className="text-gray-700">{comment}</span>
                          <button
                            onClick={() => deleteComment(id, index)}
                            className="text-red-500 hover:text-red-600 font-medium"
                          >
                            O'chirish
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
