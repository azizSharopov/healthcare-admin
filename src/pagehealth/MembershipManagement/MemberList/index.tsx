import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  Modal,
  Form,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";
import { Link } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import { isEmpty } from "lodash";
import moment from "moment";
import "flatpickr/dist/themes/material_green.css"; // or any theme you prefer

import { useNavigate } from 'react-router-dom';

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";


//Import Breadcrumb
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import DeleteModal from "../../../Components/Common/DeleteModal";

import {
  getCustomers as onGetCustomers,
  addNewCustomer as onAddNewCustomer,
  updateCustomer as onUpdateCustomer,
  deleteCustomer as onDeleteCustomer,
} from "../../../slices/thunks";

//redux
import { useSelector, useDispatch } from "react-redux";
import TableContainer from "../../../Components/Common/TableContainer";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../../../Components/Common/Loader";

// Export Modal
import ExportCSVModal from "../../../Components/Common/ExportCSVModal";
import { createSelector } from "reselect";
import { CustomersGlobalFilter } from "Components/Common/GlobalSearchFilter";

// Define the calculateAge function outside the component
const calculateAge = (birthdate: string) => {
  const today = new Date();
  const dob = new Date(birthdate);
  let age = today.getFullYear() - dob.getFullYear();
  const month = today.getMonth() - dob.getMonth();

  if (month < 0 || (month === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  return age;
};

const MemberList = () => {
  const dispatch: any = useDispatch();

  let navigate = useNavigate();
  const selectLayoutState = (state: any) => state.Ecommerce;
  const ecomCustomerProperties = createSelector(
    selectLayoutState,
    (ecom) => ({
      customers: ecom.customers,
      isCustomerSuccess: ecom.isCustomerSuccess,
      error: ecom.error,
    })
  );
  // Inside your component
  const {
    customers, isCustomerSuccess, error
  } = useSelector(ecomCustomerProperties);


  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [customer, setCustomer] = useState<any>([]);

  
  const [pageSize, setPageSize] = useState('10'); // Default page size
  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPageSize(event.target.value);
    };
 
  // Delete customer
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteModalMulti, setDeleteModalMulti] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      setCustomer(null);
    } else {
      setModal(true);
      // setDate(dateFormat());
    }
  }, [modal]);

  const customermocalstatus = [
    {
      options: [
        { label: "상태", value: "상태" },
        { label: "정상", value: "정상" },
        { label: "정지", value: "정지" },
        { label: "휴먼", value: "휴먼" },
        { label: "탈퇴대기", value: "탈퇴대기"},
      ],
    },
  ];

  // Delete Data
  const onClickDelete = (customer: any) => {
    setCustomer(customer);
    setDeleteModal(true);
  };

  // validation
  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      customer: (customer && customer.customer) || '',
      name: (customer && customer.customer) || '',
      password: (customer && customer.customer) || '',
      confirm_password: (customer && customer.customer) || '',
      email: (customer && customer.email) || '',
      phone: (customer && customer.phone) || '',
      date: (customer && customer.date) || '',
      status: (customer && customer.status) || '',
      company: (customer && customer.company) || '',
      signuppath: (customer && customer.company) || '',
      birthdate: (customer && customer.birthdate) || '', // Add birthdate field
      gender: (customer && customer.gender) || '', // Add gender field
    },
    validationSchema: Yup.object({
      customer: Yup.string().required("회원 아이디를 입력하세요"),
      name: Yup.string().required("회원 이름을 입력하세요"),
      email: Yup.string().required("이메일 주소를 입력하세요"),
      password: Yup.string().required("회원 비믈번호를 입력하세요"),
      confirm_password: Yup.string().required("회원 비밀번호를 재입력해주십시오"),
      phone: Yup.string().required("연락처를 입력하세요"),
      // date: Yup.string().required("Please Enter date"),
      status: Yup.string().required("회원 상태를 입력하세요"),
      // company: Yup.string().required("회원 회원그룹을 입력하세요"),
      birthdate: Yup.date().required("생년월일을 입력하세요"), // Add birthdate validation
      gender: Yup.string().required("성별을 선택하세요"), // Add gender validation
    }),

    

    onSubmit: (values) => {
      if (isEdit) {
        const updateCustomer = {
          id: customer ? customer.id : 0,
          customer: values.customer,
          name: values.name,
          password: values.password,
          confirm_password: values.confirm_password,
          gender: values.gender,
          signuppath: values.signuppath,
          email: values.email,
          phone: values.phone,
          date: values.date,
          status: values.status,
          company: values.company,
          age: calculateAge(values.birthdate), // Calculate age
        };
        // update customer
        dispatch(onUpdateCustomer(updateCustomer));
        validation.resetForm();
      } else {
        const newCustomer = {
          id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
          customer: values["customer"],
          name: values["name"],
          password: values["password"],
          confirm_password: values["confirm_password"],
          gender: values["gender"],
          signuppath: values["signuppath"],
          email: values["email"],
          phone: values["phone"],
          date: values["date"],
          status: values["status"],
          company: values["company"],
          age: calculateAge(values["birthdate"]), // Calculate age
        };
        // save new customer
        dispatch(onAddNewCustomer(newCustomer));
        validation.resetForm();
      }
      toggle();
    },
  });

  // Delete Data
  const handleDeleteCustomer = () => {
    if (customer) {
      dispatch(onDeleteCustomer(customer.id));
      setDeleteModal(false);
    }
  };

  // const handleEditCustomerClick = (customer: any) => {
  //   navigate('/edit-customer', { state: { customer } });
  // };
  
  // Update Data
  const handleCustomerClick = useCallback((arg: any) => {
    const customer = arg;

    setCustomer({
      id: customer.id,
      customer: customer.customer,
      email: customer.email,
      phone: customer.phone,
      date: customer.date,
      status: customer.status,
      company: customer.company,
    });

    setIsEdit(true);
    toggle();
  }, [toggle]);


  useEffect(() => {
    if (customers && !customers.length) {
      dispatch(onGetCustomers());
    }
  }, [dispatch, customers]);


  useEffect(() => {
    setCustomer(customers);
  }, [customers]);

  useEffect(() => {
    if (!isEmpty(customers)) {
      setCustomer(customers);
      setIsEdit(false);
    }
  }, [customers]);

  // Node API 
  // useEffect(() => {
  //   if (isCustomerCreated) {
  //     setCustomer(null);
  //     dispatch(onGetCustomers());
  //   }
  // }, [
  //   dispatch,
  //   isCustomerCreated,
  // ]);

  const handleValidDate = (date: any) => {
    const date1 = moment(new Date(date)).format("Y. MM. DD");
    return date1;
  };

  // Checked All
  const checkedAll = useCallback(() => {
    const checkall: any = document.getElementById("checkBoxAll");
    const ele = document.querySelectorAll(".customerCheckBox");

    if (checkall.checked) {
      ele.forEach((ele: any) => {
        ele.checked = true;
      });
    } else {
      ele.forEach((ele: any) => {
        ele.checked = false;
      });
    }
    deleteCheckbox();
  }, []);

  // Delete Multiple
  const [selectedCheckBoxDelete, setSelectedCheckBoxDelete] = useState<any>([]);
  const [isMultiDeleteButton, setIsMultiDeleteButton] = useState<boolean>(false);

  const deleteMultiple = () => {
    const checkall: any = document.getElementById("checkBoxAll");
    selectedCheckBoxDelete.forEach((element: any) => {
      dispatch(onDeleteCustomer(element.value));
      setTimeout(() => { toast.clearWaitingQueue(); }, 3000);
    });
    setIsMultiDeleteButton(false);
    checkall.checked = false;
  };

  const deleteCheckbox = () => {
    const ele = document.querySelectorAll(".customerCheckBox:checked");
    ele.length > 0 ? setIsMultiDeleteButton(true) : setIsMultiDeleteButton(false);
    setSelectedCheckBoxDelete(ele);
  };



  // Customers Column
  const columns = useMemo(
    () => [
      {
        header: <input type="checkbox" id="checkBoxAll" className="form-check-input" onClick={() => checkedAll()} />,
        cell: (cell: any) => {
          return <input type="checkbox" className="customerCheckBox form-check-input" value={cell.getValue()} onChange={() => deleteCheckbox()} />;
        },
        id: '#',
        accessorKey: 'id',
        enableColumnFilter: false,
        enableSorting: false,
      },
      {
        header: "번호",
        cell: (cell: any) => {
          return cell.row.index + 1; // Jadvalning qator indeksi + 1, raqamni olish uchun
        },
        id: '#',
        accessorKey: 'id', // Eslatma: Bu maydon ishlatilmasa ham bo'ladi
        enableColumnFilter: false,
        enableSorting: false,
      },
      {
        header: "아이디",
        accessorKey: "user_id",
        enableColumnFilter: false,
      },
      {
        header: "이름",
        accessorKey: "user_name",
        enableColumnFilter: false,
      },
      {
        header: "신상",
        accessorKey: "user_gender",
        enableColumnFilter: false,
      },
      {
        header: "연락처",
        accessorKey: "user_mobile",
        enableColumnFilter: false,
      },
      {
        header: "상태",
        accessorKey: "state_name",
        enableColumnFilter: false,
        cell: (cell: any) => {
          switch (cell.getValue()) {
            case "정상":
              return <span className="badge text-uppercase bg-success-subtle text-success"> {cell.getValue()} </span>;
            case "정지":
              return <span className="badge text-uppercase bg-danger-subtle text-danger"> {cell.getValue()} </span>;
            default:
              return <span className="badge text-uppercase bg-info-subtle text-info"> {cell.getValue()} </span>;
          }
        }
      },
      {
        header: "등록일",
        accessorKey: "reg_dt",
        enableColumnFilter: false,
        cell: (cell: any) => (
          <>
            {handleValidDate(cell.getValue())}
          </>
        ),
      },
     
      {
        header: "수정",
        cell: (cellProps: any) => {
          return (
            <ul className="list-inline hstack gap-2 mb-0">
              <li className="list-inline-item edit" title="Edit">
                <Link to="/edit-customer" className="text-primary d-inline-block edit-item-btn">
  <i className="ri-pencil-fill fs-16"></i>
</Link>
              </li>
            </ul>
          );
        },
      },
      
      {
        header: "삭제",
        cell: (cellProps: any) => {
          return (
            <ul className="list-inline hstack gap-2 mb-0">
             
             <li className="list-inline-item" title="Remove">
                <Link
                  to="#"
                  className="text-danger d-inline-block remove-item-btn"
                  onClick={() => { const customerData = cellProps.row.original; onClickDelete(customerData); }}
                >
                  <i className="ri-delete-bin-5-fill fs-16"></i>
                </Link>
              </li>
            </ul>
          );
        },
      },
    ],
    [handleCustomerClick, checkedAll]
  );

  // Export Modal
  const [isExportCSV, setIsExportCSV] = useState<boolean>(false);

  document.title = "Customers | Healthcare - React Admin & Dashboard Template";
  return (
    <React.Fragment>
      <div className="page-content">
        <ExportCSVModal
          show={isExportCSV}
          onCloseClick={() => setIsExportCSV(false)}
          data={customers}
        />
        <DeleteModal
          show={deleteModal}
          onDeleteClick={handleDeleteCustomer}
          onCloseClick={() => setDeleteModal(false)}
        />
        <DeleteModal
          show={deleteModalMulti}
          onDeleteClick={() => {
            deleteMultiple();
            setDeleteModalMulti(false);
          }}
          onCloseClick={() => setDeleteModalMulti(false)}
        />
        <Container fluid>
          <BreadCrumb title="회원목록" pageTitle="회원관리" />
          <Row>
            <Col lg={12}>
              <Card id="customerList">
                <CardHeader className="border-0">
                  <Row><CustomersGlobalFilter/></Row>
                  <Row className="g-4 align-items-center">
                    <div className="col-sm">
                      <div>
                        <h5 className="card-title mb-0">회원목록</h5>
                      </div>
                    </div>
                    <div className="col-sm-auto">
                      <div>
                        {isMultiDeleteButton && <button className="btn btn-soft-danger me-1"
                          onClick={() => setDeleteModalMulti(true)}
                        ><i className="ri-delete-bin-2-line"></i></button>}
                        {/* <button
                          type="button"
                          className="btn btn-secondary add-btn me-1"
                          id="create-btn"
                          onClick={() => { setIsEdit(false); toggle(); }}
                        >
                          <i className="ri-add-line align-bottom me-1"></i> 회원 등록
                        </button>{" "} */}
                        <button
      type="button"
      className="btn btn-secondary add-btn me-1"
      id="create-btn"
      onClick={() => {
        setIsEdit(false);
        navigate("/add-customer"); // Bu yerda yangi sahifaga yo'naltirish manzilini ko'rsating
      }}
    >
      <i className="ri-add-line align-bottom me-1"></i> 회원 등록
    </button>
                        <button type="button" className="btn btn-success" onClick={() => setIsExportCSV(true)}>
                          <i className="ri-file-download-line align-bottom me-1"></i>{" "}
                          엑셀다운로드
                        </button>
                      </div>
                    </div>
                  </Row>
                </CardHeader>

                <div className="card-body pt-0">
               
                
          <div className="card-body pt-0">
      {isCustomerSuccess && customers.length ? (
        <TableContainer
          columns={columns}
          data={customers}
          // isGlobalFilter={true}
          // customPageSize={pageSize}
          // isCustomerFilter={true}
          theadClass="table-light text-muted"
          divClass="table-responsive table-card mb-3"
          tableClass="align-middle table-nowrap"
          SearchPlaceholder='아이디, 이름, 연락처 검색...'
        />
      ) : (
        <Loader error={error} />
      )}
    </div>
              

                  <Modal id="showModal" class="w-50 p-3" isOpen={modal} toggle={toggle} centered>
                    <ModalHeader className="bg-light p-3" toggle={toggle}>
                      {!!isEdit ? "회원 수정" : "회원 등록"}
                    </ModalHeader>
                    <Form className="tablelist-form" onSubmit={(e: any) => {
                      e.preventDefault();
                      validation.handleSubmit();
                      return false;
                    }}>
                      <ModalBody>
                        <input type="hidden" id="id-field" />

                        <div
                          className="mb-3"
                          id="modal-id"
                          style={{ display: "none" }}
                        >
                          <Label htmlFor="id-field1" className="form-label">
                            ID
                          </Label>
                          <Input
                            type="text"
                            id="id-field1"
                            className="form-control"
                            placeholder="ID"
                            readOnly
                          />
                        </div>
                        
                        <div className="mb-3">
                          <Label
                            htmlFor="customername-field"
                            className="form-label"
                          >
                           아이디
                          </Label>
                          <Input
                            name="customer"
                            id="customername-field"
                            className="form-control"
                            placeholder="아이디를 입력하세요"
                            type="text"
                            validate={{
                              required: { value: true },
                            }}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.customer || ""}
                            invalid={
                              validation.touched.customer && validation.errors.customer ? true : false
                            }
                          />
                          {validation.touched.customer && validation.errors.customer ? (
                            <FormFeedback type="invalid">{validation.errors.customer}</FormFeedback>
                          ) : null}
                        </div>
                     
                        <div className="mb-3">
  <Label htmlFor="password-field" className="form-label">
    비밀번호
  </Label>
  <Input
    name="password"
    type="password"
    id="password-field"
    className="form-control"
    placeholder="비밀번호를 입력해주세요"
    onChange={validation.handleChange}
    onBlur={validation.handleBlur}
    value={validation.values.password || ""}
    invalid={
      validation.touched.password && validation.errors.password
        ? true
        : false
    }
  />
  {validation.touched.password && validation.errors.password ? (
    <FormFeedback type="invalid">
      {validation.errors.password}
    </FormFeedback>
  ) : null}
