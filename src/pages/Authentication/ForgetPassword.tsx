import PropTypes from "prop-types";
import React from "react";
import { Row, Col, Alert, Card, CardBody, Container, FormFeedback, Input, Label, Form } from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import withRouter from "../../Components/Common/withRouter";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

// action
import { userForgetPassword } from "../../slices/thunks";

// import images
// import profile from "../../assets/images/bg.png";
import health from "../../assets/images/health.png"
import digital from "../../assets/images/digital.png"
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
import { createSelector } from "reselect";

const ForgetPasswordPage = (props:any) => {
  document.title="Reset Password | Healthcare - React Admin & Dashboard Template";

  const dispatch :any= useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required("이메일 주소를 입력하세요"),
    }),
    onSubmit: (values) => {
      dispatch(userForgetPassword(values, props.router.location.pathname));
    }
  });

  const selectLayoutProperties = createSelector(
    (state:any) => state.ForgetPassword,
    (state) => ({
      forgetError: state.forgetError,
      forgetSuccessMsg: state.forgetSuccessMsg,
    })
  );
  const {
    forgetError, forgetSuccessMsg
  } = useSelector(selectLayoutProperties);

  return (
    <ParticlesAuth>
      <div className="auth-page-content">        
        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center mt-sm-5 mb-4 text-white-50">
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
                    <h5 className="text-primary">비밀번호 잊으셨나요?</h5>
                    {/* <p className="text-muted">Reset password with velzon</p> */}

                    <i className="ri-mail-send-line display-5 text-success mb-3"></i>

                  </div>

                  <Alert className="border-0 alert-warning text-center mb-2 mx-2" role="alert">
                    {/* Enter your email and instructions will be sent to you! */}
                    이메일을 입력하시면 지침을 보내드리겠습니다
                  </Alert>
                  <div className="p-2">
                    {forgetError && forgetError ? (
                      <Alert color="danger" style={{ marginTop: "13px" }}>
                        {forgetError}
                      </Alert>
                    ) : null}
                    {forgetSuccessMsg ? (
                      <Alert color="success" style={{ marginTop: "13px" }}>
                        {forgetSuccessMsg}
                      </Alert>
                    ) : null}
                    <Form
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      <div className="mb-4">
                        <Label className="form-label">이메일</Label>
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
                          <FormFeedback type="invalid"><div>{validation.errors.email}</div></FormFeedback>
                        ) : null}
                      </div>

                      <div className="text-center mt-4">
                        <button className="btn btn-success w-100" type="submit">재설정 링크 보내기</button>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>

              <div className="mt-4 text-center">
                <p className="mb-0">잠깐만, 나 비밀번호 기억나는데... <Link to="/login" className="fw-semibold text-primary text-decoration-underline"> 여기를 클릭하세요 </Link> </p>
              </div>

            </Col>
          </Row>
        </Container>
      </div>
    </ParticlesAuth>
  );
};

ForgetPasswordPage.propTypes = {
  history: PropTypes.object,
};

export default withRouter(ForgetPasswordPage);
