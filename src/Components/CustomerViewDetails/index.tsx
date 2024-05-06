
import React, { useRef, useEffect, useState } from 'react';
import { Table, Input, Button, FormGroup, Container, Label } from 'reactstrap';
import BreadCrumb from 'Components/Common/BreadCrumb';
import moment from 'moment';
import Flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import "../../css/table.css";
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';


function MemberViewDetails() {
    const [date, setDate] = useState("");

    let navigate = useNavigate();

  const handleBackToList = () => {
    navigate('/apps-member-list');
  };
  const handleBackEditList=()=>{
    navigate('/edit-customer');
  }
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
                <BreadCrumb title="회원정보" pageTitle="회원목록" />
                <Table bordered className="custom-table" >
            <tbody >
                <tr >
                    <th className="text-center fw-bold p-3" style={{ width: '200px' }}>아이디</th>
                    <td className="text-start fw-bold p-3"  style={{ width: '300px' }}>gunmo</td>
                    <th className="text-center fw-bold p-3"  style={{ width: '200px' }}>상태</th>
                    <td className="text-start fw-bold p-3"  style={{ width: '300px' }}>정상</td>
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
                    <th className="text-center fw-bold p-3" style={{width: '200px', paddingTop: '20px'}}>등록일</th>
                
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
        <p className="text-start  fw-bold p-4">기업회원 상세정보</p>
        <Table bordered className="custom-table" >
            <tbody >
                <tr >
                    <th className="text-center fw-bold p-3" style={{ width: '200px' }}>업체명</th>
                    <td className="text-start fw-bold p-3" style={{ width: '300px' }}>EA코리아</td>
                    <th className="text-center fw-bold p-3" style={{ width: '200px' }}>업체코드</th>
                    <td className="text-start fw-bold p-3"  style={{ width: '300px' }}>Eakorea</td>
                </tr>
                <tr>
                    <th className="text-center fw-bold p-3" >임직원이름</th>
                    <td className="text-start fw-bold p-3" >김건모</td>
                    <th className="text-center fw-bold p-3" >임직원 연락처</th>
                    <td className="text-start fw-bold p-3" >010-1234-5678</td>
                </tr>
                <tr>
              
  <th  className="text-center fw-bold p-3" style={{paddingTop: '20px'}}>임직원과의 관계</th>
  <td className="text-start fw-bold p-3" >본인</td>
                   
                    <th className="text-center fw-bold p-3"></th>
                    <td className="text-start fw-bold p-3" ></td>

                </tr>
                <tr>
                    <th className="text-center fw-bold p-3">배우자 이름</th>
                    <td className="text-start fw-bold p-3" style={{width: '300px', paddingTop: '20px'}}></td>
                    <th className="text-center fw-bold p-3" style={{width: '210px', paddingTop: '20px'}}>배우자 연락처</th>
                <td className="text-start fs-6 p-3"></td>
                </tr>
                
                {/* More rows can be added here as needed */}
            </tbody>
        </Table>
      
        <div className='tablefooter_btn'>
        <div className='tablefooter'>
        <Button className='footerbtn' color="secondary fw-bold" onClick={handleBackToList}>
      목록
    </Button>
        <Button className='footerbtn'  color="info fw-bold" onClick={handleBackEditList}>수정</Button>
        </div>
        </div>
        </div>
       
        </Container>
    );
}

export default MemberViewDetails;