import React, { useState } from 'react';
import {
   Col,
    Row,
    Button,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownItem,
    DropdownMenu,
    
} from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import { Link } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import Select from "react-select";

import "flatpickr/dist/themes/material_green.css"; // or any theme you prefer

const ProductsGlobalFilter = () => {
    return (
        <React.Fragment>
            <div className="col-sm-auto ms-auto">
                <div>
                    <Link
                        to="/apps-ecommerce-add-product"
                        className="btn btn-success"
                    >
                        <i className="ri-add-line align-bottom me-1"></i> Add
                        Product
                    </Link>
                </div>
            </div>
        </React.Fragment>
    );
};
const CustomersGlobalFilter = () => {
    const [customerStatus, setcustomerStatus] = useState<any>(null);
    const [customerSignupType, setcustomerSignupType] = useState<any>(null);
    const [isOpen, setIsOpen] = useState(false); // Yangi oyna ochish uchun muhit o'zgaruvchisi

    const [dateRange, setDateRange] = useState<Date[]>([new Date(), new Date()]); // Using Date[] type for range
    const [customers, setCustomers] = useState([]); // Assuming customers are stored in an array
    const [sortingMethod, setSortingMethod] = useState<string>(""); // State for sorting method

    function handlecustomerStatus(customerStatus:any) {
        setcustomerStatus(customerStatus);
    }
    function handlecustomerSignupType(customerStatus:any) {
        setcustomerSignupType(customerStatus);
    }
    const handleSortingMethodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortingMethod(event.target.value);
        // You can perform any actions here based on the selected sorting method
    };

    const sortingMethodOptions = [
        { label: "아이디", value: "아이디" },
        { label: "이름", value: "이름" },
    ];

    const customerstatus = [
        {
            options: [
                { label: "제휴사", value: "제휴사" },
                { label: "일반회원", value: "일반회원" },
              
            ],
        },
    ];

    const customersignuptype = [
        {
            options: [
                { label: "HMM", value: "HMM" },
                { label: "네이버", value: "네이버" },
                { label: "한화건설", value: "한화건설" },
                { label: "이비코리아", value: "이비코리아" },
            
            ],
        },
    ];
    
    const handleSearch = () => {
        console.log("Search button clicked");
      };
    
      const toggleModal = () => {
        setIsOpen(!isOpen); // Yangi oyna ochish yoki yopish
      };
 const handleDateChange = (dates: Date[]) => {
        if (Array.isArray(dates) && dates.length === 2) {
            setDateRange(dates);
            searchCustomers(dates);
        }
    };
     

    const searchCustomers = async (dates: Date[]) => {
        const [start, end] = dates;
        // Example API call
        const response = await fetch(`/api/customers?start=${start.toISOString()}&end=${end.toISOString()}`);
        const data = await response.json();
        setCustomers(data);
    };

    const [pageSize, setPageSize] = useState('10'); // Default page size
    const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPageSize(event.target.value);
    };
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
  
    const handleDataSearch = () => {
      console.log("Qidiruv boshlandi: ", startDate, endDate);
      // Bu yerdan boshlab siz kerakli API so'rovini yuborishingiz mumkin
    };
  

    return (
        <React.Fragment>
            <Col xl={12}>
                <Row >
                 
                {/* <Col sm={2} className=" d-flex flex-row p-2">
           
                <label htmlFor="sortingMethod"  className="form-label form-select-label p-1">정렬방식:</label>
                <select
                    id="sortingMethod"
                    className="form-select form-select mb-5"
                    style={{ width: '100px' }} 
                    value={sortingMethod}
                    onChange={handleSortingMethodChange}
                >
                    <option value="">선택</option>
                    {sortingMethodOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
          
                    </Col> */}
                    

                    <Col sm={4} className='d-flex flex-row p-2'>
                    <label htmlFor="sortingMethod" className="form-label form-select-label p-1">가입형태:</label>
                    
                        <div className='p-1'  style={{ width: '130px' }}>
                            <Select
                                value={customerStatus}
                                onChange={handlecustomerStatus}
                                options={customerstatus}
                                name="choices-single-default"
                                id="idStatus"
                                placeholder="전체"
                               
                            ></Select>
                        </div>
                        <div className='p-1'   style={{ width: '130px' }}>
                            <Select
                                value={customerSignupType}
                                onChange={handlecustomerSignupType}
                                options={customersignuptype}
                                name="choices-single-default"
                                id="idStatus"
                                placeholder="전체"
                              
                            ></Select>
                        </div>
                       
                    </Col>
                    <Col sm={5}>
                        {/* <div className=" d-flex flex-row p-2">
                            <label style={{ width: '70px', }} htmlFor="date-range">가입기간:</label>
                            <Flatpickr
                                className="form-control"
                                value={dateRange}
                                onChange={handleDateChange}
                                options={{
                                    mode: 'range',
                                    dateFormat: "Y-m-d"
                                }}
                            />
                        </div>
                  */}
                   <div  className="d-flex align-items-center p-2">
                   <label onClick={handleDataSearch}  style={{ width: '160px' }}  className="form-label form-select-label p-1">가입기간:</label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="form-control"
      />
      <span className="mx-2">-</span>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="form-control"
      />
      
    </div>
                    </Col>
                    <Col sm={2} className=" d-flex flex-row p-2">
                   
                      <label htmlFor="pageSize" className="form-label form-select-label p-1">리스트:</label>
                      <select
                        id="pageSize"
                        // className="form-select form-select-sm mb-3"
                        className="form-select form-select mb-5 p-2"
                        style={{ width: '80px' }} 
                        value={pageSize}
                        onChange={handlePageSizeChange}
                     >
                       <option value="10">10</option>
                       <option value="20">20</option>
                       <option value="50">50</option>
                       <option value="100">100</option>
                      </select>
                   
                    </Col>
                    <Col sm={3} className=" d-flex flex-row p-2">
                         {/* Sorting method select */}
           
                <label htmlFor="sortingMethod"   className="form-label form-select-label p-1">정렬방식:</label>
                <select
                    id="sortingMethod"
                    className="form-select form-select mb-5"
                    style={{ width: '110px' }} 
                    value={sortingMethod}
                    onChange={handleSortingMethodChange}
                >
                    <option value="">등록일순</option>
                    {sortingMethodOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
          
                    </Col>
                </Row>
                
            </Col>
             {/* Modal component */}
      <Modal isOpen={isOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Modal Title</ModalHeader>
        <ModalBody>
          {/* Modal body content goes here */}
        </ModalBody>
        <ModalFooter>
          {/* Modal footer content goes here */}
        </ModalFooter>
      </Modal>
        </React.Fragment>
    );
};

const OrderGlobalFilter = () => {
    const [orderStatus, setorderStatus] = useState<any>([]);
    const [orderPayement, setorderPayement] = useState<any>(null);

    function handleorderStatus(orderstatus:any) {
        setorderStatus(orderstatus);
    }

    function handleorderPayement(orderPayement:any) {
        setorderPayement(orderPayement);
    }

    const orderstatus = [
        {
            options: [
                { label: "Status", value: "Status" },
                { label: "All", value: "All" },
                { label: "Pending", value: "Pending" },
                { label: "Inprogress", value: "Inprogress" },
                { label: "Cancelled", value: "Cancelled" },
                { label: "Pickups", value: "Pickups" },
                { label: "Returns", value: "Returns" },
                { label: "Delivered", value: "Delivered" },
            ],
        },
    ];

    const orderpayement = [
        {
            options: [
                { label: "Select Payment", value: "Select Payment" },
                { label: "All", value: "All" },
                { label: "Mastercard", value: "Mastercard" },
                { label: "Paypal", value: "Paypal" },
                { label: "Visa", value: "Visa" },
                { label: "COD", value: "COD" },
            ],
        },
    ];
    return (
        <React.Fragment>
            <Col sm={6} className="col-xxl-2">
                <div>
                    <Flatpickr
                        className="form-control"
                        id="datepicker-publish-input"
                        placeholder="Select a date"
                        options={{
                            altInput: true,
                            altFormat: "F j, Y",
                            mode: "multiple",
                            dateFormat: "d.m.y",
                        }}
                    />
                </div>
            </Col>

            <Col sm={4} className="col-xxl-2">
                <div>
                    <Select
                        value={orderStatus}
                        onChange={
                            handleorderStatus
                        }
                        options={orderstatus}
                        name="choices-single-default"
                        id="idStatus"
                    ></Select>
                </div>
            </Col>

            <Col sm={4} className="col-xxl-2">
                <div>
                    <Select
                        value={orderPayement}
                        onChange={
                            handleorderPayement
                        }
                        options={orderpayement}
                        name="choices-payment-default"
                        id="idPayment"
                    ></Select>
                </div>
            </Col>

            <Col sm={4} className="col-xxl-1">
                <div>
                    <button type="button" className="btn btn-primary w-100">
                        {" "}
                        <i className="ri-equalizer-fill me-1 align-bottom"></i>
                        Filters
                    </button>
                </div>
            </Col>
        </React.Fragment>
    );
};

const ContactsGlobalFilter = () => {
    const [sortBy, setsortBy] = useState<any>(null);

    function handlesortBy(sortBy:any) {
        setsortBy(sortBy);
    }

    const sortbyname = [
        {
            options: [
                { label: "Owner", value: "Owner" },
                { label: "Company", value: "Company" },
                { label: "Location", value: "Location" }
            ],
        },
    ];
    return (
        <React.Fragment>
            <div className="col-md-auto ms-auto">
                <div className="d-flex align-items-center gap-2">
                    <span className="text-muted">Sort by: </span>
                    <Select
                        className="mb-0"
                        value={sortBy}
                        onChange={
                            handlesortBy
                        }
                        options={sortbyname}
                        id="choices-single-default"
                    >
                    </Select>
                </div>
            </div>
        </React.Fragment>
    );
};

const CompaniesGlobalFilter = () => {
    const [sortBy, setsortBy] = useState("Owner");

    function handlesortBy(sortBy:any) {
        setsortBy(sortBy);
    }

    const sortbyname = [
        {
            options: [
                { label: "Owner", value: "Owner" },
                { label: "Company", value: "Company" },
                { label: "Location", value: "Location" },
            ],
        },
    ];
    return (
        <React.Fragment>
            <div className="col-md-auto ms-auto">
                <div className="d-flex align-items-center gap-2">
                    <span className="text-muted">Sort by: </span>
                    <Select
                        className="mb-0"
                        value={sortBy}
                        onChange={handlesortBy}
                        options={sortbyname}
                        id="choices-single-default"
                    ></Select>
                </div>
            </div>
        </React.Fragment>
    );
};

const CryptoOrdersGlobalFilter = () => {
    return (
        <React.Fragment>
            <Col xl={2} md={6}>
                <div className="input-group">
                    <span className="input-group-text" id="basic-addon1"><i className="ri-calendar-2-line"></i></span>
                    <Flatpickr
                        placeholder="Select date"
                        className="form-control"
                        options={{
                            mode: "range",
                            dateFormat: "d M, Y"
                        }}
                    />
                </div>
            </Col>
            <Col xl={2} md={4}>
                <select className="form-control" data-choices data-choices-search-false name="choices-single-default"
                    id="choices-single-default">
                    <option defaultValue="all">Select Type</option>
                    <option value="Buy">Sell</option>
                    <option value="Sell">Buy</option>
                </select>
            </Col>
            <Col xl={2} md={4}>
                <select className="form-control" data-choices data-choices-search-false name="choices-single-default2"
                    id="choices-single-default2">
                    <option defaultValue="all">Select Status</option>
                    <option value="Successful">Successful</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Pending">Pending</option>
                </select>
            </Col>
            <Col xl={1} md={4}>
                <button className="btn btn-success w-100">Filters</button>
            </Col>
        </React.Fragment>
    );
};

const InvoiceListGlobalSearch = () => {
    const [isStatus, setisStatus] = useState<any>(null);


    function handleisStatus(isStatus:any) {
        setisStatus(isStatus);
    }

    const allstatus = [
        {
            options: [
                { label: "Status", value: "Status" },
                { label: "All", value: "All" },
                { label: "Unpaid", value: "Unpaid" },
                { label: "Paid", value: "Paid" },
                { label: "Cancel", value: "Cancel" },
                { label: "Refund", value: "Refund" },
            ],
        },
    ];
    return (
        <React.Fragment>
            <Col sm={4} xxl={3}>
                <Flatpickr
                    className="form-control bg-light border-light"
                    id="datepicker-publish-input"
                    placeholder="Select a date"
                    options={{
                        altInput: true,
                        altFormat: "F j, Y",
                        mode: "multiple",
                        dateFormat: "d.m.y",
                    }}
                />
            </Col>

            <Col sm={4} xxl={3}>
                <div className="input-light">
                    <Select
                        value={isStatus}
                        onChange={(isStatus:any) => {
                            handleisStatus(isStatus);
                        }}
                        options={allstatus}
                        name="choices-single-default"
                        id="idStatus"
                    ></Select>
                </div>
            </Col>

            <Col sm={4} xxl={1}>
                <Button color="primary" className="w-100">
                    <i className="ri-equalizer-fill me-1 align-bottom"></i>{" "}
                    Filters
                </Button>
            </Col>

        </React.Fragment>
    );
};

const TicketsListGlobalFilter = () => {
    return (
        <React.Fragment>
            <Col xxl={3} sm={4}>
                <Flatpickr
                    className="form-control"
                    placeholder="Select date range"
                    options={{
                        mode: "range",
                        dateFormat: "d M, Y"
                    }}
                />
            </Col>
            <Col xxl={3} sm={4}>
                <div className="input-light">
                    <select className="form-control" data-choices data-choices-search-false name="choices-single-default" id="idStatus">
                        <option value="">Status</option>
                        <option defaultValue="all">All</option>
                        <option value="Open">Open</option>
                        <option value="Inprogress">Inprogress</option>
                        <option value="Closed">Closed</option>
                        <option value="New">New</option>
                    </select>
                </div>
            </Col>
            <Col xxl={1} sm={4}>
                <button type="button" className="btn btn-primary w-100"> <i className="ri-equalizer-fill me-1 align-bottom"></i>
                    Filters
                </button>
            </Col>
        </React.Fragment>
    );
};

const NFTRankingGlobalFilter = () => {
    return (
        <React.Fragment>
            <Col xxl={2} sm={4} className="ms-auto">
                <div>
                    <select className="form-control" data-choices data-choices-search-false name="choices-single-default" id="idStatus">
                        <option value="All Time" defaultValue="All Time">All Time</option>
                        <option value="1 Day">1 Day</option>
                        <option value="7 Days">7 Days</option>
                        <option value="15 Days">15 Days</option>
                        <option value="1 Month">1 Month</option>
                        <option value="6 Month">6 Month</option>
                    </select>
                </div>
            </Col>
        </React.Fragment>
    );
};

const TaskListGlobalFilter = () => {
    return (
        <React.Fragment>
            <div className="col-xxl-3 col-sm-4">
                <Flatpickr
                    placeholder="Select date range"
                    className="form-control bg-light border-light"
                    options={{
                        mode: "range",
                        dateFormat: "d M, Y"
                    }}
                />
            </div>

            <div className="col-xxl-3 col-sm-4">
                <div className="input-light">
                    <select className="form-control" data-choices data-choices-search-false name="status" id="idStatus">
                        <option value="">Status</option>
                        <option defaultValue="all"  >All</option>
                        <option value="New">New</option>
                        <option value="Pending">Pending</option>
                        <option value="Inprogress">Inprogress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
            </div>
            <div className="col-xxl-1 col-sm-4">
                <button type="button" className="btn btn-primary w-100"> <i className="ri-equalizer-fill me-1 align-bottom"></i>
                    Filters
                </button>
            </div>
        </React.Fragment>
    );
};


const LeadsGlobalFilter = ({ onClickDelete }:any) => {
    return (
        <React.Fragment>
            <div className="col-sm-auto ms-auto">
                <div className="hstack gap-2">
                    <button className="btn btn-soft-danger" onClick={onClickDelete}
                    ><i className="ri-delete-bin-2-line"></i></button>
                    <button type="button" className="btn btn-info"
                    //  onClick={toggleInfo}
                    >
                        <i className="ri-filter-3-line align-bottom me-1"></i>{" "}
                        Fliters
                    </button>
                    <button
                        type="button"
                        className="btn btn-success add-btn"
                        id="create-btn"
                    // onClick={() => { setIsEdit(false); toggle(); }}
                    >
                        <i className="ri-add-line align-bottom me-1"></i> Add
                        Leads
                    </button>
                    <UncontrolledDropdown>
                        <DropdownToggle
                            className="btn btn-soft-info btn-icon fs-14"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <i className="ri-settings-4-line"></i>
                        </DropdownToggle>
                        <DropdownMenu
                        >
                            <li>
                                <DropdownItem>
                                    Copy
                                </DropdownItem>
                            </li>
                            <li>
                                <DropdownItem>
                                    Move to pipline
                                </DropdownItem>
                            </li>
                            <li>
                                <DropdownItem>
                                    Add to exceptions
                                </DropdownItem>
                            </li>
                            <li>
                                <DropdownItem>
                                    Switch to common form view
                                </DropdownItem>
                            </li>
                            <li>
                                <DropdownItem>
                                    Reset form view to default
                                </DropdownItem>
                            </li>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div>
            </div>
        </React.Fragment>
    );
};

export {
    ProductsGlobalFilter,
    CustomersGlobalFilter,
    OrderGlobalFilter,
    ContactsGlobalFilter,
    CompaniesGlobalFilter,
    CryptoOrdersGlobalFilter,
    InvoiceListGlobalSearch,
    TicketsListGlobalFilter,
    NFTRankingGlobalFilter,
    TaskListGlobalFilter,
    LeadsGlobalFilter
};