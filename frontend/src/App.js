import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login_form from './components/forms/login_form';
import SignupForm from './components/forms/signup_form';
import Validate_layout from './layouts/Validate_layout';
import HomePage from './layouts/HomePage';
import Paths_layout from './layouts/Paths_layout';
import Classes_layout from './layouts/Classes_layout';
import Chats_layout from './layouts/Chats_layout';
import Profile_layout from './layouts/Profile_layout';
import General_courses_layout from './layouts/General_courses_layout';
import PathDetailsPage from './pages/PathDetailsPage'; 
import PathCourses from './pages/PathCourses';
import CourseDetails from './pages/CourseDetails';
import CourseClass from './pages/CourseClass';
import MentorPath from './pages/MentorPath';
import CreateCourse from './pages/CreateCourse';
import EditCourse from './pages/EditCourse';
import ModulesDnd from './components/createCourse/ModulesDnd';
import PrivateRoute from './PrivateRoute';
import { AuthContext, AuthProvider } from './AuthContext';


function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!pathname.includes("/validate")) { // Exclude validate routes
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}

function App() {
  return (
    <AuthProvider> 
    <BrowserRouter>
      <Routes>
        <Route path="/">
        
          <Route index element={<HomePage />} />

          <Route path="validate" element={<Validate_layout />}>
            <Route index element={<SignupForm />} />
            <Route path="login" element={<Login_form />} />
          </Route>

          <Route element={<PrivateRoute />}>

            <Route path="paths" element={<Paths_layout />} />

            <Route path="/paths/:pathId" element={<PathDetailsPage />}/>
            
            <Route path='/paths/:pathId/courses' element={<PathCourses />} />

            <Route path='/paths/:pathId/dashboard' element={<MentorPath />} />

            <Route path='profile' element={<Profile_layout/>} />

            <Route path='/paths/:pathId/create-course' element={<CreateCourse/>} />

            <Route path='paths/:pathId/:courseId/edit-course' element={<EditCourse />}/>

            <Route path='/paths/:pathId/courses/:courseId' element={<CourseDetails/>} />

            <Route path='/paths/:pathId/courses/:courseId/class' element={<CourseClass/>} />

            <Route path="my_classes" element={<Classes_layout/>} />

          </Route>

        </Route>
      </Routes>
      <ScrollToTop />
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
