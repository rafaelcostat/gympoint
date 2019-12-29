import { Alert } from 'react-native';
import { all, takeLatest, call, put } from 'redux-saga/effects';

import api from '~/services/api';

import { signInSuccess, signInFailure } from './actions';

export function* signIn({ payload }) {
  try {
    if (!payload) return;

    const { id } = payload;

    const response = yield call(api.get, `/students/${id}`);

    if (response.data) {
      yield put(signInSuccess(response.data));
    } else {
      Alert.alert('Falha na autenticação', 'Usuário inválido');
      yield put(signInFailure());
    }
  } catch (error) {
    Alert.alert('Falha na autenticação', 'Tente novamente');
    yield put(signInFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
