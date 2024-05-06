import React from "react";
import { Navigate } from "react-router-dom";

// Project
import ProjectList from "../pagehealth/Preferences/ExaminationItems/ProjectList";
import ProjectOverview from "../pagehealth/Preferences/TermsConditions/ProjectOverview";
import CreateProject from "../pagehealth/CustomerService/FAQ/CreateProject";

//Crm Pages
import CrmLeads from "../pagehealth/PaymendManagement/PaymentList/CrmLeads/index";

// Support Tickets
import TicketsDetails from '../pagehealth/PaymendManagement/PaymentRefund/TicketsDetails';

// //Ecommerce Pages
import EcommerceProducts from "../pagehealth/CustomerService/Announcement/EcommerceProducts/index";

import EcommerceAddProduct from "../pagehealth/CustomerService/Announcement/EcommerceProducts/EcommerceAddProduct";
import EcommerceOrders from "../pagehealth/CustomerService/Partnership/EcommerceOrders/index";
import EcommerceOrderDetail from "../pagehealth/CustomerService/Partnership/EcommerceOrders/EcommerceOrderDetail";
import EcommerceCustomers from "../pagehealth/AccessStatistics/AnnualAccess/EcommerceCustomers/index";
import EcommerceSellers from "../pagehealth/PopupManagement/EcommerceSellers/index";
import EcommerceSellerDetail from "../pagehealth/PopupManagement/EcommerceSellers/EcommerceSellerDetail";

// NFT Marketplace Pages
import Ranking from "../pagehealth/Notification/Ranking";


// Base Ui
import UiAlerts from "../pages/BaseUi/UiAlerts/UiAlerts";
import UiBadges from "../pages/BaseUi/UiBadges/UiBadges";
import UiButtons from "../pages/BaseUi/UiButtons/UiButtons";
import UiColors from "../pages/BaseUi/UiColors/UiColors";
import UiCards from "../pages/BaseUi/UiCards/UiCards";
import UiDropdowns from "../pages/BaseUi/UiDropdowns/UiDropdowns";
import UiGrid from "../pages/BaseUi/UiGrid/UiGrid";
import UiImages from "../pages/BaseUi/UiImages/UiImages";
import UiTabs from "../pages/BaseUi/UiTabs/UiTabs";
import UiAccordions from "../pages/BaseUi/UiAccordion&Collapse/UiAccordion&Collapse";
import UiProgress from "../pages/BaseUi/UiProgress/UiProgress";
import UiNotifications from "../pages/BaseUi/UiNotifications/UiNotifications";
import UiTypography from "../pages/BaseUi/UiTypography/UiTypography";
import UiList from "../pages/BaseUi/UiLists/UiLists";
import UiGeneral from "../pages/BaseUi/UiGeneral/UiGeneral";
import UiRibbons from "../pages/BaseUi/UiRibbons/UiRibbons";
import UiUtilities from "../pages/BaseUi/UiUtilities/UiUtilities";

// Advance Ui
import UiScrollbar from "../pages/AdvanceUi/UiScrollbar/UiScrollbar";
import UiAnimation from "../pages/AdvanceUi/UiAnimation/UiAnimation";
import UiSwiperSlider from "../pages/AdvanceUi/UiSwiperSlider/UiSwiperSlider";
import UiRatings from "../pages/AdvanceUi/UiRatings/UiRatings";
import UiHighlight from "../pages/AdvanceUi/UiHighlight/UiHighlight";


