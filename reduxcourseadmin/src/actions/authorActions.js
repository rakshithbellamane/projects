import * as types from '../actions/actionTypes';
import AuthorApi from '../api/mockAuthorApi';
import {beginAjaxCalls} from "./ajaxStatusActions";

export function loadAuthorsSuccess(authors){
  return {
    type: types.LOAD_AUTHORS_SUCCESS,
    authors
  };
}

export function loadAuthors(){
  return dispatch => {
    dispatch(beginAjaxCalls());
    return AuthorApi.getAllAuthors()
      .then(
        authors => {dispatch(loadAuthorsSuccess(authors));}
    ).catch(error => {
      throw(error);
    });
  };
}
