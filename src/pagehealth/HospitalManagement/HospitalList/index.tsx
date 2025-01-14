import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { isEmpty } from "lodash";
import { BrowserRouter as Router } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// Import Images
import avatar10 from "../../../assets/images/users/avatar-10.jpg";

import {
  Col,
  Container,
  Row,
  Card,
  CardHeader,
  CardBody,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  ModalFooter,
  Table,
  FormFeedback,

} from "reactstrap";
import Select from "react-select";

import BreadCrumb from "../../../Components/Common/BreadCrumb";
import DeleteModal from "../../../Components/Common/DeleteModal";

// Export Modal
import ExportCSVModal from "../../../Components/Common/ExportCSVModal";

//Import actions
import {
  getContacts as onGetContacts,
  addNewContact as onAddNewContact,
  updateContact as onUpdateContact,
  deleteContact as onDeleteContact,
} from "../../../slices/thunks";
//redux
import { useSelector, useDispatch } from "react-redux";
import TableContainer from "../../../Components/Common/TableContainer";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";

import Loader from "../../../Components/Common/Loader";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createSelector } from "reselect";
import moment from "moment";


import dummyImg from "../../../assets/images/users/user-dummy-img.jpg";
import { HospitalGlobalFilter } from "Components/Common/GlobalSearchFilter";



