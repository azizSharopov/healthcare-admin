//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import {
  postFakeLogin,
  postJwtLogin,
} from "../../../helpers/fakebackend_helper";

import { loginSuccess, logoutUserSuccess, apiError, reset_login_flag } from './reducer';

// const fireBaseBackend = getFirebaseBackend();

export const loginUser = (user: any, history: any) => async (dispatch: any) => {
  try {
    let data = {
      first_name: 'John Doe',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3NlcSI6MSwidXNlcl9pZCI6Im1yaGVhbHRoIiwidXNlcl9uYW1lIjoi66-4656YIiwidXNlcl9lbWFpbCI6ImFkbWluQG1yLmNvbSIsInVzZXJfYmlydGgiOiIxOTcwLTAxLTAxIiwidXNlcl9tb2JpbGUiOiIwMTAtNTUyMy01NDM3IiwidXNlcl9nZW5kZXIiOiJNIiwidXNlcl96aXAiOm51bGwsInVzZXJfYWRkcjEiOm51bGwsInVzZXJfYWRkcjIiOm51bGwsImF1dGhfc2VxIjo0LCJhdXRoX2NvZGUiOiJTVVBFUl9BRE1JTiIsImF1dGhfbmFtZSI6Iuy0neq0hOq0gOumrOyekCIsInNuc19zZXEiOm51bGwsInNuc19uYW1lIjoiTk9NQUwiLCJob3Nfc2VxIjpudWxsLCJob3NfbmFtZSI6bnVsbCwiZW50ZXJfc2VxIjpudWxsLCJlbnRlcl9uYW1lIjpudWxsLCJzdGF0ZV9zZXEiOjEsInN0YXRlX25hbWUiOiLsoJXsg4EiLCJzdGF0ZV9jb250ZW50Ijoi7KCV7IOB7KCB7Jy866GcIOyEnOu5hOyKpCDsnbTsmqkg6rCA64ql7ZWcIO2ajOybkCIsImxvZ2luX2FibGVfeW4iOiJZIiwiaWF0IjoxNzE0NDU4NDkxLCJleHAiOjE3MjMwOTg0OTF9.HGnoj7_faDHvflFoE6jj9ppAMr4YeX-DbkKNVNIxByM',
    };

    if (data) {
      sessionStorage.setItem('authUser', JSON.stringify(data));
      dispatch(loginSuccess(data));
      history('/apps-member-list');
    }
  } catch (error: any) {
    dispatch(apiError(error));
  }
};
// export const loginUser = (user : any, history : any) => async (dispatch : any) => {
//   try {
//     let response;
//     if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
//       let fireBaseBackend : any = getFirebaseBackend();
//       response = fireBaseBackend.loginUser(
//         user.email,
//         user.password
//       );
//     } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
//       response = postJwtLogin({
//         email: user.email,
//         password: user.password
//       });

//     } else if (process.env.REACT_APP_API_URL) {
//       response = postFakeLogin({
//         email: user.email,
//         password: user.password,
//       });
//     }

//     var data = await response;

//     if (data) {
//       sessionStorage.setItem("authUser", JSON.stringify(data));
//       if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
//         var finallogin: any= JSON.stringify(data);
//         finallogin = JSON.parse(finallogin)
//         data = finallogin.data;
//         if (finallogin.status === "success") {
//           dispatch(loginSuccess(data));
//           history('/apps-member-list')
//         } else {
//           dispatch(apiError(finallogin));
//         }
//       } else {
//         dispatch(loginSuccess(data));
//         history('/apps-member-list')
//       }
//     }
//   } catch (error : any) {
//     dispatch(apiError(error));
//   }
// };

export const logoutUser = () => async (dispatch : any) => {
  try {
    sessionStorage.removeItem("authUser");
    let fireBaseBackend : any= getFirebaseBackend();
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = fireBaseBackend.logout;
      dispatch(logoutUserSuccess(response));
    } else {
      dispatch(logoutUserSuccess(true));
    }

  } catch (error : any) {
    dispatch(apiError(error));
  }
};

export const socialLogin = (type : any, history : any) => async (dispatch : any) => {
  try {
    let response;

    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const fireBaseBackend : any = getFirebaseBackend();
      response = fireBaseBackend.socialLoginUser(type);
    }
    //  else {
      //   response = postSocialLogin(data);
      // }
      
      const socialdata = await response;
    if (socialdata) {
      sessionStorage.setItem("authUser", JSON.stringify(response));
      dispatch(loginSuccess(response));
      history('/apps-member-list')
    }

  } catch (error : any) {
    dispatch(apiError(error));
  }
};

export const resetLoginFlag = () => async (dispatch : any) => {
  try {
    const response = dispatch(reset_login_flag());
    return response;
  } catch (error : any ){
    dispatch(apiError(error));
  }
};