import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Navbar } from './components/Navbar';
import { ScreenContext } from './context/screen/screenContext';
import { TodoContext } from './context/todo/todoContext';
import { MainScreen } from './screens/MainScreen';
import { TodoScreen } from './screens/TodoScreen';
import { THEME } from './theme';

export const MainLayout = () => {
  const { todos, addTodo, removeTodo, updateTodo } = useContext(TodoContext);
  const { todoId, changeScreen } = useContext(ScreenContext);
  // const [todoId, setTodoId] = useState(null);
  // const [todos, setTodos] = useState([
  //   {
  //     id: "1",
  //     title: "выучить react native"
  //   }
  // ]);

  // const addTodo = title => {
  //   setTodos(prev => [
  //     ...prev,
  //     {
  //       id: Date.now().toString(),
  //       title
  //     }
  //   ]);
  // };

  // const removeTodo = id => {
  //   const todo = todos.find(t => t.id === id);
  //   Alert.alert(
  //     "Удаление элемента",
  //     `Вы уверены, что хотите удалить ${todo.title}?`,
  //     [
  //       {
  //         text: "Отмена",
  //         style: "cancel"
  //       },
  //       {
  //         text: "Удалить",
  //         style: "destructive",
  //         onPress: () => {
  //           setTodoId(null);
  //           setTodos(prev => prev.filter(todo => todo.id !== id));
  //         }
  //       }
  //     ],
  //     { cancelable: false }
  //   );
  // };

  // const updateTodo = (id, title) => {
  //   setTodos(old =>
  //     old.map(todo => {
  //       if (todo.id === id) {
  //         todo.title = title;
  //       }
  //       return todo;
  //     })
  //   );
  // };

  let conent = (
    <MainScreen
      todos={todos}
      addTodo={addTodo}
      removeTodo={removeTodo}
      openTodo={changeScreen}
    />
  );

  if (todoId) {
    const selectedTodo = todos.find(todo => todo.id === todoId);
    conent = (
      <TodoScreen
        goBack={() => {
          changeScreen(null);
        }}
        todo={selectedTodo}
        onRemove={removeTodo}
        onSave={updateTodo}
      />
    );
  }

  return (
    <View>
      <Navbar title="Todo App" />
      <View style={styles.container}>{conent}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: 20
  }
});
