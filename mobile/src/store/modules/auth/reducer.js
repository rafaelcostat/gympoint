import produce from 'immer';

const INITIAL_STATE = {
  signed: false,
  student: null,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/SIGN_IN_SUCCESS': {
        draft.student = action.payload.student;
        draft.signed = true;
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.student = null;
        draft.loading = false;
        draft.signed = false;
        break;
      }
      case '@auth/SIGN_IN_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
        break;
    }
  });
}
