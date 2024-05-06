
import React, { useRef, useEffect, useState } from 'react';
import { Table, Input, Button, FormGroup, Container, Label } from 'reactstrap';
import BreadCrumb from 'Components/Common/BreadCrumb';
import moment from 'moment';
import Flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import "../../css/table.css";
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';


function AddHospitalAdmin() {
    const [date, setDate] = useState("");

    let navigate = useNavigate();

    const handleBackToList = () => {
      navigate('/apps-hospital-list');
    };
  
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
    
    

    return (
   
        // <Container style={{ backgroundColor: "#ffffff" }}>
            <div className="page-content">
                <BreadCrumb title="병원 등록" pageTitle="병원목록" />
                <Table bordered className="custom-table">
            
            <tbody >
                <tr >
                    <th className="text-center fw-bold p-4">아이디</th>
                    <td>  <div className="d-flex justify-content-start">
                            <Input type="text" placeholder="mrhealth" style={{ width: '250px' }} className="me-2" />
                            <Button color="success fw-bold">충복확인</Button>
                        </div></td>
                   
                </tr>
                <tr>
                <th className="text-center fw-bold p-3">상태</th>
                    <td className="text-start fw-bold p-3" >정상</td>
                </tr>
                <tr>
                    <th className="text-center fw-bold p-4">비밀번호</th>
                    <td><Input type="password" style={{ width: '250px' }} placeholder="" /></td>
                   
                </tr>
                <tr>
                <th className="text-center fw-bold p-4">비밀번호 확인</th>
                    <td><Input style={{ width: '250px' }} type="password" placeholder="" /></td>
                </tr>
                <tr>
                    <th className="text-center fw-bold p-4">병원명</th>
                    <td><Input type="text" style={{ width: '250px' }} placeholder="부산미래IFC" /></td>
                  
                </tr>
                <tr>
                <th className="text-center fw-bold p-4">연락처</th>
                    <td><Input style={{ width: '250px' }} type="text" placeholder="51-710-2000" /></td>
                </tr>
                <tr>
                <th style={{height: "120px"}} className="text-center fw-bold p-5">주소</th>
                    <td>
                    <div>
                    <div className="d-flex justify-content-start">
                            
                            <Input type="email" style={{ width: '550px' }} className="me-2" placeholder="부산광역시 남구 전포대로 133" />
                            <Button color="success fw-bold">주소검색</Button>
                        </div>
                       
                        <div className="d-flex justify-content-start mt-2">
                        <p className="text-start fw-bold mt-2">상세주소</p>
                            <Input type="text" style={{ width: '550px', marginLeft: '35px' }} className="me-2" placeholder="4 층" />
                          
                        </div>
                            </div>
                            </td>
                        
                   
                </tr>
            
            
            </tbody>
        </Table>
        <div className='tablefooter_btn'>
        <div className='tablefooter'>
        <Button className='footerbtn' color="secondary fw-bold" onClick={handleBackToList}>
      목록
    </Button>
        <Button className='footerbtn'  color="info fw-bold">등록</Button>
        </div>
        </div>
        </div>
      
        // </Container>
    );
}

export default AddHospitalAdmin;