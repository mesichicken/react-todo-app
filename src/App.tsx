import { useEffect, useState } from 'react';

import { TodoList } from './components/TodoList';
import { AddTodoForm } from './components/AddTodoForm';
import { TodoSummary } from './components/TodoSummary';

import { Todo } from './types/todo';

function App() {
  const [todoList, setTodoList] = useState<Todo[]>(() => {
    // ローカルストレージからTodoリストを取得
    const localStrageTodoList = localStorage.getItem('todoList');

    // 配列に変換
    return JSON.parse(localStrageTodoList ?? '[]');
  })

  // 第2引数のtodoListの値が変更されると発火
  useEffect(() => {
    // ローカルストレージに保存
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList])

  // 対象のTodoの完了を変更
  const changeCompleted = (id: number) => {
    // 変更前のTodoリストが引数として呼び出せる
    setTodoList((prevTodoList) => {
      return prevTodoList.map((todo) => {
        // 対象のidなら、completedを変更
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        // それ以外のtodoなら、そのまま返す
        return todo;
      });
    });
  };

  const addTodo = (title: string) => {
    setTodoList((prevTodoList) => {
      const newTodo = {
        id: Date.now(),
        title,
        completed: false,
      };

      return [newTodo, ...prevTodoList];
    });
  }

  const deleteTodo = (id: number) => {
    setTodoList((prevTodoList) => {
      return prevTodoList.filter((todo) => {
        return todo.id !== id;
      });
    })
  };

  const deleteAllCompleted = () => {
    setTodoList((prevTodoList) => {
      return prevTodoList.filter((todo) => !todo.completed);
    })
  }

  return (
    <main className="mx-auto mt-10 max-w-xl space-y-10">
      <h1 className="text-center text-4xl">Todoアプリ</h1>
      <div className="space-y-5">
        <AddTodoForm  addTodo={addTodo}/>
        <div className="space-y-5 rounded bg-slate-200 p-5">
          <TodoList
            todoList={todoList}
            changeCompleted={changeCompleted}
            deleteTodo={deleteTodo}
          />
          <TodoSummary deleteAllCompleted={deleteAllCompleted} />
        </div>
      </div>
    </main>
  );
}

export default App;
