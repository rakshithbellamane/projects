import * as types from '../actions/actionTypes';
import courseApi from '../api/mockCourseApi';
import {ajaxCallError, beginAjaxCalls} from "./ajaxStatusActions";

function loadCoursesSuccess(courses){
  return {
    type: types.LOAD_COURSES_SUCCESS,
    courses
  };
}

function updateCourseSuccess(course){
  return {
    type: types.UPDATE_COURSE_SUCCESS,
    course
  };
}

function createCourseSuccess(course){
  return {
    type: types.CREATE_COURSE_SUCCESS,
    course
  };
}


export function loadCourses(){
  return function(dispatch){
    dispatch(beginAjaxCalls());
    return courseApi.getAllCourses()
      .then(
        courses => {dispatch(loadCoursesSuccess(courses));}
    ).catch(error => {
      throw(error);
    });
  };
}

export function saveCourse(course){
  return function(dispatch, getState) {
    dispatch(beginAjaxCalls());
    return courseApi.saveCourse(course).then(savedCourse => {
      course.id ? dispatch(updateCourseSuccess(savedCourse)):
        dispatch(createCourseSuccess(savedCourse));
    }).catch(error => {
      dispatch(ajaxCallError());
      throw(error);
    });
  };
}
