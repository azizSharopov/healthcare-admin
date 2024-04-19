import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Container, Input, Label, Row, Button, Form, FormFeedback, Alert, Spinner } from 'reactstrap';
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import withRouter from "../../Components/Common/withRouter";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

// actions
import { loginUser, socialLogin, resetLoginFlag } from "../../slices/thunks";

import health from "../../assets/images/health.png"
import doctor from "../../assets/images/doctor.png"
import digital from "../../assets/images/digital.png"
import naver from "../../assets/images/naver.png"
import kakao from "../../assets/images/kakao.png"
import google from "../../assets/images/google.png"




import { createSelector } from 'reselect';
//import images

const Login = (props: any) => {
    const dispatch: any = useDispatch();

    const selectLayoutState = (state: any) => state;
    const loginpageData = createSelector(
        selectLayoutState,
        (state) => ({
            user: state.Account.user,
            error: state.Login.error,
            errorMsg: state.Login.errorMsg,
        })
    );
    // Inside your component
    const {
        user, error, errorMsg
    } = useSelector(loginpageData);

    const [userLogin, setUserLogin] = useState<any>([]);
    const [passwordShow, setPasswordShow] = useState<boolean>(false);
    const [loader, setLoader] = useState<boolean>(false);

    useEffect(() => {
        if (user && user) {
            const updatedUserData = process.env.REACT_APP_DEFAULTAUTH === "firebase" ? user.multiFactor.user.email : user.email;
            const updatedUserPassword = process.env.REACT_APP_DEFAULTAUTH === "firebase" ? "" : user.confirm_password;
            setUserLogin({
                email: updatedUserData,
                password: updatedUserPassword
            });
        }
    }, [user]);

    const validation: any = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            email: userLogin.email || "" || '',
            password: userLogin.password || "" || '',
        },
        validationSchema: Yup.object({
            email: Yup.string().required("이메일을 입력하지 않았습니다."),
            password: Yup.string().required("비밀번호를 입력하지 않았습니다."),
        }),
        onSubmit: (values) => {
            dispatch(loginUser(values, props.router.navigate));
            setLoader(true)
        }
    });

    const signIn = (type: any) => {
        dispatch(socialLogin(type, props.router.navigate));
    };

    //handleTwitterLoginResponse
    // const twitterResponse = e => {}

    //for facebook and google authentication
    const socialResponse = (type: any) => {
        signIn(type);
    };


    useEffect(() => {
        if (errorMsg) {
            setTimeout(() => {
                dispatch(resetLoginFlag());
                setLoader(false)
            }, 3000);
        }
    }, [dispatch, errorMsg]);

    document.title = "Basic SignIn | Velzon - React Admin & Dashboard Template";
    return (
        <React.Fragment>
            <ParticlesAuth>
                <div className="auth-page-content mt-lg-5">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="text-center mt-sm-2 mb-4 text-white-50">
                                    <div>
                                        <Link to="/" className="d-inline-block auth-logo">
                                            <img src={digital} alt="" height="70" />
                                        </Link>
                                    </div>
                                    <p className="mt-3 fs-15 fw-medium">Digital Healthcare</p>
                                </div>
                            </Col>
                           
                        </Row>

                        <Row className="justify-content-center">
                            <Col md={8} lg={6} xl={5}>
                                <Card className="mt-4">
                                    <CardBody className="p-4">
                                        <div className="text-center mt-2">
                                           
                                            <img src={health} alt="" height="20"  />
                                            <p className="text-muted p-2" >당신의 평생 건강파트너</p>
                                        </div>
                                        {error && error ? (<Alert color="danger"> {error} </Alert>) : null}
                                        <div className="p-2 mt-4">
                                            <Form
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    validation.handleSubmit();
                                                    return false;
                                                }}
                                                action="#">

                                                <div className="mb-3">
                                                    <Label htmlFor="email" className="form-label">이메일</Label>
                                                    <Input
                                                        name="email"
                                                        className="form-control"
                                                        placeholder="이메일 주소를 입력하세요"
                                                        type="email"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.email || ""}
                                                        invalid={
                                                            validation.touched.email && validation.errors.email ? true : false
                                                        }
                                                    />
                                                    {validation.touched.email && validation.errors.email ? (
                                                        <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                                                    ) : null}
                                                </div>

                                                <div className="mb-3">
                                                    <div className="float-end">
                                                        <Link to="/forgot-password" className="text-muted">비밀번호 찾기</Link>
                                                    </div>
                                                    <Label className="form-label" htmlFor="password-input">비밀번호</Label>
                                                    <div className="position-relative auth-pass-inputgroup mb-3">
                                                        <Input
                                                            name="password"
                                                            value={validation.values.password || ""}
                                                            type={passwordShow ? "text" : "password"}
                                                            className="form-control pe-5"
                                                            placeholder="비밀번호를 입력해주세요"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            invalid={
                                                                validation.touched.password && validation.errors.password ? true : false
                                                            }
                                                        />
                                                        {validation.touched.password && validation.errors.password ? (
                                                            <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                                                        ) : null}
                                                        <button className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted" type="button" id="password-addon" onClick={() => setPasswordShow(!passwordShow)}><i className="ri-eye-fill align-middle"></i></button>
                                                    </div>
                                                </div>

                                                <div className="form-check">
                                                    <Input className="form-check-input" type="checkbox" value="" id="auth-remember-check" />
                                                    <Label className="form-check-label" htmlFor="auth-remember-check">자동 로그인</Label>
                                                </div>

                                                <div className="mt-4">
                                                    <Button color="success"
                                                        disabled={loader && true}
                                                        className="btn btn-success w-100" type="submit">
                                                        {loader && <Spinner size="sm" className='me-2'> Loading... </Spinner>}
                                                        로그인
                                                    </Button>
                                                </div>

                                                <div className="mt-4 text-center">
                                                    <div className="signin-other-title">
                                                        <h5 className="fs-13 mb-4 title">Sign in with</h5>
                                                    </div>
                                                    <div className="d-flex justify-content-evenly">
                                                      
                                                        <Link
                                                            to="#"
                                                            className="btn btn-danger btn-icon me-1"
                                                            onClick={e => {
                                                                e.preventDefault();
                                                                socialResponse("google");
                                                            }}
                                                        >
                                                           <img src={google} alt="" height="40" />
                                                        </Link>
                                                        <Link
                                                            to="#"
                                                            className="btn btn-success btn-icon me-1"
                                                            onClick={e => {
                                                                e.preventDefault();
                                                                socialResponse("naver");
                                                            }}
                                                        >
                                                            <img src={naver} alt="" height="40" />
                                                        </Link>
                                                        <Link
                                                            to="#"
                                                            className="btn btn-warning btn-icon me-1"
                                                            onClick={e => {
                                                                e.preventDefault();
                                                                socialResponse("kakaotalk");
                                                            }}
                                                        >
                                                            {/* <i className="ri-kakao-talk-fill fs-16" /> */}
                                                            <img src={kakao} alt="" height="40" />
                                                        </Link>
    
                                                        
                                                    </div>
                                                </div>
                                            </Form>
                                        </div>
                                    </CardBody>
                                </Card>

                                <div className="mt-4 text-center">
                                    <p className="mb-0">Don't have an account ? <Link to="/register" className="fw-semibold text-primary text-decoration-underline"> 가입하기 </Link> </p>
                                </div>

                            </Col>
                            <Col md={8} lg={6} xl={5} className="">
                            <img src={doctor} alt="" height="400" />
                            </Col>
                        </Row>
                       
                     
                       
                       
                    </Container>
                </div>
            </ParticlesAuth>
        </React.Fragment>
    );
};

export default withRouter(Login);