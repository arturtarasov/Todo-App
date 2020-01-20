import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Navbar } from './src/components/Navbar';
import { MainScreen } from './src/screens/MainScreen';
import { TodoScreen } from './src/screens/TodoScreen';

export default function App() {
  const [todoId, setTodoId] = useState("2");
  const [todos, setTodos] = useState([
    {
      id: "1",
      title: "выучить react native"
    },
    {
      id: "2",
      title: "написать приложение"
    }
  ]);

  const addTodo = title => {
    setTodos(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        title
      }
    ]);
  };

  const removeTodo = id => {
    const todo = todos.find(t => t.id === id);
    Alert.alert(
      "Удаление элемента",
      `Вы уверены, что хотите удалить ${todo.title}?`,
      [
        {
          text: "Отмена",
          style: "cancel"
        },
        {
          text: "Удалить",
          style: "destructive",
          onPress: () => {
            setTodoId(null);
            setTodos(prev => prev.filter(todo => todo.id !== id));
          }
        }
      ],
      { cancelable: false }
    );
  };

  let conent = (
    <MainScreen
      todos={todos}
      addTodo={addTodo}
      removeTodo={removeTodo}
      openTodo={setTodoId}
    />
  );

  if (todoId) {
    const selectedTodo = todos.find(todo => todo.id === todoId);
    conent = (
      <TodoScreen
        goBack={() => {
          setTodoId(null);
        }}
        todo={selectedTodo}
        onRemove={removeTodo}
      />
    );
  }

  return (
    <View>
      <Navbar title="Todo App" />
      <View style={styles.container}>{conent}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20
  }
});
