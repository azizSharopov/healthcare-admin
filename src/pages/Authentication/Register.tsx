import React, { useEffect, useState } from "react";
import { Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, FormFeedback, Spinner, Button } from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// action
import { registerUser, resetRegisterFlag } from "../../slices/thunks";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

//import images 
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
import { createSelector } from "reselect";
import health from "../../assets/images/health.png"
import doctor from "../../assets/images/doctor.png"
import digital from "../../assets/images/digital.png"
import naver from "../../assets/images/naver.png"
import kakao from "../../assets/images/kakao.png"
import google from "../../assets/images/google.png"

const Register = () => {
    const history = useNavigate();
    const dispatch: any = useDispatch();

    const [loader, setLoader] = useState<boolean>(false);

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            email: '',
            first_name: '',
            password: '',
            confirm_password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().required("이메일을 입력하지 않았습니다"),
            first_name: Yup.string().required("아이디를 입력하지 않았습니다"),
            password: Yup.string().required("비밀번호를 입력하지 않았습니다"),
            confirm_password: Yup.string()
                .oneOf([Yup.ref('비밀번호'), ""],)
                .required('비밀번호를 입력하지 않았습니다')
        }),
        onSubmit: (values) => {
            dispatch(registerUser(values));
            setLoader(true)
        }
    });

    const registerdatatype = createSelector(
        (state: any) => state.Account,
        (account) => ({
            success: account.success,
            error: account.error
        })
    );
    // Inside your component
    const {
        error, success
    } = useSelector(registerdatatype);

    useEffect(() => {
        if (success) {
            setTimeout(() => history("/login"), 3000);
        }

        setTimeout(() => {
            dispatch(resetRegisterFlag());
            setLoader(false)
        }, 3000);

    }, [dispatch, success, error, history]);

    document.title = "Basic SignUp | Healthcare - React Admin & Dashboard Template";

    return (
        <React.Fragment>
            <ParticlesAuth>
                <div className="auth-page-content mt-lg-4">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="text-center mt-sm-1 mb-4 text-white-50">
                                    <div>
                                        <Link to="/" className="d-inline-block auth-logo">
                                            <img src={digital} alt="" height="50" />
                                        </Link>
                                    </div>
                                    <p className="mt-3 fs-15 fw-medium">Digital Healthcare</p>
                                </div>
                            </Col>
                        </Row>

                        <Row className="justify-content-center">
                            <Col md={4} lg={4} xl={5}>
                                <Card className="mt-1">

                                    <CardBody className="p-4">
                                        <div className="text-center mt-2">
                                        <img src={health} alt="" height="20"  />
                                            <p className="text-muted p-2" >당신의 평생 건강파트너</p>
                                        </div>
                                        <div className="p-2 mt-2">
                                            <Form
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    validation.handleSubmit();
                                                    return false;
                                                }}
                                                className="needs-validation" action="#">

                                                {success && success ? (
                                                    <>
                                                        {toast("Your Redirect To Login Page...", { position: "top-right", hideProgressBar: false, className: 'bg-success text-white', progress: undefined, toastId: "" })}
                                                        <ToastContainer autoClose={2000} limit={1} />
                                                        <Alert color="success">
                                                            {/* Register User Successfully and Your Redirect To Login Page... */}
                                                            사용자를 성공적으로 등록하면 로그인 페이지로 리디렉션됩니다...
                                                        </Alert>
                                                    </>
                                                ) : null}

                                                {error && error ? (
                                                    <Alert color="danger"><div>
                                                        {/* Email has been Register Before, Please Use Another Email Address... */}
                                                        이전에 등록한 이메일입니다. 다른 이메일 주소를 사용해 주세요...
                                                         </div></Alert>
                                                ) : null}

                                                <div className="mb-2">
                                                    <Label htmlFor="useremail" className="form-label">이메일 <span className="text-danger">*</span></Label>
                                                    <Input
                                                        id="email"
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
                                                        <FormFeedback type="invalid"><div>{validation.errors.email}</div></FormFeedback>
                                                    ) : null}

                                                </div>
                                                <div className="mb-3">
                                                    <Label htmlFor="username" className="form-label">이름 <span className="text-danger">*</span></Label>
                                                    <Input
                                                        name="first_name"
                                                        type="text"
                                                        placeholder="이름을 입력해주세요"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.first_name || ""}
                                                        invalid={
                                                            validation.touched.first_name && validation.errors.first_name ? true : false
                                                        }
                                                    />
                                                    {validation.touched.first_name && validation.errors.first_name ? (
                                                        <FormFeedback type="invalid"><div>{validation.errors.first_name}</div></FormFeedback>
                                                    ) : null}

                                                </div>

                                                <div className="mb-3">
                                                    <Label htmlFor="userpassword" className="form-label">비밀번호 <span className="text-danger">*</span></Label>
                                                    <Input
                                                        name="password"
                                                        type="password"
                                                        placeholder="비밀번호를 입력해주세요"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.password || ""}
                                                        invalid={
                                                            validation.touched.password && validation.errors.password ? true : false
                                                        }
                                                    />
                                                    {validation.touched.password && validation.errors.password ? (
                                                        <FormFeedback type="invalid"><div>{validation.errors.password}</div></FormFeedback>
                                                    ) : null}

                                                </div>

                                                <div className="mb-2">
                                                    <Label htmlFor="confirmPassword" className="form-label">비밀번호 화근 <span className="text-danger">*</span></Label>
                                                    <Input
                                                        name="confirm_password"
                                                        type="password"
                                                        placeholder="비밀번호 화근"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.confirm_password || ""}
                                                        invalid={
                                                            validation.touched.confirm_password && validation.errors.confirm_password ? true : false
                                                        }
                                                    />
                                                    {validation.touched.confirm_password && validation.errors.confirm_password ? (
                                                        <FormFeedback type="invalid"><div>{validation.errors.confirm_password}</div></FormFeedback>
                                                    ) : null}

                                                </div>

                                                {/* <div className="mb-4">
                                                    <p className="mb-0 fs-12 text-muted fst-italic">By registering you agree to the Velzon
                                                        <Link to="#" className="text-primary text-decoration-underline fst-normal fw-medium">Terms of Use</Link></p>
                                                </div> */}

                                                <div className="mt-4">
                                                    <Button color="success" className="w-100" type="submit" disabled={loader && true}>
                                                        {loader && <Spinner size="sm" className='me-2'> Loading... </Spinner>}
                                                        가입하기
                                                    </Button>
                                                </div>

                                               
                                            </Form>
                                        </div>
                                    </CardBody>
                                </Card>
                                <div className="mt-4 text-center">
                                    <p className="mb-0">Already have an account ? <Link to="/login" className="fw-semibold text-primary text-decoration-underline"> 로그인 </Link> </p>
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

export default Register;
