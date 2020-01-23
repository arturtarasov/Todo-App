import React, { useContext, useReducer } from 'react';
import { Alert } from 'react-native';

import { ScreenContext } from '../screen/screenContext';
import {
  ADD_TODO,
  CLEAR_ERROR,
  FETCH_TODOS,
  HIDE_LOADER,
  REMOVE_TODO,
  SHOW_ERROR,
  SHOW_LOADER,
  UPDATE_TODO,
} from '../types';
import { TodoContext } from './todoContext';
import { todoReducer } from './todoReducer';
import { Http } from '../../http';

export const TodoState = ({ children }) => {
  const initialState = {
    todos: [],
    loading: false,
    error: null
  };
  const { changeScreen } = useContext(ScreenContext);
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const addTodo = async title => {
    try {
      const data = await Http.post(
        "https://todo-app-react-native-a3083.firebaseio.com/todos.json", 
        {title})
      dispatch({ type: ADD_TODO, id: data.name, title });
    } catch(e) {
      showError('Что-то пошло не так...')
    }
  };
  const removeTodo = id => {
    const todo = state.todos.find(t => t.id === id);
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
          onPress: async () => {
            changeScreen(null);
            await Http.delete(`https://todo-app-react-native-a3083.firebaseio.com/todos/${id}.json`)
            dispatch({ type: REMOVE_TODO, id });
          }
        }
      ],
      { cancelable: false }
    );
  };
  const updateTodo = async (id, title) => {
    clearError()
    try {
      await Http.path(`https://todo-app-react-native-a3083.firebaseio.com/todos/${id}.json`)
      dispatch({ type: UPDATE_TODO, id, title })
    } catch(e) {
      showError('Что-то пошло не так...')
      console.log(e)
    }
    
  }

  const showLoader = () => dispatch({ type: SHOW_LOADER });
  const hideLoader = () => dispatch({ type: HIDE_LOADER });

  const showError = error => dispatch({ type: SHOW_ERROR, error });
  const clearError = () => dispatch({ type: CLEAR_ERROR });

  const fetchTodos = async () => {
    showLoader()
    clearError()
    try {
      const data = await Http.get('https://todo-app-react-native-a3083.firebaseio.com/todos.json')
      const todos = Object.keys(data).map(key => ({ ...data[key], id: key }));
      dispatch({ type: FETCH_TODOS, todos });
    } catch(e) {
      showError('Что-то пошло не так...')
      console.log(e)
    } finally {
      hideLoader()
    }
  };
  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        addTodo,
        removeTodo,
        updateTodo,
        loading: state.loading,
        error: state.error,
        fetchTodos
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