const HospitalList = () => {
  const dispatch: any = useDispatch();

  
  let navigate = useNavigate();
  const selectLayoutState = (state: any) => state.Crm;
  const crmcontactData = createSelector(
    selectLayoutState,
    (state: any) => ({
      crmcontacts: state.crmcontacts,
      // isContactSuccess: state.isContactSuccess,
      error: state.error,
    })
  );
  // Inside your component
  const {
    crmcontacts, error
  } = useSelector(crmcontactData);

  
  useEffect(() => {
    if (crmcontacts && !crmcontacts.length) {
      dispatch(onGetContacts());
    }
  }, [dispatch, crmcontacts]);

  useEffect(() => {
    setContact(crmcontacts);
  }, [crmcontacts]);

  useEffect(() => {
    if (!isEmpty(crmcontacts)) {
      setContact(crmcontacts);
      setIsEdit(false);
    }
  }, [crmcontacts]);



  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [contact, setContact] = useState<any>([]);


  //delete Conatct
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteModalMulti, setDeleteModalMulti] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      setContact(null);
      setSelectedImage('');
      setImgStore('');
    } else {
      setModal(true);
      setTag([]);
      setAssignTag([]);
    }
  }, [modal]);

  // Delete Data
  const handleDeleteContact = () => {
    if (contact) {
      dispatch(onDeleteContact(contact.id));
      setDeleteModal(false);
    }
  };

  const onClickDelete = (contact: any) => {
    setContact(contact);
    setDeleteModal(true);
  };

  // Date & Time Format

  const dateFormat = () => {
    var d = new Date(),
      months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return (d.getDate() + ' ' + months[d.getMonth()] + ', ' + d.getFullYear());
  };

  // validation
  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (contact && contact.id) || '',
      img: (contact && contact.img) || '',
      name: (contact && contact.name) || '',
      company: (contact && contact.company) || '',
      designation: (contact && contact.designation) || '',
      email: (contact && contact.email) || '',
      phone: (contact && contact.phone) || '',
      score: (contact && contact.score) || '',
      tags: (contact && contact.tags) || [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Name"),
      img: Yup.string().required("Please Enter Image"),
      company: Yup.string().required("Please Enter Company"),
      designation: Yup.string().required("Please Enter Designation"),
      email: Yup.string().required("Please Enter Email"),
      phone: Yup.string().required("Please Enter Phone"),
      score: Yup.string().required("Please Enter score"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        const updateContact = {
          id: contact ? contact.id : 0,
          img: values.img,
          name: values.name,
          company: values.company,
          designation: values.designation,
          email: values.email,
          phone: values.phone,
          score: values.score,
          date: dateFormat(),
          // time: timeFormat(),
          tags: assignTag,
        };
        // update Contact
        dispatch(onUpdateContact(updateContact));
        validation.resetForm();
      } else {
        const newContact = {
          id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
          img: values["img"],
          name: values["name"],
          company: values["company"],
          designation: values["designation"],
          email: values["email"],
          phone: values["phone"],
          score: values["score"],
          date: dateFormat(),
          // time: timeFormat(),
          tags: assignTag,
        };
        // save new Contact
        dispatch(onAddNewContact(newContact));
        validation.resetForm();
      }
      toggle();
    },
  });

  // Update Data
  const handleContactClick = useCallback((arg: any) => {
    const contact = arg;

    setContact({
      id: contact.id,
      img: contact.img,
      name: contact.name,
      company: contact.company,
      email: contact.email,
      designation: contact.designation,
      phone: contact.phone,
      score: contact.score,
      date: contact.date,
      // time: contact.time,
      tags: contact.tags,
    });

    setIsEdit(true);
    toggle();
  }, [toggle]);

  const handleValidDate = (date: any) => {
    const date1 = moment(new Date(date)).format("DD MMM Y");
    return date1;
  };

  const handleValidTime = (time: any) => {
    const time1 = new Date(time);
    const getHour = time1.getUTCHours();
    const getMin = time1.getUTCMinutes();
    const getTime = `${getHour}:${getMin}`;
    var meridiem = "";
    if (getHour >= 12) {
      meridiem = "PM";
    } else {
      meridiem = "AM";
    }
    const updateTime = moment(getTime, 'hh:mm').format('hh:mm') + " " + meridiem;
    return updateTime;
  };


  // Checked All
  const checkedAll = useCallback(() => {
    const checkall: any = document.getElementById("checkBoxAll");
    const ele = document.querySelectorAll(".contactCheckBox");

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
  const [selectedCheckBoxDelete, setSelectedCheckBoxDelete] = useState([]);
  const [isMultiDeleteButton, setIsMultiDeleteButton] = useState<boolean>(false);

  const deleteMultiple = () => {
    const checkall: any = document.getElementById("checkBoxAll");
    selectedCheckBoxDelete.forEach((element: any) => {
      dispatch(onDeleteContact(element.value));
      setTimeout(() => { toast.clearWaitingQueue(); }, 3000);
    });
    setIsMultiDeleteButton(false);
    checkall.checked = false;
  };

  const deleteCheckbox = () => {
    const ele: any = document.querySelectorAll(".contactCheckBox:checked");
    ele.length > 0 ? setIsMultiDeleteButton(true) : setIsMultiDeleteButton(false);
    setSelectedCheckBoxDelete(ele);
  };

  // Column
  const columns = useMemo(
    () => [
      {
        header: <input type="checkbox" className="form-check-input" id="checkBoxAll" onClick={() => checkedAll()} />,
        cell: (cell: any) => {
          return <input type="checkbox" className="contactCheckBox form-check-input" value={cell.getValue()} onChange={() => deleteCheckbox()} />;
        },
        id: '#',
        accessorKey: "id",
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
        accessorKey: "name",
        enableColumnFilter: false,
        cell: (cell: any) => (
          <>
            <div className="d-flex align-items-center">
              {/* <div className="flex-shrink-0">
                <img
                  src={cell.row.original.img}
                  alt=""
                  className="avatar-xs rounded-circle"
                />
              </div> */}
              <div className="flex-grow-1 ms-2 name">
                {cell.getValue()}
              </div>
            </div>
          </>
        ),
      },
      {
        header: "병원명",
        accessorKey: "company",
        enableColumnFilter: false,
      },
      {
        header: "연락처",
        accessorKey: "phone",
        enableColumnFilter: false,
      },
      {
        header: "주소",
        accessorKey: "email",
        enableColumnFilter: false,
      },
      {
        header: "상태",
        accessorKey: "status",
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
        accessorKey: "date",
        enableColumnFilter: false,
        cell: (cell: any) => (
          <>
            {handleValidDate(cell.getValue())}
          </>
        ),
      },
      {
        header: "검진항목",
        accessorKey: "score",
        enableColumnFilter: false,
      },
      {
        header: "특화검진",
        accessorKey: "tags",
        enableColumnFilter: false
      },
      {
        header: "수정",
        cell: (cellProps: any) => {
          return (
            <ul className="list-inline hstack gap-2 mb-0">
              <li className="list-inline-item edit" title="Edit">
                {/* <Link
                  to="#"
                  className="text-primary d-inline-block edit-item-btn"
                  onClick={() => handleEditCustomerClick(cellProps.row.original)}
                >
                  <i className="ri-pencil-fill fs-16"></i>
                </Link> */}
                <Link to="/edit-hospital-admin" className="text-primary d-inline-block edit-item-btn">
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
      // {
      //   header: "Last Contacted",
      //   accessorKey: "date",
      //   enableColumnFilter: false,
      //   cell: (cell: any) => (
      //     <>
      //       {handleValidDate(cell.getValue())},{" "}
      //       <small className="text-muted">{handleValidTime(cell.getValue())}</small>
      //     </>
      //   ),
      // },
     
      // {
      //   header: "Action",
      //   cell: (cellProps: any) => {
      //     return (
      //       <ul className="list-inline hstack gap-2 mb-0">
      //         <li className="list-inline-item">
      //           <UncontrolledDropdown>
      //             <DropdownToggle
      //               href="#"
      //               className="btn btn-soft-primary btn-sm dropdown"
      //               tag="button"
      //             >
      //               <i className="ri-more-fill align-middle"></i>
      //             </DropdownToggle>
      //             <DropdownMenu className="dropdown-menu-end">
      //               <DropdownItem className="dropdown-item" href="#"
      //                 onClick={() => { const contactData = cellProps.row.original; setInfo(contactData); }}
      //               >
      //                 <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
      //                 View
      //               </DropdownItem>
      //               <DropdownItem
      //                 className="dropdown-item edit-item-btn"
      //                 href="#"
      //                 onClick={() => { const contactData = cellProps.row.original; handleContactClick(contactData); }}
      //               >
      //                 <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
      //                 Edit
      //               </DropdownItem>
      //               <DropdownItem
      //                 className="dropdown-item remove-item-btn"
      //                 href="#"
      //                 onClick={() => { const contactData = cellProps.row.original; onClickDelete(contactData); }}
      //               >
      //                 <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
      //                 Delete
      //               </DropdownItem>
      //             </DropdownMenu>
      //           </UncontrolledDropdown>
      //         </li>
      //       </ul>
      //     );
      //   },
      // },
    ],
    [handleContactClick, checkedAll]
  );


  const [tag, setTag] = useState<any>();
  const [assignTag, setAssignTag] = useState<any>([]);

  const handlestag = (tags: any) => {
    setTag(tags);
    const assigned = tags.map((item: any) => item.value);
    setAssignTag(assigned);
  };

  const tags = [
    { label: "Exiting", value: "Exiting" },
    { label: "Lead", value: "Lead" },
    { label: "Long-term", value: "Long-term" },
    { label: "Partner", value: "Partner" }
  ];

  // Image Validation
  const [imgStore, setImgStore] = useState<any>();
  const [selectedImage, setSelectedImage] = useState<any>();

  const handleClick = (item: any) => {
    const newData = [...imgStore, item];
    setImgStore(newData);
    validation.setFieldValue('img', newData);
  };

  useEffect(() => {
    setImgStore((contact && contact.img) || []);
  }, [contact]);

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      validation.setFieldValue('img', e.target.result);
      setSelectedImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  // SideBar Contact Deatail
  const [info, setInfo] = useState<any>([]);

  // Export Modal
  const [isExportCSV, setIsExportCSV] = useState<boolean>(false);

  document.title = "Contacts | Healthcare - React Admin & Dashboard Template";
  return (
    <React.Fragment>
      <div className="page-content">
        <ExportCSVModal
          show={isExportCSV}
          onCloseClick={() => setIsExportCSV(false)}
          data={crmcontacts}
        />
        <DeleteModal
          show={deleteModal}
          onDeleteClick={handleDeleteContact}
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
          <BreadCrumb title="병원목록" pageTitle="병원관리" />
          <Row>
            <Col lg={12}>
              <Card >
                <CardHeader>
                  {/* <div className="d-flex align-items-center flex-wrap gap-2"> */}
                   
                    <Row>  <HospitalGlobalFilter/></Row>
                  
                    <Row className="g-4 align-items-center">
                    <div className="col-sm">
                      <div>
                        <h5 className="card-title mb-0">병원목록</h5>
                      </div>
                    </div>
                    <div className="col-sm-auto">
                      <div>
                        {isMultiDeleteButton && <button className="btn btn-soft-danger me-1"
                          onClick={() => setDeleteModalMulti(true)}
                        ><i className="ri-delete-bin-2-line"></i></button>}
                        <button
      type="button"
      className="btn btn-secondary add-btn me-1"
      id="create-btn"
      onClick={() => {
        setIsEdit(false);
        navigate("/add-hospital-admin"); // Bu yerda yangi sahifaga yo'naltirish manzilini ko'rsating
      }}
    >
      <i className="ri-add-line align-bottom me-1"></i> 병원 등록
    </button>
                        <button type="button" className="btn btn-success" onClick={() => setIsExportCSV(true)}>
                          <i className="ri-file-download-line align-bottom me-1"></i>{" "}
                          엑셀다운로드
                        </button>
                      </div>
                    </div>
                  </Row>
                  {/* </div> */}
                </CardHeader>
              </Card>
            </Col>
            <Col xxl={12}>
              
              <Card id="contactList">
              
                <CardBody className="pt-0">
               
                  <div>
                
                    {crmcontacts && crmcontacts.length > 0 ? (
                      <TableContainer
                        columns={columns}
                        data={(crmcontacts || [])}
                        // isGlobalFilter={true}
                        // customPageSize={8}
                        divClass="table-responsive table-card mb-3"
                        tableClass="align-middle table-nowrap"
                        theadClass="table-light"
                        isContactsFilter={true}
                      />
                    ) : (<Loader error={error} />)
                    }
                  </div>

                  <Modal id="showModal" isOpen={modal} toggle={toggle} centered>
                    <ModalHeader className="bg-primary-subtle p-3" toggle={toggle}>
                      {!!isEdit ? "Edit Contact" : "Add Contact"}
                    </ModalHeader>

                    <Form className="tablelist-form" onSubmit={(e) => {
                      e.preventDefault();
                      validation.handleSubmit();
                      return false;
                    }}>
                      <ModalBody>
                        <Input type="hidden" id="id-field" />
                        <Row className="g-3">
                          <Col lg={12}>
                            <div className="text-center">
                              <div className="position-relative d-inline-block">
                                <div className="position-absolute  bottom-0 end-0">
                                  <Label htmlFor="customer-image-input" className="mb-0">
                                    <div className="avatar-xs cursor-pointer">
                                      <div className="avatar-title bg-light border rounded-circle text-muted">
                                        <i className="ri-image-fill"></i>
                                      </div>
                                    </div>
                                  </Label>
                                  <Input className="form-control d-none" id="customer-image-input" type="file"
                                    accept="image/png, image/gif, image/jpeg" onChange={handleImageChange}
                                    invalid={
                                      validation.touched.img && validation.errors.img ? true : false
                                    }
                                  />
                                </div>
                                <div className="avatar-lg p-1" onClick={(item: any) => handleClick(item)}>
                                  <div className="avatar-title bg-light rounded-circle">
                                    <img src={selectedImage || validation.values.img || dummyImg} alt="dummyImg" id="customer-img" className="avatar-md rounded-circle object-fit-cover" />
                                  </div>
                                </div>
                              </div>
                              {validation.errors.img && validation.touched.img ? (
                                <FormFeedback type="invalid" className='d-block'> {validation.errors.img} </FormFeedback>
                              ) : null}
                            </div>

                            <div>
                              <Label
                                htmlFor="name-field"
                                className="form-label"
                              >
                                아이디
                              </Label>
                              <Input
                                name="name"
                                id="customername-field"
                                className="form-control"
                                placeholder="Enter Name"
                                type="text"
                                validate={{
                                  required: { value: true },
                                }}
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.name || ""}
                                invalid={
                                  validation.touched.name && validation.errors.name ? true : false
                                }
                              />
                              {validation.touched.name && validation.errors.name ? (
                                <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                              ) : null}

                            </div>
                          </Col>
                          <Col lg={12}>
                            <div>
                              <Label
                                htmlFor="company_name-field"
                                className="form-label"
                              >
                             병원명
                              </Label>
                              <Input
                                name="company_name"
                                id="company_name-field"
                                className="form-control"
                                placeholder="병원명"
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
                          </Col>

                          <Col lg={12}>
                            <div>
                              <Label
                                htmlFor="designation-field"
                                className="form-label"
                              >
                                Designation
                              </Label>

                              <Input
                                name="designation"
                                id="designation-field"
                                className="form-control"
                                placeholder="Enter Designation"
                                type="text"
                                validate={{
                                  required: { value: true },
                                }}
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.designation || ""}
                                invalid={
                                  validation.touched.designation && validation.errors.designation ? true : false
                                }
                              />
                              {validation.touched.designation && validation.errors.designation ? (
                                <FormFeedback type="invalid">{validation.errors.designation}</FormFeedback>
                              ) : null}
                            </div>
                          </Col>

                          <Col lg={12}>
                            <div>
                              <Label
                                htmlFor="emailid-field"
                                className="form-label"
                              >
                               주소
                              </Label>

                              <Input
                                name="주소"
                                id="emailid-field"
                                className="form-control"
                                placeholder="주소"
                                type="text"
                                validate={{
                                  required: { value: true },
                                }}
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
                          </Col>
                          <Col lg={6}>
                            <div>
                              <Label
                                htmlFor="phone-field"
                                className="form-label"
                              >
                                연락처
                              </Label>

                              <Input
                                name="phone"
                                id="phone-field"
                                className="form-control"
                                placeholder="Enter Phone No."
                                type="text"
                                validate={{
                                  required: { value: true },
                                }}
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
                          </Col>
                          <Col lg={6}>
                            <div>
                              <Label
                                htmlFor="score-field"
                                className="form-label"
                              >
                                Lead Score
                              </Label>

                              <Input
                                name="score"
                                id="score-field"
                                className="form-control"
                                placeholder="Enter Lead Score"
                                type="text"
                                validate={{
                                  required: { value: true },
                                }}
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.score || ""}
                                invalid={
                                  validation.touched.score && validation.errors.score ? true : false
                                }
                              />
                              {validation.touched.score && validation.errors.score ? (
                                <FormFeedback type="invalid">{validation.errors.score}</FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                          <Col lg={12}>
                            <div>
                              <Label
                                htmlFor="taginput-choices"
                                className="form-label font-size-13 text-muted"
                              >
                                Tags
                              </Label>
                              <Select
                                isMulti
                                value={tag}
                                onChange={(e: any) => {
                                  handlestag(e);
                                }}
                                className="mb-0"
                                options={tags}
                                id="taginput-choices"
                              >
                              </Select>

                              {validation.touched.tags &&
                                validation.errors.tags ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.tags}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                        </Row>
                      </ModalBody>
                      <ModalFooter>
                        <div className="hstack gap-2 justify-content-end">
                          <button type="button" className="btn btn-light" onClick={() => { setModal(false); }} > Close </button>
                          <button type="submit" className="btn btn-success" id="add-btn"> {!!isEdit ? "Update" : "Add Contact"} </button>
                        </div>
                      </ModalFooter>
                    </Form>
                  </Modal>
                  <ToastContainer closeButton={false} limit={1} />
                </CardBody>
              </Card>
            </Col>

            {/* <Col xxl={3}>
              <Card id="contact-view-detail">
                <CardBody className="text-center">
                  <div className="position-relative d-inline-block">
                    <img
                      src={info.img || avatar10}
                      // process.env.REACT_APP_API_URL + "/images/users/" + 
                      alt=""
                      className="avatar-lg rounded-circle img-thumbnail"
                    />
                    <span className="contact-active position-absolute rounded-circle bg-success">
                      <span className="visually-hidden"></span>
                    </span>
                  </div>
                  <h5 className="mt-4 mb-1">{info.name || "Tonya Noble"}</h5>
                  <p className="text-muted">{info.company || "Nesta Technologies"}</p>
           
                  <ul className="list-inline mb-0">
                    <li className="list-inline-item avatar-xs">
                      <Link
                        to="#"
                        className="avatar-title bg-success-subtle text-success fs-15 rounded"
                      >
                        <i className="ri-phone-line"></i>
                      </Link>
                    </li>
                    <li className="list-inline-item avatar-xs">
                      <Link
                        to="#"
                        className="avatar-title bg-danger-subtle text-danger fs-15 rounded"
                      >
                        <i className="ri-mail-line"></i>
                      </Link>
                    </li>
                    <li className="list-inline-item avatar-xs">
                      <Link
                        to="#"
                        className="avatar-title bg-warning-subtle text-warning fs-15 rounded"
                      >
                        <i className="ri-question-answer-line"></i>
                      </Link>
                    </li>
                  </ul>
                </CardBody>
                <CardBody>
                  <h6 className="text-muted text-uppercase fw-semibold mb-3">
                    Personal Information
                  </h6>
                  <p className="text-muted mb-4">
                    Hello, I'm {info.name || "Tonya Noble"}, The most effective objective is one
                    that is tailored to the job you are applying for. It states
                    what kind of career you are seeking, and what skills and
                    experiences.
                  </p>
                  <div className="table-responsive table-card">
                    <Table className="table table-borderless mb-0">
                      <tbody>
                        <tr>
                          <td className="fw-medium">
                            주소
                          </td>
                          <td>Lead Designer / Developer</td>
                        </tr>
                        <tr>
                          <td className="fw-medium">
                            아이디
                          </td>
                          <td>{info.email || "tonyanoble@velzon.com"}</td>
                        </tr>
                        <tr>
                          <td className="fw-medium">
                            연락처
                          </td>
                          <td>{info.phone || "414-453-5725"}</td>
                        </tr>
                        <tr>
                          <td className="fw-medium">
                            Lead Score
                          </td>
                          <td>{info.score || "154"}</td>
                        </tr>
                        <tr>
                          <td className="fw-medium">
                            상태
                          </td>
                          <td>
                            {(info.tags || ["Lead", "Partner"]).map((item: any, key: any) => (<span className="badge bg-primary-subtle text-primary me-1" key={key}>{item}</span>))}
                          </td>
                        </tr>
                        <tr>
                          <td className="fw-medium">
                            Last Contacted
                          </td>
                          <td>
                            {handleValidDate(info.date || "2021-04-13T18:30:00.000Z")}{" "}
                            <small className="text-muted">{handleValidTime(info.date || "2021-04-13T18:30:00.000Z")}</small>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col> */}
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default HospitalList;