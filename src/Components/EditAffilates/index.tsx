
import React, { useRef, useEffect, useState } from 'react';
import { Table, Input, Button, FormGroup, Container, Label } from 'reactstrap';
import BreadCrumb from 'Components/Common/BreadCrumb';
import moment from 'moment';
import Flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import "../../css/table.css";
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import iconImage from '../../assets/icon/images.png';

function EditAffilates() {
    const [date, setDate] = useState("");

    let navigate = useNavigate();

    const handleBackToList = () => {
      navigate('/apps-affiliates-list');
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
    
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
  
    const handleDateChange = (value: string, setDate: (date: string) => void) => {
      const numbers = value.replace(/[^\d]/g, ''); // Remove non-digits
      let date = '';
      if (numbers.length > 4) {
        date = `${numbers.slice(0, 4)}-${numbers.slice(4, 6)}`;
      } else {
        date = numbers;
      }
      if (numbers.length >= 6) {
        date = `${date}-${numbers.slice(6, 8)}`;
      }
      setDate(date.substring(0, 10)); // Limit to 10 characters
    };
  

    return (
   
        <Container style={{ backgroundColor: "#ffffff" }}>
            <div className="page-content">
                <BreadCrumb title="제휴사 수정" pageTitle="제휴사목록" />
                <Table bordered className="custom-table">
            
            <tbody >
                <tr >
                    <th className="text-center fw-bold p-3">업체명</th>
                    <td>  <div className="d-flex justify-content-start">
                            <Input type="text" placeholder="텍사스인스트루먼트코리아" style={{ width: '250px' }} className="me-2" />
                            
                        </div></td>
                   
                </tr>
                <tr >
                    <th className="text-center fw-bold p-3">업체코드</th>
                    <td>  <div className="d-flex justify-content-start">
                            <Input type="text" placeholder="Tikor" style={{ width: '250px' }} className="me-2" />
                           
                        </div></td>
                   
                </tr>
                <tr>
                    <th className="text-center fw-bold p-3">담당자명</th>
                    <td><Input type="text" style={{ width: '250px' }} placeholder="윤도현" /></td>
                  
                </tr>
                <tr>
                    <th className="text-center fw-bold p-3">연락처</th>
                    <td><Input type="text" style={{ width: '250px' }} placeholder="010-1234-5678" /></td>
                  
                </tr>
                <tr>
                    <th className="text-center fw-bold p-3">이메일</th>
                    <td><Input type="email" style={{ width: '250px' }} placeholder="dlapdlf@naver.com" /></td>
                  
                </tr>
                <tr>
  <th className="text-center fw-bold p-3">제휴기간</th>

                <td className="d-flex">
        <Input
          type="text"
          value={startDate}
          onChange={(e) => handleDateChange(e.target.value, setStartDate)}
          style={{ width: '120px', marginLeft: '10px',  textAlign: "center" }}
          placeholder="2022-09-01"
        />
      
        <Input
          type="text"
          value={endDate}
          onChange={(e) => handleDateChange(e.target.value, setEndDate)}
          style={{ width: '120px', marginLeft: "20px", textAlign: "center" }}
          placeholder="2023-08-31"
        />
      </td>
                </tr>
               
                <tr>
                <th className="text-center fw-bold p-3">제휴상태</th>
                    
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
  <th className="text-center fw-bold p-4">제휴병원</th>
  {/* <td>
            <FormGroup className='m-2' check>
                <Label check>
                    <Input type="radio" name="gender" /> 남
                </Label>
                <Label check style={{marginLeft: "25px"}}>
                    <Input type="radio" name="gender" /> 여
                </Label>
            </FormGroup>
        </td> */}
  <td className="text-start fw-bold p-4">
    <input style={{marginLeft: "10px"}} type="checkbox" id="checkbox2" />
    <label style={{marginLeft: "10px"}} htmlFor="checkbox2">미래의료재단 </label>
    <input style={{marginLeft: "10px"}} type="checkbox" id="checkbox2" />
    <label style={{marginLeft: "10px"}} htmlFor="checkbox2">부산 미래 IFC </label>
    <input style={{marginLeft: "10px"}} type="checkbox" id="checkbox3" />
    <label style={{marginLeft: "10px"}} htmlFor="checkbox3">일산백병원</label>
    <input style={{marginLeft: "10px"}} type="checkbox" id="checkbox4" />
    <label style={{marginLeft: "10px"}} htmlFor="checkbox4">필립병원</label>
</td>
</tr>

               
                <tr>
                <th style={{height: "130px"}} className="text-center fw-bold p-5">메모</th>
                <td>
  <div className="d-flex justify-content-start">
    <textarea 
      className="form-control me-2" // Use Bootstrap's form-control for styling
      style={{ width: '550px', height: '100px' }} // Define size, adjust as needed
      placeholder="첫번째 제휴업체..." // Placeholder text in Korean for "Enter memo..."
    />
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
        <Button className='footerbtn'  color="info fw-bold">수정</Button>
        </div>
        </div>
        </div>
      
        </Container>
    );
}

export default EditAffilates;