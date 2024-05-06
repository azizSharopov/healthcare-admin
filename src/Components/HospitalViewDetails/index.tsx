
import React, { useRef, useEffect, useState } from 'react';
import { Table, Input, Button, FormGroup, Container, Label } from 'reactstrap';
import BreadCrumb from 'Components/Common/BreadCrumb';
import moment from 'moment';
import Flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import "../../css/table.css";
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';


function HospitalViewDetails() {
    const [date, setDate] = useState("");

    let navigate = useNavigate();

  const handleBackToList = () => {
    navigate('/apps-hospital-list');
  };
  const handleBackEditList = () => {
    navigate('/edit-hospital-admin');
  };
  const handleBackCheckupList = () => {
    navigate('/check-up-list');
  };
  const handleBackSpecialCheckupList = () => {
    navigate('/special-checkup-list');
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
                <BreadCrumb title="회원정보" pageTitle="회원목록" />
                <Table bordered className="custom-table" >
            <tbody >
                <tr >
                    <th className="text-center fw-bold p-3" >아이디</th>
                    <td className="text-start fw-bold p-3">mrhealth</td>
                
                </tr>
                <tr>
                <th className="text-center fw-bold p-3"  >상태</th>
                    <td className="text-start fw-bold p-3"  >정상</td>
                </tr>
                <tr>
                    <th className="text-center fw-bold p-3">병원명</th>
                    <td className="text-start fw-bold p-3" >부산미래IFC</td>
                   
                </tr>
               
                <tr>
                   
                    <th className="text-center fw-bold p-3" >연락처</th>
                    <td className="text-start fw-bold p-3" >051-710-2000</td>
                   
                </tr>
                <tr>
                    <th className="text-center fw-bold p-3">주소</th>

                    <td className="text-start fw-bold p-3">부산 남구 전포대로 133 4층(문형동, IFC)</td>
      
                </tr>
                {/* More rows can be added here as needed */}
            </tbody>
        </Table>
    
      
      
        <div className='tablefooter_btn'>
        <div className='tablefooter' style={{width: "600px"}}>
        <Button className='footerbtn' color="secondary fw-bold" onClick={handleBackToList}>목록</Button>
        <Button className='footerbtn'  color="info fw-bold" onClick={handleBackEditList}>수정</Button>
        <Button className='footerbtn'  color="success fw-bold" onClick={handleBackCheckupList}>검진항목설정</Button>
        <Button className='footerbtn'  color="success fw-bold" onClick={handleBackSpecialCheckupList}>특화검진설정</Button>
        </div>
        </div>
        </div>
       
            
         
       
       
        </Container>
    );
}

export default HospitalViewDetails;