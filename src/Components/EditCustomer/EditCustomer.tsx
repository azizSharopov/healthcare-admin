import BreadCrumb from 'Components/Common/BreadCrumb';
import React from 'react';
// import Table from 'react-bootstrap/Table'; // Correct import for the Table component
// import { Link } from 'react-router-dom';
// import {
//     Row,
//     Col,
//     Container,
//   } from "reactstrap";
// function EditCustomer() {
//   return (
//     <div className="page-content">
       
//           <BreadCrumb title="회원 등록" pageTitle="회원목록" /> 
//          <div className="card">
    
   
//      <div className="table-responsive table-card">
//     <table className="table align-middle table-nowrap table-striped-columns mb-0">
//         <thead className="table-light">
//             <tr>
//                 <th scope="col" style={{width: "46px"}}>
//                     <div className="form-check">
//                         <input className="form-check-input" type="checkbox" value="" id="cardtableCheck" />
//                         <label className="form-check-label" htmlFor="cardtableCheck"></label>
//                     </div>
//                 </th>
//                 <th scope="col">ID</th>
//                 <th scope="col">Name</th>
//                 <th scope="col">Date</th>
//                 <th scope="col">Total</th>
//                 <th scope="col">Status</th>
//                 <th scope="col" style={{width: "150px"}}>Action</th>
//             </tr>
//         </thead>
//         <tbody>
//             <tr>
//                 <td>
//                     <div className="form-check">
//                         <input className="form-check-input" type="checkbox" value="" id="cardtableCheck01" />
//                         <label className="form-check-label" htmlFor="cardtableCheck01"></label>
//                     </div>
//                 </td>
//                 <td><a href="#" className="fw-medium">#VL2110</a></td>
//                 <td>William Elmore</td>
//                 <td>07 Oct, 2021</td>
//                 <td>$24.05</td>
//                 <td><span className="badge bg-success">Paid</span></td>
//                 <td>
//                     <button type="button" className="btn btn-sm btn-light">Details</button>
//                 </td>
//             </tr>
//             <tr>
//                 <td>
//                     <div className="form-check">
//                         <input className="form-check-input" type="checkbox" value="" id="cardtableCheck02" />
//                         <label className="form-check-label" htmlFor="cardtableCheck02"></label>
//                     </div>
//                 </td>
//                 <td><a href="#" className="fw-medium">#VL2109</a></td>
//                 <td>Georgie Winters</td>
//                 <td>07 Oct, 2021</td>
//                 <td>$26.15</td>
//                 <td><span className="badge bg-success">Paid</span></td>
//                 <td>
//                     <button type="button" className="btn btn-sm btn-light">Details</button>
//                 </td>
//             </tr>
//             <tr>
//                 <td>
//                     <div className="form-check">
//                         <input className="form-check-input" type="checkbox" value="" id="cardtableCheck03" />
//                         <label className="form-check-label" htmlFor="cardtableCheck03"></label>
//                     </div>
//                 </td>
//                 <td><a href="#" className="fw-medium">#VL2108</a></td>
//                 <td>Whitney Meier</td>
//                 <td>06 Oct, 2021</td>
//                 <td>$21.25</td>
//                 <td><span className="badge bg-danger">Refund</span></td>
//                 <td>
//                     <button type="button" className="btn btn-sm btn-light">Details</button>
//                 </td>
//             </tr>
//             <tr>
//                 <td>
//                     <div className="form-check">
//                         <input className="form-check-input" type="checkbox" value="" id="cardtableCheck04" />
//                         <label className="form-check-label" htmlFor="cardtableCheck04"></label>
//                     </div>
//                 </td>
//                 <td><a href="#" className="fw-medium">#VL2107</a></td>
//                 <td>Justin Maier</td>
//                 <td>05 Oct, 2021</td>
//                 <td>$25.03</td>
//                 <td><span className="badge bg-success">Paid</span></td>
//                 <td>
//                     <button type="button" className="btn btn-sm btn-light">Details</button>
//                 </td>
//             </tr>
//         </tbody>
//     </table>
// </div>
// </div>
//     </div>
//   );
// }


import { Container, Table } from 'reactstrap';
import "../../css/table.css";

function EditCustomer() {
  const data = [
    { header1: "아이디", info1: "Info 1", header2: "상태", info2: "Info 2" },
    { header1: "이름", info1: "Info 3", header2: "이메일", info2: "Info 4" },
    { header1: "생년월일", info1: "Info 5", header2: "성별", info2: "Info 6" },
    { header1: "연락처", info1: "Info 5", header2: "등록일", info2: "Info 6" },
    { header1: "회원그룹", info1: "Info 5", header2: "가입경로", info2: "Info 6" },

    // More rows can be added here
  ];

  return (
    <Container style={{backgroundColor: "#ffffff"}}>
    <div className="page-content">
       
        <BreadCrumb title="회원 등록" pageTitle="회원목록" /> 
      <div >
    <Table bordered className="custom-table" >
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <th scope="row">{row.header1}</th>
            <td>{row.info1}</td>
            <th scope="row">{row.header2}</th>
            <td>{row.info2}</td>
          </tr>
        ))}
      </tbody>
    </Table>
    </div>
    
    </div>
    </Container>
  );
}


export default EditCustomer;