//AuthenticationInner pages
import BasicSignIn from '../pages/AuthenticationInner/Login/BasicSignIn';
import CoverSignIn from '../pages/AuthenticationInner/Login/CoverSignIn';
import BasicSignUp from '../pages/AuthenticationInner/Register/BasicSignUp';
import CoverSignUp from "../pages/AuthenticationInner/Register/CoverSignUp";
import BasicPasswReset from '../pages/AuthenticationInner/PasswordReset/BasicPasswReset';
import CoverPasswReset from '../pages/AuthenticationInner/PasswordReset/CoverPasswReset';
import BasicLockScreen from '../pages/AuthenticationInner/LockScreen/BasicLockScr';
import CoverLockScreen from '../pages/AuthenticationInner/LockScreen/CoverLockScr';
import BasicLogout from '../pages/AuthenticationInner/Logout/BasicLogout';
import CoverLogout from '../pages/AuthenticationInner/Logout/CoverLogout';
import BasicSuccessMsg from '../pages/AuthenticationInner/SuccessMessage/BasicSuccessMsg';
import CoverSuccessMsg from '../pages/AuthenticationInner/SuccessMessage/CoverSuccessMsg';
import BasicTwosVerify from '../pages/AuthenticationInner/TwoStepVerification/BasicTwosVerify';
import CoverTwosVerify from '../pages/AuthenticationInner/TwoStepVerification/CoverTwosVerify';
import Basic404 from '../pages/AuthenticationInner/Errors/Basic404';
import Cover404 from '../pages/AuthenticationInner/Errors/Cover404';
import Alt404 from '../pages/AuthenticationInner/Errors/Alt404';
import Error500 from '../pages/AuthenticationInner/Errors/Error500';
import BasicPasswCreate from "../pages/AuthenticationInner/PasswordCreate/BasicPasswCreate";
import CoverPasswCreate from "../pages/AuthenticationInner/PasswordCreate/CoverPasswCreate";
import Offlinepage from "../pages/AuthenticationInner/Errors/Offlinepage";

//login
import Login from "../pages/Authentication/Login";
import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ApiKey from '../pages/APIKey/index'

// User Profile
import UserProfile from "../pages/Authentication/user-profile";
import ToDoList from "../pages/ToDo";
import UiLink from "../pages/BaseUi/UiLinks/UiLinks";


// Membership Management
import MemberList from "pagehealth/MembershipManagement/MemberList";
import MemberWithdrawal from "../pagehealth/MembershipManagement/MemberWithdrawal/index";

// Hospital Management
import HospitalList from "pagehealth/HospitalManagement/HospitalList";
import CheckupProgram from "pagehealth/HospitalManagement/CheckupProgram";

// Affiliates management
import AffiliatesList from "pagehealth/AffiliateManagement/AffilatesList";

// Reservation management
import ReservationList from "pagehealth/ReservationManagement/ReservationList";
import AddCustomerPage from "Components/AddCustomer/AddCustomer";
import EditCustomer from "Components/EditCustomer/EditCustomer";
import MemberViewDetails from "Components/CustomerViewDetails";
import WithdrawalViewDetails from "Components/CustomerWithdrawalView";
import AddHospitalAdmin from "Components/AddHospitalAdmin";
import EditHospitalAdmin from "Components/EditHospitalAdmin";
import HospitalViewDetails from "Components/HospitalViewDetails";
import AddAffilates from "Components/AddAffilates";
import EditAffilates from "Components/EditAffilates";
import EditCheckup from "Components/EditCheckupProgram";
import AddCheckup from "Components/AddCheckupProgram";