</div>
<div className="mb-3">
  <Label htmlFor="confirm-password-field" className="form-label">
  비밀번호 화근
  </Label>
  <Input
    name="confirm_password"
    type="password"
    id="confirm-password-field"
    className="form-control"
    placeholder="비밀번호를 입력해주세요"
    onChange={validation.handleChange}
    onBlur={validation.handleBlur}
    value={validation.values.confirm_password || ""}
    invalid={
      validation.touched.confirm_password &&
      validation.errors.confirm_password
        ? true
        : false
    }
  />
  {validation.touched.confirm_password &&
  validation.errors.confirm_password ? (
    <FormFeedback type="invalid">
      {validation.errors.confirm_password}
    </FormFeedback>
  ) : null}
</div>

                        <div className="mb-3">
                          <Label
                            htmlFor="customername-field"
                            className="form-label"
                          >
                           회원 이름
                          </Label>
                          <Input
                            name="customer"
                            id="customername-field"
                            className="form-control"
                            placeholder="이름을 입력하세요"
                            type="text"
                            validate={{
                              required: { value: true },
                            }}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.customer || ""}
                            invalid={
                              validation.touched.customer && validation.errors.customer ? true : false
                            }
                          />
                          {validation.touched.customer && validation.errors.customer ? (
                            <FormFeedback type="invalid">{validation.errors.customer}</FormFeedback>
                          ) : null}
                        </div>

                        <div className="mb-3">
                          <Label htmlFor="email-field" className="form-label">
                          이메일
                          </Label>
                          <Input
                            name="email"
                            type="email"
                            id="email-field"
                            placeholder="이메일 주소를 입력하세요"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.email || ""}
                            invalid={
                              validation.touched.email && validation.errors.email ? true : false
                            }
                          />
                          {validation.touched.email && validation.errors.email ? (
                            <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                          ) : null}

                        </div>

                        <div className="mb-3">
                          <Label htmlFor="phone-field" className="form-label">
                            연락처
                          </Label>
                          <Input
                            name="phone"
                            type="text"
                            id="phone-field"
                            placeholder="연락처를 입력해주세요"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.phone || ""}
                            invalid={
                              validation.touched.phone && validation.errors.phone ? true : false
                            }
                          />
                          {validation.touched.phone && validation.errors.phone ? (
                            <FormFeedback type="invalid">{validation.errors.phone}</FormFeedback>
                          ) : null}

                        </div>
                    
                        <div>
        <Label
          htmlFor="company_name-field"
          className="form-label"
        >
       회원그룹
        </Label>
        <Input
          name="company_name"
          id="company_name-field"
          className="form-control"
          placeholder="회원그룹을 입력해주세요"
          type="text"
          validate={{
            required: { value: true },
          }} 
          onChange={validation.handleChange}
          onBlur={validation.handleBlur}
          value={validation.values.company || ""}
          invalid={
            validation.touched.company && validation.errors.company ? true : false
          }
        />
        {validation.touched.company && validation.errors.company ? (
          <FormFeedback type="invalid">{validation.errors.company}</FormFeedback>
        ) : null}

      </div>
    

                        <div className="mb-3">
                          <Label htmlFor="date-field" className="form-label">
                            등록일
                          </Label>

                          <Flatpickr
                            name="date"
                            id="date-field"
                            className="form-control"
                            placeholder="등록일을 입력해주세요"
                            options={{
                              altInput: true,
                              altFormat: "d M, Y",
                              dateFormat: "d M, Y",
                            }}

                            onChange={(date: any) => validation.setFieldValue("date", moment(date[0]).format("DD MMMM ,YYYY"))}
                            value={validation.values.date || ''}
                          />
                          {validation.errors.date && validation.touched.date ? (
                            <FormFeedback type="invalid" className='d-block'>{validation.errors.date}</FormFeedback>
                          ) : null}
                        </div>

                        <div>
                          <Label htmlFor="status-field" className="form-label">
                            Status
                          </Label>

                          <Input
                            name="status"
                            type="select"
                            className="form-select"
                            id="status-field"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={
                              validation.values.status || ""
                            }
                            invalid={
                              validation.touched.status && validation.errors.status ? true : false
                            }
                          >
                            {customermocalstatus.map((item, key) => (
                              <React.Fragment key={key}>
                                {item.options.map((item, key) => (<option value={item.value} key={key}>{item.label}</option>))}
                              </React.Fragment>
                            ))}
                          </Input>
                          {validation.touched.status &&
                            validation.errors.status ? (
                            <FormFeedback type="invalid">
                              {validation.errors.status}
                            </FormFeedback>
                          ) : null}
                        </div>

