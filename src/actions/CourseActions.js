import ActionTypes from './actionTypes';
import courseApi from '../api/mockCourseApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';

export function loadCoursesSuccess(courses) {
    return { type: ActionTypes.LOAD_COURSES_SUCCESS, courses };
}

export function createCourseSuccess(course) {
    return { type: ActionTypes.CREATE_COURSE_SUCCESS, course };
}

export function updateCourseSuccess(course) {
    return { type: ActionTypes.UPDATE_COURSE_SUCCESS, course };
}

export function deleteCourseSuccess(course) {
    return { type: ActionTypes.DELETE_COURSE_SUCCESS, course };
}

export function loadCourses() {
    return function(dispatch) {
        dispatch(beginAjaxCall());
        return courseApi.getAllCourses().then(courses => {
            dispatch(loadCoursesSuccess(courses));
        }).catch(error => {
            throw(error);
        });
    };
}

export function saveCourse(course) {
    return function (dispatch, getState) {
        dispatch(beginAjaxCall());
        return courseApi.saveCourse(course).then(savedCourse => {
            course.id ? dispatch(updateCourseSuccess(savedCourse)) :
                dispatch(createCourseSuccess(savedCourse));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    };
}

export function deleteCourse(course) {
    return function (dispatch) {
        return courseApi.deleteCourse(course.id)
            .then(course => {
                dispatch(deleteCourseSuccess(course));
            }).catch(error => {
                throw(error);
            })
    }
}

