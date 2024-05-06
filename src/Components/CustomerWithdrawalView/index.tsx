
import React, { useRef, useEffect, useState } from 'react';
import { Table, Input, Button, FormGroup, Container, Label } from 'reactstrap';
import BreadCrumb from 'Components/Common/BreadCrumb';
import moment from 'moment';
import Flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import "../../css/table.css";
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';


function WithdrawalViewDetails() {
    const [date, setDate] = useState("");

    let navigate = useNavigate();

  const handleBackToList = () => {
    navigate('/apps-member-withdrawal');
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
   
        <Container style={{ backgroundColor: "#ffffff"}}>
            <div className="page-content">
                <BreadCrumb title="회원정보" pageTitle="탈퇴회원목록" />
                <Table bordered className="custom-table" >
            <tbody >
                <tr >
                    <th className="text-center fw-bold p-3" style={{ width: '170px' }}>아이디</th>
                    <td className="text-start fw-bold p-3" style={{ width: '230px' }}>gunmo</td>
                    <th className="text-center fw-bold p-3"  style={{ width: '170px' }}>상태</th>
                    <td className="text-start fw-bold p-3"  style={{ width: '230px' }}>탈퇴</td>
                </tr>
                <tr>
                    <th className="text-center fw-bold p-3">이름</th>
                    <td className="text-start fw-bold p-3" >김건모</td>
                    <th className="text-center fw-bold p-3">이메일</th>
                    <td className="text-start fw-bold p-3" >gunmo@naver.com</td>
                </tr>
                <tr>
              
  <th  className="text-center fw-bold p-3">생년월일</th>
  <td className="text-start fw-bold p-3" >1978-01-01</td>
                   
                    <th className="text-center fw-bold p-3">성별</th>
                    <td className="text-start fw-bold p-3" >남</td>

                </tr>
                <tr>
                   
                    <th className="text-center fw-bold p-3" >연락처</th>
                    <td className="text-start fw-bold p-3" >01012345678</td>
                    <th className="text-center fw-bold p-3" >등록일</th>
                
                <td className="text-start fs-6 p-3">{registrationTime}</td>
                </tr>
                <tr>
                    <th className="text-center fw-bold p-3">가입경로</th>

                    <td className="text-start fw-bold p-3">SNS</td>

                    <th className="text-center fw-bold p-3"></th>
                    <td className="text-start fw-bold p-3" ></td>
      
                </tr>
                {/* More rows can be added here as needed */}
            </tbody>
        </Table>
       
        <Table bordered className="custom-table" >
            <tbody >
                <tr >
                    <th className="text-center fw-bold p-3" style={{ width: '170px' }}>탈퇴동의</th>
                    <td className="text-start fw-bold p-3" style={{ width: '230px' }}>동의함</td>
                    <th className="text-center fw-bold p-3" style={{ width: '170px' }}>탈퇴동의</th>
                    <td className="text-start fw-bold p-3" style={{ width: '230px' }}>2022-08-21 20:56:56</td>
                </tr>
                <tr>
                    <th className="text-center fw-bold p-3" >탈퇴사유</th>
                    <td className="text-start fw-bold p-3" >마음이 아파요</td>
                    <th className="text-center fw-bold p-3" ></th>
                    <td className="text-start fw-bold p-3" ></td>
                </tr>
                
                {/* More rows can be added here as needed */}
            </tbody>
        </Table>
      
        <div className='tablefooter_btn'>
        <div className='tablefooter'>
        <Button className='footerbtn' color="secondary fw-bold" style={{backgroundColor: "#A9A9A9"}} onClick={handleBackToList}>
      목록
    </Button>
        
        </div>
        </div>
        </div>
       
            
         
       
       
        </Container>
    );
}

export default WithdrawalViewDetails;