<div>
  <Label htmlFor="gender-field" className="form-label">
    Gender
  </Label>
  <div>
    <input
      className="form-check-input"
      type="radio"
      name="gender"
      id="female"
      value="female"
      checked={validation.values.gender === "female"}
      onChange={validation.handleChange}
    />
    <label className="form-check-label" htmlFor="female">
      Female
    </label>
  </div>
  <div>
    <input
      className="form-check-input"
      type="radio"
      name="gender"
      id="male"
      value="male"
      checked={validation.values.gender === "male"}
      onChange={validation.handleChange}
    />
    <label className="form-check-label" htmlFor="male">
      Male
    </label>
  </div>
</div>


                      

<div className="mb-3">
  <Label htmlFor="birthdate-field" className="form-label">
   생년월일
  </Label>
  <Input
    name="birthdate"
    type="date"
    id="birthdate-field"
    onChange={validation.handleChange}
    onBlur={validation.handleBlur}
    value={validation.values.birthdate || ""}
    invalid={validation.touched.birthdate && validation.errors.birthdate}
  />
  {validation.touched.birthdate && validation.errors.birthdate ? (
    <FormFeedback type="invalid">{validation.errors.birthdate}</FormFeedback>
  ) : null}
</div>
                      </ModalBody>
                      <ModalFooter>
                        <div className="hstack gap-2 justify-content-end">
                          <button type="button" className="btn btn-light" onClick={() => { setModal(false); }}> 목록 </button>

                          <button type="submit" className="btn btn-success"> {!!isEdit ? "Update" : "Add Customer"} </button>
                        </div>
                      </ModalFooter>
                    </Form>
                  </Modal>
                  <ToastContainer closeButton={false} limit={1} />
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default MemberList;

