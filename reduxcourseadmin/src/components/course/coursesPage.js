import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as courseActions from '../../actions/courseActions';
import CourseList from './CourseList';
import {bindActionCreators} from 'redux';

class CoursesPage extends React.Component{
  constructor(props, context){
    super(props,context);
  }

  render(){
    const {courses} = this.props;
    return(
      <div>
        <h1>Courses</h1>
        <CourseList courses={courses}/>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps){
  return ({
    courses: state.courses
  });
}

function mapDispatchToProps(dispatch){
  return ({
    actions: bindActionCreators(courseActions,dispatch)
  });
}

CoursesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired
};

export default connect(mapStateToProps,mapDispatchToProps)(CoursesPage);