const authProtectedRoutes = [

  { path: "/apps-ecommerce-products", component: <EcommerceProducts /> },
  { path: "/apps-ecommerce-add-product", component: <EcommerceAddProduct /> },
  { path: "/apps-ecommerce-orders", component: <EcommerceOrders /> },
  { path: "/apps-ecommerce-order-details", component: <EcommerceOrderDetail /> },
  { path: "/apps-ecommerce-customers", component: <EcommerceCustomers /> },
  { path: "/apps-ecommerce-sellers", component: <EcommerceSellers /> },
  { path: "/apps-ecommerce-seller-details", component: <EcommerceSellerDetail /> },
  { path: "/apps-todo", component: <ToDoList /> },

  // Member Management
  { path: "/apps-member-list", component: <MemberList /> },
  { path: "/add-customer", component: <AddCustomerPage /> },
  { path: "/edit-customer", component: <EditCustomer /> },
  { path: "/view-details", component: <MemberViewDetails /> },

  { path: "/apps-member-withdrawal", component: <MemberWithdrawal /> },
  { path: "/view-withdrawal-details", component: <WithdrawalViewDetails /> },

  // Hospital Management
  { path: "/apps-hospital-list", component: <HospitalList /> },
  { path: "/add-hospital-admin", component: <AddHospitalAdmin /> },
  { path: "/edit-hospital-admin", component: <EditHospitalAdmin /> },
  { path: "/hospital-view-details", component: <HospitalViewDetails /> },


  { path: "/apps-checkup-program", component: <CheckupProgram /> },
  { path: "/add-checkup-program", component: <AddCheckup /> },
  { path: "/edit-checkup-program", component: <EditCheckup /> },

  // Affiliate management
  { path: "/apps-affiliates-list", component: <AffiliatesList /> },
  { path: "/add-affiliates", component: <AddAffilates /> },
  { path: "/edit-affiliates", component: <EditAffilates /> },


  // Reservation management
  { path: "/apps-reservation-list", component: <ReservationList /> },

  //Projects
  { path: "/apps-projects-list", component: <ProjectList /> },
  { path: "/apps-projects-overview", component: <ProjectOverview /> },
  { path: "/apps-projects-create", component: <CreateProject /> },

  //Supports Tickets
  { path: "/apps-crm-leads", component: <CrmLeads /> },
  { path: "/apps-tickets-details", component: <TicketsDetails /> },

  // NFT Marketplace
  { path: "/apps-nft-ranking", component: <Ranking /> },

  // Base Ui
  { path: "/ui-alerts", component: <UiAlerts /> },
  { path: "/ui-badges", component: <UiBadges /> },
  { path: "/ui-buttons", component: <UiButtons /> },
  { path: "/ui-colors", component: <UiColors /> },
  { path: "/ui-cards", component: <UiCards /> },
  { path: "/ui-dropdowns", component: <UiDropdowns /> },
  { path: "/ui-grid", component: <UiGrid /> },
  { path: "/ui-images", component: <UiImages /> },
  { path: "/ui-tabs", component: <UiTabs /> },
  { path: "/ui-accordions", component: <UiAccordions /> },
  { path: "/ui-progress", component: <UiProgress /> },
  { path: "/ui-notifications", component: <UiNotifications /> },
  { path: "/ui-typography", component: <UiTypography /> },
  { path: "/ui-lists", component: <UiList /> },
  { path: "/ui-links", component: <UiLink /> },
  { path: "/ui-general", component: <UiGeneral /> },
  { path: "/ui-ribbons", component: <UiRibbons /> },
  { path: "/ui-utilities", component: <UiUtilities /> },

  // Advance Ui
  { path: "/advance-ui-scrollbar", component: <UiScrollbar /> },
  { path: "/advance-ui-animation", component: <UiAnimation /> },
  { path: "/advance-ui-swiper", component: <UiSwiperSlider /> },
  { path: "/advance-ui-ratings", component: <UiRatings /> },
  { path: "/advance-ui-highlight", component: <UiHighlight /> },

  //APIkey
  { path: "/apps-api-key", component: <ApiKey /> },

  //User Profile
  { path: "/profile", component: <UserProfile /> },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: <Navigate to="/apps-member-list" />,
  },
  { path: "*", component: <Navigate to="/apps-member-list" /> },
];

const publicRoutes = [
  // Authentication Page
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPasswordPage /> },
  { path: "/register", component: <Register /> },

  //AuthenticationInner pages
  { path: "/auth-signin-basic", component: <BasicSignIn /> },
  { path: "/auth-signin-cover", component: <CoverSignIn /> },
  { path: "/auth-signup-basic", component: <BasicSignUp /> },
  { path: "/auth-signup-cover", component: <CoverSignUp /> },
  { path: "/auth-pass-reset-basic", component: <BasicPasswReset /> },
  { path: "/auth-pass-reset-cover", component: <CoverPasswReset /> },
  { path: "/auth-lockscreen-basic", component: <BasicLockScreen /> },
  { path: "/auth-lockscreen-cover", component: <CoverLockScreen /> },
  { path: "/auth-logout-basic", component: <BasicLogout /> },
  { path: "/auth-logout-cover", component: <CoverLogout /> },
  { path: "/auth-success-msg-basic", component: <BasicSuccessMsg /> },
  { path: "/auth-success-msg-cover", component: <CoverSuccessMsg /> },
  { path: "/auth-twostep-basic", component: <BasicTwosVerify /> },
  { path: "/auth-twostep-cover", component: <CoverTwosVerify /> },
  { path: "/auth-404-basic", component: <Basic404 /> },
  { path: "/auth-404-cover", component: <Cover404 /> },
  { path: "/auth-404-alt", component: <Alt404 /> },
  { path: "/auth-500", component: <Error500 /> },


  { path: "/auth-pass-change-basic", component: <BasicPasswCreate /> },
  { path: "/auth-pass-change-cover", component: <CoverPasswCreate /> },
  { path: "/auth-offline", component: <Offlinepage /> },

];

export { authProtectedRoutes, publicRoutes };