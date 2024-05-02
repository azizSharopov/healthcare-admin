
import React, { useRef, useEffect, useState } from 'react';
import { Table, Input, Button, FormGroup, Container, Label } from 'reactstrap';
import BreadCrumb from 'Components/Common/BreadCrumb';
import moment from 'moment';
import Flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import "../../css/table.css";
import { format } from 'date-fns';


function EditCustomer() {
    const [date, setDate] = useState("");

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
   
        <Container style={{ backgroundColor: "#ffffff" }}>
            <div className="page-content">
                <BreadCrumb title="회원 수정" pageTitle="회원목록" />
                <Table bordered className="custom-table">
            
            <tbody >
                <tr >
                    <th className="text-center fw-bold p-4">아이디</th>
                    <td>  <div className="d-flex justify-content-start">
                            <Input type="text" placeholder="Enter your ID" style={{ width: '200px' }} className="me-2" />
                            
                        </div></td>
                    <th className="text-center fw-bold p-4">상태</th>
                    <td>  <select style={{ width: '140px' }} className="form-select">
  <option>정상
</option>
  <option>휴먼</option>
  <option>정지</option>
  <option>탈퇴대기</option>

  
 
</select>
</td>
                
                </tr>
                <tr>
                    <th className="text-center fw-bold p-4">비밀번호</th>
                    <td><Input type="password" style={{ width: '200px' }} placeholder="Enter your password" /></td>
                    <th className="text-center fw-bold p-4">비밀번호 확인</th>
                    <td><Input style={{ width: '200px' }} type="password" placeholder="Confirm your password" /></td>
                </tr>
                <tr>
                    <th className="text-center fw-bold p-4">이름</th>
                    <td><Input type="text" style={{ width: '200px' }} placeholder="Enter your name" /></td>
                    <th className="text-center fw-bold p-4">이메일</th>
                    <td>
                    <div className="d-flex justify-content-start">
                            
                            <Input type="email" style={{ width: '200px' }} className="me-2" placeholder="email@example.com" />
                     
                        </div></td>
                </tr>
                <tr>
              
  <th  className="text-center fw-bold p-4">생년월일</th>
                    <td>
                       
   <Input
   style={{ width: '200px' }}
            type="text"
            value={date}
            onChange={handleChange}
            placeholder="YYYY-MM-DD"
            maxLength={10}
        />
    </td>
                    <th className="text-center fw-bold p-4">성별</th>
                    <td>
            <FormGroup className='m-2' check>
                <Label check>
                    <Input type="radio" name="gender" /> 남
                </Label>
                <Label check style={{marginLeft: "25px"}}>
                    <Input type="radio" name="gender" /> 여
                </Label>
            </FormGroup>
        </td>
                </tr>
                <tr>
                    <th className="text-center fw-bold p-4">회원그룹</th>
                    <td>
                    <select style={{ width: '140px' }} className="form-select">
  <option>일반회원</option>
  <option>제휴사</option>
 
</select>
                    </td>
                    <th className="text-center fw-bold p-4">연락처</th>
                    <td><Input style={{ width: '200px' }} type="text" placeholder="Enter contact number" /></td>
                </tr>
                <tr>
                    <th className="text-center fw-bold p-4">가입경로</th>
                    <td>  <select style={{ width: '140px' }} className="form-select">
  <option>네이버</option>
  <option>이메일</option>
 
</select>
</td>
                    <th className="text-center fw-bold p-4">등록일</th>
                
                    <td className="text-start fs-6 p-4">{registrationTime}</td>
      
                </tr>
                {/* More rows can be added here as needed */}
            </tbody>
        </Table>
        </div>
        <div className='tablefooter_btn'>
        <div className='tablefooter'>
        <Button className='footerbtn'  color="secondary fw-bold">목록</Button>
        <Button className='footerbtn'  color="info fw-bold">확인</Button>
        </div>
        </div>
        </Container>
    );
}

export default EditCustomer;
