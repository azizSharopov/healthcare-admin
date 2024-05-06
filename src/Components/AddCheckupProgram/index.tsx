
import React, { useRef, useEffect, useState } from 'react';
import { Table, Input, Button, FormGroup, Container, Label } from 'reactstrap';
import BreadCrumb from 'Components/Common/BreadCrumb';
import moment from 'moment';
import Flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import "../../css/table.css";
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';


function AddCheckup() {
    const [date, setDate] = useState("");

    let navigate = useNavigate();

    const handleBackToList = () => {
      navigate('/apps-checkup-program');
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
                <BreadCrumb title="검진프로그램 등록" pageTitle="검진프로그램" />
                <Table bordered className="custom-table">
            
            <tbody >
                <tr>
                <th className="text-center fw-bold p-3">병원명</th>
                    
                    <td>  <select style={{ width: '300px' }} className="form-select">
  <option>미래의료재단</option>
  <option>미래의료재단</option>
  <option>미래의료재단</option>
</select>
</td>
                </tr>
               
             
                <tr>
                    <th className="text-center fw-bold p-4">검진프로그램명</th>
                    <td><Input type="text" style={{ width: '250px' }} placeholder="" /></td>
                  
                </tr>
                <tr>
                    <th className="text-center fw-bold p-4">검진비용</th>
                    <td><Input type="text" style={{ width: '250px' }} placeholder="" /></td>
                  
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

export default AddCheckup;