
import React, { useRef, useEffect, useState } from 'react';
import { Table, Input, Button, FormGroup, Container, Label } from 'reactstrap';
import BreadCrumb from 'Components/Common/BreadCrumb';
import moment from 'moment';
import Flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import "../../css/table.css";
import { format } from 'date-fns';
import { useFormik } from 'formik'
import { APIClient } from 'helpers/api_helper';
import { useDispatch } from 'react-redux';


import {
    addNewCustomer as onAddNewCustomer,
} from "slices/thunks";
import { useNavigate } from 'react-router-dom';

const api = new APIClient()

function AddCustomerPage() {
    const [date, setDate] = useState("");
    const dispatch: any = useDispatch();
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            user_pw: '',
            user_pw2: '',
            user_name: '',
            user_email: '',
            user_mobile: '',
            user_id: '',
            user_birth: '',
            user_gender: '',

            ci: (Math.random() + 1).toString(36).substring(7),
        },
        onSubmit: (values:any) => {
            dispatch(onAddNewCustomer(values))
            navigate(-1)

        }
    })
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let { value } = event.target;
        let numbers = value.replace(/[^\d]/g, '');

        // Extract year, month, and day
        let year = numbers.slice(0, 4);
        let month = numbers.slice(4, 6);
        let day = numbers.slice(6, 8);

        // Validate month and day
        month = month.length === 2 ? Math.min(Number(month), 12).toString().padStart(2, '0') : month;
        day = day.length === 2 ? Math.min(Number(day), 31).toString().padStart(2, '0') : day;

        // Format the date string
        let formatted = year;
        if (month) formatted += `-${month}`;
        if (day) formatted += `-${day}`;

        // Use the correct setter function for the state
        setDate(formatted);
    };
    const now = new Date();
    const registrationTime = format(now, 'yyyy-MM-dd HH:mm');

    console.log(registrationTime); // Ko'rsatiladigan sana va vaqt



    const handleBackToList = () => {
      navigate('/apps-member-list');
    };

    return (

      
        <div style={{ backgroundColor: "#ffffff" }}>
        <div className="page-content">
        <BreadCrumb title="회원 등록" pageTitle="회원목록" />
        <Table bordered className="custom-table">
    
    <tbody >
                        <tr >
                            <th className="text-center fw-bold p-4">아이디</th>
                            <td>  <div className="d-flex justify-content-start">
                                <Input name="user_id" value={formik.values.user_id} onChange={formik.handleChange} type="text" placeholder="Enter your ID" style={{ width: '200px' }} className="me-2" />
                                <Button color="success fw-bold">충복확인</Button>
                            </div></td>
                            <th className="text-center fw-bold p-4">상태</th>
                            <td className="text-start fw-bold p-4" >정상</td>
                        </tr>
                        <tr>
                            <th className="text-center fw-bold p-4">비밀번호</th>
                            <td><Input name='user_pw' value={formik.values.user_pw} onChange={formik.handleChange} type="password" style={{ width: '200px' }} placeholder="Enter your password" /></td>
                            <th className="text-center fw-bold p-4">비밀번호 확인</th>
                            <td><Input name='user_pw2' value={formik.values.user_pw2} onChange={formik.handleChange} style={{ width: '200px' }} type="password" placeholder="Confirm your password" /></td>
                        </tr>
                        <tr>
                            <th className="text-center fw-bold p-4">이름</th>
                            <td><Input type="text" name='user_name' value={formik.values.user_name} onChange={formik.handleChange} style={{ width: '200px' }} placeholder="Enter your name" /></td>
                            <th className="text-center fw-bold p-4">이메일</th>
                            <td>
                                <div className="d-flex justify-content-start">

                                    <Input type="email" name='user_email' value={formik.values.user_email} onChange={formik.handleChange} style={{ width: '200px' }} className="me-2" placeholder="email@example.com" />
                                    <Button color="success fw-bold">충복확인</Button>
                                </div></td>
                        </tr>
                        <tr>

                            <th className="text-center fw-bold p-4">생년월일</th>
                            <td>
                                {/* <Input
      id="exampleDate"
      name="date"
      placeholder="date placeholder"
      type="date"
      style={{ width: '200px' }}
    /> */}
                                <Input

                                    style={{ width: '200px' }}
                                    type="text"
                                    name='user_birth'
                                    value={formik.values.user_birth}
                                    onChange={formik.handleChange}
                                    placeholder="2024-01-01"
                                    maxLength={10}
                                />
                            </td>
                            <th className="text-center fw-bold p-4">성별</th>
                            <td>
                                <FormGroup className='m-2' check defaultValue={formik.values.user_gender} onChange={formik.handleChange}>
                                    <Label check>
                                        <Input type="radio" name="user_gender" value='male' /> 남
                                    </Label>
                                    <Label check style={{ marginLeft: "25px" }}>
                                        <Input type="radio" name="user_gender" value='female' /> 여
                                    </Label>
                                </FormGroup>
                            </td>
                        </tr>
                        <tr>


                            <th className="text-center fw-bold p-4">연락처</th>
                            <td><Input name='user_mobile' value={formik.values
                                .user_mobile} onChange={formik.handleChange} style={{ width: '200px' }} type="text" placeholder="Enter contact number" /></td>
                        </tr>
                        {/* <tr>
                   
                    <th className="text-center fw-bold p-4">등록일</th>
                
                    <td className="text-start fs-6 p-4">{registrationTime}</td>
      
                </tr> */}

                    </tbody>
                </Table>
            </div>
            <div className='tablefooter_btn'>
                <div className='tablefooter'>
                <Button className='footerbtn' color="secondary fw-bold" onClick={handleBackToList}>
      목록
    </Button>
                    <Button className='footerbtn' onClick={() => formik.handleSubmit()} color="info fw-bold">확인</Button>
                    </div>
        </div>
      

      
        </div>
    );
}

export default AddCustomerPage;
