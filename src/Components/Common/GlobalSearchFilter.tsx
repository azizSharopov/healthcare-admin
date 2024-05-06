import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  FormFeedback,
  Input,
} from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import Select from "react-select";
import { DebouncedInput } from "./TableContainer";
import "flatpickr/dist/themes/material_green.css"; // or any theme you prefer

const ProductsGlobalFilter = () => {
  return (
    <React.Fragment>
      <div className="col-sm-auto ms-auto">
        <div>
          <Link to="/apps-ecommerce-add-product" className="btn btn-success">
            <i className="ri-add-line align-bottom me-1"></i> Add Product
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};
const CustomersGlobalFilter = () => {
  const [isSearch, setIsSearch] = useState(false);
  const [customerStatus, setcustomerStatus] = useState<any>(null);
  const [customerSignupType, setcustomerSignupType] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false); // Yangi oyna ochish uchun muhit o'zgaruvchisi

  const [dateRange, setDateRange] = useState<Date[]>([new Date(), new Date()]); // Using Date[] type for range
  const [customers, setCustomers] = useState([]); // Assuming customers are stored in an array
  const [sortingMethod, setSortingMethod] = useState<string>(""); // State for sorting method

  function handlecustomerStatus(customerStatus: any) {
    setcustomerStatus(customerStatus);
  }
  function handlecustomerSignupType(customerStatus: any) {
    setcustomerSignupType(customerStatus);
  }
  const handleSortingMethodChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSortingMethod(event.target.value);
    // You can perform any actions here based on the selected sorting method
  };
  const handleSearchMethodChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSortingMethod(event.target.value);
    // You can perform any actions here based on the selected sorting method
  };

  const sortingMethodOptions = [
    { label: "아이디", value: "아이디" },
    { label: "이름", value: "이름" },
  ];

  const searchMethodOptions = [
    { label: "아이디", value: "아이디" },
    { label: "이름", value: "이름" },
    { label: "연락처", value: "연락처"}
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

  let navigate = useNavigate();

  const searchCustomers = async (dates: Date[]) => {
    const [start, end] = dates;
    // Example API call
    const response = await fetch(
      `/api/customers?start=${start.toISOString()}&end=${end.toISOString()}`
    );
    const data = await response.json();
    setCustomers(data);
  };

  const [pageSize, setPageSize] = useState("10"); // Default page size
  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPageSize(event.target.value);
  };

  const [startDate, setStartDate] = useState(moment().format("YYYY-MM-DD"));
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));

  const handleDataSearch = () => {
    console.log("Search Period:", startDate, "to", endDate);
  };

  const handleClickSearchButton = () => {
    setIsSearch(true);
  };
  const handleButtonClick = () => {
    // URL manzilini ko'rsatish, masalan '/details'
    navigate('/view-details');
  };
 

  return (
    <React.Fragment>
      <Row>
        <Col sm={5}>
          <div className={"search-box me-2 mb-3 d-inline"}>
            <DebouncedInput
              value={""}
              onChange={() => {}} // value={globalFilter ?? ''}
              // onChange={(value) => setGlobalFilter(String(value))}
              // placeholder={SearchPlaceholder}
            />
            <i className="bx bx-search-alt search-icon pb-3"></i>
          </div>
        </Col>
        <Col sm={2}>
          <div>
            <button
              onClick={handleClickSearchButton}
              type="button"
              className="btn btn-success w-100"
            >
              검색
            </button>
          </div>
        </Col>
        {isSearch ? (
          <Col sm={2}>
            <div>
              <button
                type="button"
                className="btn btn-secondary w-100"
                onClick={handleButtonClick}
              >
                상세검색
              </button>
            </div>
          </Col>
        ) : null}
      </Row>
      
      <Row className="d-flew flex-row justify-content-around" style={{width: "100%", }}>
          <Col >
            {/* Sorting method select */}
            <label
              htmlFor="sortingMethod"
              className="form-label form-select-label p-1"
            >
              기본검색:
            </label>
            <select
              id="sortingMethod"
              className="form-select form-select mb-5"
              style={{ width: "110px" }}
              value={sortingMethod}
              onChange={handleSearchMethodChange}
            >
              <option value="">전체</option>
              {searchMethodOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Col>
          <Col >
            <label
              htmlFor="sortingMethod"
              className="form-label form-select-label p-1"
            >
              가입형태:
            </label>
            <div style={{display: "flex", flexDirection: "row"}}>
            <div className="p-1" style={{ width: "130px" }}>
              <Select
                value={customerStatus}
                onChange={handlecustomerStatus}
                options={customerstatus}
                name="choices-single-default"
                id="idStatus"
                placeholder="전체"
              ></Select>
            </div>
            <div className="p-1" style={{ width: "130px" }}>
              <Select
                value={customerSignupType}
                onChange={handlecustomerSignupType}
                options={customersignuptype}
                name="choices-single-default"
                id="idStatus"
                placeholder="전체"
              ></Select>
            </div>
            </div>
          </Col>
          <Col >
          <label
                onClick={handleDataSearch}
                style={{ width: "160px" }}
                className="form-label form-select-label p-1"
              >
                가입기간:
              </label>
            <div className="d-flex align-items-center">
            
              <input
                type="date"
                value={moment(startDate).format('YYYY-MM-DD')}
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
          <Col>
            <label
              htmlFor="pageSize"
              className="form-label form-select-label p-1"
            >
              리스트:
            </label>
            <select
              id="pageSize"
              // className="form-select form-select-sm mb-3"
              className="form-select form-select mb-5 p-2"
              style={{ width: "80px" }}
              value={pageSize}
              onChange={handlePageSizeChange}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </Col>
       
          <Col >
            {/* Sorting method select */}

            <label
              htmlFor="sortingMethod"
              className="form-label form-select-label p-1"
            >
              정렬방식:
            </label>
            <select
              id="sortingMethod"
              className="form-select form-select mb-5"
            //   style={{ width: "110px" }}
              value={sortingMethod}
              onChange={handleSortingMethodChange}
            >
              <option value="">등록일순</option>
              {sortingMethodOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Col> 
        
      </Row>
      {/* Modal component */}
      <Modal isOpen={isOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Modal Title</ModalHeader>
        <ModalBody>{/* Modal body content goes here */}</ModalBody>
        <ModalFooter>{/* Modal footer content goes here */}</ModalFooter>
      </Modal>
    </React.Fragment>
  );
};
const CustomersWithdrawalFilter = () => {
    const [isSearch, setIsSearch] = useState(false);
    const [customerStatus, setcustomerStatus] = useState<any>(null);
    const [customerSignupType, setcustomerSignupType] = useState<any>(null);
    const [isOpen, setIsOpen] = useState(false); // Yangi oyna ochish uchun muhit o'zgaruvchisi
  
    const [dateRange, setDateRange] = useState<Date[]>([new Date(), new Date()]); // Using Date[] type for range
    const [customers, setCustomers] = useState([]); // Assuming customers are stored in an array
    const [sortingMethod, setSortingMethod] = useState<string>(""); // State for sorting method
  
    function handlecustomerStatus(customerStatus: any) {
      setcustomerStatus(customerStatus);
    }
    function handlecustomerSignupType(customerStatus: any) {
      setcustomerSignupType(customerStatus);
    }
    const handleSortingMethodChange = (
      event: React.ChangeEvent<HTMLSelectElement>
    ) => {
      setSortingMethod(event.target.value);
      // You can perform any actions here based on the selected sorting method
    };
    const handleSearchMethodChange = (
      event: React.ChangeEvent<HTMLSelectElement>
    ) => {
      setSortingMethod(event.target.value);
      // You can perform any actions here based on the selected sorting method
    };
  
    const sortingMethodOptions = [
      { label: "아이디", value: "아이디" },
      { label: "이름", value: "이름" },
    ];
  
    const searchMethodOptions = [
      { label: "아이디", value: "아이디" },
      { label: "이름", value: "이름" },
      { label: "연락처", value: "연락처"}
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
      const response = await fetch(
        `/api/customers?start=${start.toISOString()}&end=${end.toISOString()}`
      );
      const data = await response.json();
      setCustomers(data);
    };
  
    const [pageSize, setPageSize] = useState("10"); // Default page size
    const handlePageSizeChange = (
      event: React.ChangeEvent<HTMLSelectElement>
    ) => {
      setPageSize(event.target.value);
    };
  
    const [startDate, setStartDate] = useState(moment().format("YYYY-MM-DD"));
    const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));
  
    const handleDataSearch = () => {
      console.log("Search Period:", startDate, "to", endDate);
    };
  
    const handleClickSearchButton = () => {
      setIsSearch(true);
    };
    let navigate=useNavigate();
    const handleWithdrawalClick = () => {
      // URL manzilini ko'rsatish, masalan '/details'
      navigate('/view-withdrawal-details');
    };
  
    return (
      <React.Fragment>
        <Row>
          <Col sm={5}>
            <div className={"search-box me-2 mb-3 d-inline"}>
              <DebouncedInput
                value={""}
                onChange={() => {}} // value={globalFilter ?? ''}
                // onChange={(value) => setGlobalFilter(String(value))}
                // placeholder={SearchPlaceholder}
              />
              <i className="bx bx-search-alt search-icon pb-3"></i>
            </div>
          </Col>
          <Col sm={2}>
            <div>
              <button
                onClick={handleClickSearchButton}
                type="button"
                className="btn btn-success w-100"
              >
                검색
              </button>
            </div>
          </Col>
          {isSearch ? (
            <Col sm={2}>
              <div>
                <button
                  type="button"
                  className="btn btn-secondary w-100"
                  onClick={handleWithdrawalClick}
                >
                  상세검색
                </button>
              </div>
            </Col>
          ) : null}
        </Row>
        <Row className="d-flew flex-row justify-content-around" style={{width: "100%", }}>
            <Col >
              {/* Sorting method select */}
              <label
                htmlFor="sortingMethod"
                className="form-label form-select-label p-1"
              >
                기본검색:
              </label>
              <select
                id="sortingMethod"
                className="form-select form-select mb-5"
                style={{ width: "110px" }}
                value={sortingMethod}
                onChange={handleSearchMethodChange}
              >
                <option value="">전체</option>
                {searchMethodOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </Col>
            <Col >
              <label
                htmlFor="sortingMethod"
                className="form-label form-select-label p-1"
              >
                가입형태:
              </label>
  
              <div className="p-1" style={{ width: "130px" }}>
                <Select
                  value={customerStatus}
                  onChange={handlecustomerStatus}
                  options={customerstatus}
                  name="choices-single-default"
                  id="idStatus"
                  placeholder="전체"
                ></Select>
              </div>
              <div className="p-1" style={{ width: "130px" }}>
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
            <Col >
            <label
                  onClick={handleDataSearch}
                  style={{ width: "160px" }}
                  className="form-label form-select-label p-1"
                >
                  가입기간:
                </label>
              <div className="d-flex align-items-center">
              
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
            <Col>
              <label
                htmlFor="pageSize"
                className="form-label form-select-label p-1"
              >
                리스트:
              </label>
              <select
                id="pageSize"
                // className="form-select form-select-sm mb-3"
                className="form-select form-select mb-5 p-2"
                style={{ width: "80px" }}
                value={pageSize}
                onChange={handlePageSizeChange}
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </Col>
         
            <Col >
              {/* Sorting method select */}
  
              <label
                htmlFor="sortingMethod"
                className="form-label form-select-label p-1"
              >
                정렬방식:
              </label>
              <select
                id="sortingMethod"
                className="form-select form-select mb-5"
              //   style={{ width: "110px" }}
                value={sortingMethod}
                onChange={handleSortingMethodChange}
              >
                <option value="">등록일순</option>
                {sortingMethodOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </Col> 
          
        </Row>
        {/* Modal component */}
        <Modal isOpen={isOpen} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Modal Title</ModalHeader>
          <ModalBody>{/* Modal body content goes here */}</ModalBody>
          <ModalFooter>{/* Modal footer content goes here */}</ModalFooter>
        </Modal>
      </React.Fragment>
    );
  };
  const HospitalGlobalFilter = () => {
    const [isSearch, setIsSearch] = useState(false);
    const [customerStatus, setcustomerStatus] = useState<any>(null);
    const [customerSignupType, setcustomerSignupType] = useState<any>(null);
    const [isOpen, setIsOpen] = useState(false); // Yangi oyna ochish uchun muhit o'zgaruvchisi
  
    const [dateRange, setDateRange] = useState<Date[]>([new Date(), new Date()]); // Using Date[] type for range
    const [customers, setCustomers] = useState([]); // Assuming customers are stored in an array
    const [sortingMethod, setSortingMethod] = useState<string>(""); // State for sorting method
  
  
    const handleSortingMethodChange = (
      event: React.ChangeEvent<HTMLSelectElement>
    ) => {
      setSortingMethod(event.target.value);
      // You can perform any actions here based on the selected sorting method
    };
    const handleSearchMethodChange = (
      event: React.ChangeEvent<HTMLSelectElement>
    ) => {
      setSortingMethod(event.target.value);
      // You can perform any actions here based on the selected sorting method
    };
  
    const sortingMethodOptions = [
      { label: "아이디", value: "아이디" },
      { label: "병원명", value: "병원명" },
    ];
  
    const searchMethodOptions = [
      { label: "아이디", value: "아이디" },
      { label: "병원명", value: "병원명" },
      { label: "주소", value: "주소"}
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
      const response = await fetch(
        `/api/customers?start=${start.toISOString()}&end=${end.toISOString()}`
      );
      const data = await response.json();
      setCustomers(data);
    };
  
    const [pageSize, setPageSize] = useState("10"); // Default page size
    const handlePageSizeChange = (
      event: React.ChangeEvent<HTMLSelectElement>
    ) => {
      setPageSize(event.target.value);
    };
  
    const [startDate, setStartDate] = useState(moment().format("YYYY-MM-DD"));
    const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));
  
    const handleDataSearch = () => {
      console.log("Search Period:", startDate, "to", endDate);
    };
  
    const handleClickSearchButton = () => {
      setIsSearch(true);
    };

    let navigate=useNavigate();
    const handleHospitalView = () => {
      // URL manzilini ko'rsatish, masalan '/details'
      navigate('/hospital-view-details');
    };
  
    return (
      <React.Fragment>
        <Row >
          <Col sm={5} >
            <div className={"search-box me-2 mb-3 d-inline"} >
              <DebouncedInput
                value={""}
                onChange={() => {}} // value={globalFilter ?? ''}
                // onChange={(value) => setGlobalFilter(String(value))}
                // placeholder={SearchPlaceholder}
              />
              <i className="bx bx-search-alt search-icon pb-3"></i>
            </div>
          </Col>
          <Col sm={2}>
            <div>
              <button
                onClick={handleClickSearchButton}
                type="button"
                className="btn btn-success w-100"
              >
                검색
              </button>
            </div>
          </Col>
          {isSearch ? (
            <Col sm={2}>
              <div>
                <button
                  type="button"
                  className="btn btn-secondary w-100"
                  onClick={handleHospitalView}
                >
                  상세검색
                </button>
              </div>
            </Col>
          ) : null}
        </Row>
        <Row className="d-flew flex-row justify-content-around" style={{width: "100%", }}>
            <Col >
              {/* Sorting method select */}
              <label
                htmlFor="sortingMethod"
                className="form-label form-select-label p-1"
              >
                기본검색:
              </label>
              <select
                id="sortingMethod"
                className="form-select form-select mb-5"
                style={{ width: "110px" }}
                value={sortingMethod}
                onChange={handleSearchMethodChange}
              >
                <option value="">전체</option>
                {searchMethodOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </Col>
           
            <Col >
            <label
                  onClick={handleDataSearch}
                  style={{ width: "160px" }}
                  className="form-label form-select-label p-1"
                >
                  가입기간:
                </label>
              <div className="d-flex align-items-center">
              
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
            <Col>
              <label
                htmlFor="pageSize"
                className="form-label form-select-label p-1"
              >
                리스트:
              </label>
              <select
                id="pageSize"
                // className="form-select form-select-sm mb-3"
                className="form-select form-select mb-5 p-2"
                style={{ width: "80px" }}
                value={pageSize}
                onChange={handlePageSizeChange}
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </Col>
         
            <Col >
              {/* Sorting method select */}
  
              <label
                htmlFor="sortingMethod"
                className="form-label form-select-label p-1"
              >
                정렬방식:
              </label>
              <select
                id="sortingMethod"
                className="form-select form-select mb-5"
              //   style={{ width: "110px" }}
                value={sortingMethod}
                onChange={handleSortingMethodChange}
              >
                <option value="">등록일순</option>
                {sortingMethodOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </Col> 
          
        </Row>
        {/* Modal component */}
        <Modal isOpen={isOpen} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Modal Title</ModalHeader>
          <ModalBody>{/* Modal body content goes here */}</ModalBody>
          <ModalFooter>{/* Modal footer content goes here */}</ModalFooter>
        </Modal>
      </React.Fragment>
    );
  };
  const HospitalCheckupFilter = () => {
    const [isSearch, setIsSearch] = useState(false);
    const [customerStatus, setcustomerStatus] = useState<any>(null);
    const [customerSignupType, setcustomerSignupType] = useState<any>(null);
    const [isOpen, setIsOpen] = useState(false); // Yangi oyna ochish uchun muhit o'zgaruvchisi
  
    const [dateRange, setDateRange] = useState<Date[]>([new Date(), new Date()]); // Using Date[] type for range
    const [customers, setCustomers] = useState([]); // Assuming customers are stored in an array
    const [sortingMethod, setSortingMethod] = useState<string>("");
    const [sortingExamination, setSortingExamination] = useState<string>(""); // State for sorting method
     // State for sorting method
  
  
    const handleSortingMethodChange = (
      event: React.ChangeEvent<HTMLSelectElement>
    ) => {
      setSortingMethod(event.target.value);
      // You can perform any actions here based on the selected sorting method
    };
    const handleSearchMethodChange = (
      event: React.ChangeEvent<HTMLSelectElement>
    ) => {
      setSortingMethod(event.target.value);
      // You can perform any actions here based on the selected sorting method
    };
    const handleHealthMethodChange = (
      event: React.ChangeEvent<HTMLSelectElement>
    ) => {
      setSortingExamination(event.target.value);
      // You can perform any actions here based on the selected sorting method
    };
  
    const sortingMethodOptions = [
      { label: "병원명", value: "병원명" },
      { label: "검진비용 오름차순", value: "검진비용 오름차순" },
      { label: "검진비용 내림차순", value: "검진비용 내림차순" }
      
    ];
  
    const searchMethodOptions = [
      { label: "병원명", value: "병원명" },
      { label: "프로그램명", value: "프로그램명" },
     
    ];
    const sortingExaminationOptions=[
      { label: "기업검진", value: "기업검진" },
      { label: "일반검진", value: "일반검진" },
    ]
   

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
      const response = await fetch(
        `/api/customers?start=${start.toISOString()}&end=${end.toISOString()}`
      );
      const data = await response.json();
      setCustomers(data);
    };
  
    const [pageSize, setPageSize] = useState("10"); // Default page size
    const handlePageSizeChange = (
      event: React.ChangeEvent<HTMLSelectElement>
    ) => {
      setPageSize(event.target.value);
    };
  
    const [startDate, setStartDate] = useState(moment().format("YYYY-MM-DD"));
    const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));
  
    const handleDataSearch = () => {
      console.log("Search Period:", startDate, "to", endDate);
    };
  
    const handleClickSearchButton = () => {
      setIsSearch(true);
    };

    let navigate=useNavigate();
    const handleHospitalView = () => {
      // URL manzilini ko'rsatish, masalan '/details'
      navigate('/hospital-view-details');
    };
    
    const [minCost, setMinCost] = useState("");
    const [maxCost, setMaxCost] = useState("");
  
    // handleDataSearch funksiyasi - ma'lumot qidirish uchun
    const handleCostSearch = () => {
      // minCost va maxCost qiymatlarni ishlatib, kerakli ma'lumotlar qidiriladi
      console.log("Min Cost:", minCost);
      console.log("Max Cost:", maxCost);
      // Qidiruvni amalga oshirish uchun kerakli kodni qo'shing
    };
  
    // Raqamni tekshirish uchun validatsiya funksiyasi
    const isNumeric = (value: string): boolean => {
      return /^\d+$/.test(value);
    };
    
  
    // Max qiymatdan kichik bo'lishini tekshirish
    const isLessThanMax = () => {
      return parseInt(minCost) < parseInt(maxCost);
    };
   
  
    return (
      <React.Fragment>
        <Row style={{paddingTop: "30px"}} >
          <Col sm={5} >
            <div className={"search-box me-2 mb-3 d-inline"} >
              <DebouncedInput
                value={""}
                onChange={() => {}} // value={globalFilter ?? ''}
                // onChange={(value) => setGlobalFilter(String(value))}
                // placeholder={SearchPlaceholder}
              />
              <i className="bx bx-search-alt search-icon pb-3"></i>
            </div>
          </Col>
          <Col sm={2}>
            <div>
              <button
                onClick={handleClickSearchButton}
                type="button"
                className="btn btn-success w-100"
              >
                검색
              </button>
            </div>
          </Col>
          {isSearch ? (
            <Col sm={2}>
              <div>
                <button
                  type="button"
                  className="btn btn-secondary w-100"
                  onClick={handleHospitalView}
                >
                  상세검색
                </button>
              </div>
            </Col>
          ) : null}
        </Row>
        <Row className="d-flew flex-row justify-content-around mb-5" style={{width: "100%", }}>
            <Col >
              {/* Sorting method select */}
              <label
                htmlFor="sortingMethod"
                className="form-label form-select-label p-1"
              >
                기본검색:
              </label>
              <select
                id="sortingMethod"
                className="form-select form-select mb-5"
                style={{ width: "110px" }}
                value={sortingMethod}
                onChange={handleSearchMethodChange}
              >
                <option value="">전체</option>
                {searchMethodOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </Col>
            <Col>
      <label
        onClick={handleCostSearch}
        style={{ width: "160px" }}
        className="form-label form-select-label p-1"
      >
        검진비용:
      </label>
      <div className="d-flex align-items-center">
        {/* Min cost input */}
        <input
          className="form-control form-control mb-5"
          type="text"
          placeholder="Min Cost"
          value={minCost}
          onChange={(e) => {
            if (isNumeric(e.target.value)) {
              setMinCost(e.target.value);
            }
          }}
          maxLength={8} // Maksimal uzunlik
          prefix="$" // Valyuta belgisi
        />
        <span className="fw-semibold text-muted">-</span>
        {/* Max cost input */}
        <input
          className="form-control form-control mb-5"
          type="text"
          placeholder="Max Cost"
          value={maxCost}
          onChange={(e) => {
            if (isNumeric(e.target.value) && isLessThanMax()) {
              setMaxCost(e.target.value);
            }
          }}
          maxLength={8} // Maksimal uzunlik
          prefix="$" // Valyuta belgisi
        />
      </div>
    </Col>
              
            <Col >
              {/* Sorting method select */}
              <label
                htmlFor="sortingMethod"
                className="form-label form-select-label p-1"
              >
               검진분류:
              </label>
              <select
                id="sortingMethod"
                className="form-select form-select mb-5"
                style={{ width: "110px" }}
                value={sortingExamination}
                onChange={handleHealthMethodChange}
              >
                <option value="">전체</option>
                {sortingExaminationOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </Col>
         
            <Col>
              <label
                htmlFor="pageSize"
                className="form-label form-select-label p-1"
              >
                리스트:
              </label>
              <select
                id="pageSize"
                // className="form-select form-select-sm mb-3"
                className="form-select form-select mb-5 p-2"
                style={{ width: "80px" }}
                value={pageSize}
                onChange={handlePageSizeChange}
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </Col>
         
            <Col >
              {/* Sorting method select */}
  
              <label
                htmlFor="sortingMethod"
                className="form-label form-select-label p-1"
              >
                정렬방식:
              </label>
              <select
                id="sortingMethod"
                className="form-select form-select mb-5"
              //   style={{ width: "110px" }}
                value={sortingMethod}
                onChange={handleSortingMethodChange}
              >
                <option value="">등록일순</option>
                {sortingMethodOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </Col> 
          
        </Row>
        {/* Modal component */}
        <Modal isOpen={isOpen} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Modal Title</ModalHeader>
          <ModalBody>{/* Modal body content goes here */}</ModalBody>
          <ModalFooter>{/* Modal footer content goes here */}</ModalFooter>
        </Modal>
      </React.Fragment>
    );
  };
const OrderGlobalFilter = () => {
  const [orderStatus, setorderStatus] = useState<any>([]);
  const [orderPayement, setorderPayement] = useState<any>(null);

  function handleorderStatus(orderstatus: any) {
    setorderStatus(orderstatus);
  }

  function handleorderPayement(orderPayement: any) {
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
            onChange={handleorderStatus}
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
            onChange={handleorderPayement}
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

  function handlesortBy(sortBy: any) {
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

const CompaniesGlobalFilter = () => {
  const [sortBy, setsortBy] = useState("Owner");

  function handlesortBy(sortBy: any) {
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
          <span className="input-group-text" id="basic-addon1">
            <i className="ri-calendar-2-line"></i>
          </span>
          <Flatpickr
            placeholder="Select date"
            className="form-control"
            options={{
              mode: "range",
              dateFormat: "d M, Y",
            }}
          />
        </div>
      </Col>
      <Col xl={2} md={4}>
        <select
          className="form-control"
          data-choices
          data-choices-search-false
          name="choices-single-default"
          id="choices-single-default"
        >
          <option defaultValue="all">Select Type</option>
          <option value="Buy">Sell</option>
          <option value="Sell">Buy</option>
        </select>
      </Col>
      <Col xl={2} md={4}>
        <select
          className="form-control"
          data-choices
          data-choices-search-false
          name="choices-single-default2"
          id="choices-single-default2"
        >
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

  function handleisStatus(isStatus: any) {
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
            onChange={(isStatus: any) => {
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
          <i className="ri-equalizer-fill me-1 align-bottom"></i> Filters
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
            dateFormat: "d M, Y",
          }}
        />
      </Col>
      <Col xxl={3} sm={4}>
        <div className="input-light">
          <select
            className="form-control"
            data-choices
            data-choices-search-false
            name="choices-single-default"
            id="idStatus"
          >
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
        <button type="button" className="btn btn-primary w-100">
          {" "}
          <i className="ri-equalizer-fill me-1 align-bottom"></i>
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
          <select
            className="form-control"
            data-choices
            data-choices-search-false
            name="choices-single-default"
            id="idStatus"
          >
            <option value="All Time" defaultValue="All Time">
              All Time
            </option>
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
            dateFormat: "d M, Y",
          }}
        />
      </div>

      <div className="col-xxl-3 col-sm-4">
        <div className="input-light">
          <select
            className="form-control"
            data-choices
            data-choices-search-false
            name="status"
            id="idStatus"
          >
            <option value="">Status</option>
            <option defaultValue="all">All</option>
            <option value="New">New</option>
            <option value="Pending">Pending</option>
            <option value="Inprogress">Inprogress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>
      <div className="col-xxl-1 col-sm-4">
        <button type="button" className="btn btn-primary w-100">
          {" "}
          <i className="ri-equalizer-fill me-1 align-bottom"></i>
          Filters
        </button>
      </div>
    </React.Fragment>
  );
};

const LeadsGlobalFilter = ({ onClickDelete }: any) => {
  return (
    <React.Fragment>
      <div className="col-sm-auto ms-auto">
        <div className="hstack gap-2">
          <button className="btn btn-soft-danger" onClick={onClickDelete}>
            <i className="ri-delete-bin-2-line"></i>
          </button>
          <button
            type="button"
            className="btn btn-info"
            //  onClick={toggleInfo}
          >
            <i className="ri-filter-3-line align-bottom me-1"></i> Fliters
          </button>
          <button
            type="button"
            className="btn btn-success add-btn"
            id="create-btn"
            // onClick={() => { setIsEdit(false); toggle(); }}
          >
            <i className="ri-add-line align-bottom me-1"></i> Add Leads
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
            <DropdownMenu>
              <li>
                <DropdownItem>Copy</DropdownItem>
              </li>
              <li>
                <DropdownItem>Move to pipline</DropdownItem>
              </li>
              <li>
                <DropdownItem>Add to exceptions</DropdownItem>
              </li>
              <li>
                <DropdownItem>Switch to common form view</DropdownItem>
              </li>
              <li>
                <DropdownItem>Reset form view to default</DropdownItem>
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
  CustomersWithdrawalFilter,
  HospitalGlobalFilter,
  HospitalCheckupFilter,
  OrderGlobalFilter,
  ContactsGlobalFilter,
  CompaniesGlobalFilter,
  CryptoOrdersGlobalFilter,
  InvoiceListGlobalSearch,
  TicketsListGlobalFilter,
  NFTRankingGlobalFilter,
  TaskListGlobalFilter,
  LeadsGlobalFilter,
};