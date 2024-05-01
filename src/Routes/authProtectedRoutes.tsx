import React from "react";
import { Navigate } from "react-router-dom";

import ProjectList from "../pagehealth/Preferences/ExaminationItems/ProjectList";
import ProjectOverview from "../pagehealth/Preferences/TermsConditions/ProjectOverview";
import CreateProject from "../pagehealth/CustomerService/FAQ/CreateProject";

import CrmLeads from "../pagehealth/PaymendManagement/PaymentList/CrmLeads/index";

import TicketsDetails from '../pagehealth/PaymendManagement/PaymentRefund/TicketsDetails';
import EcommerceProducts from "../pagehealth/CustomerService/Announcement/EcommerceProducts/index";
import EcommerceAddProduct from "../pagehealth/CustomerService/Announcement/EcommerceProducts/EcommerceAddProduct";
import EcommerceOrders from "../pagehealth/CustomerService/Partnership/EcommerceOrders/index";
import EcommerceOrderDetail from "../pagehealth/CustomerService/Partnership/EcommerceOrders/EcommerceOrderDetail";
import EcommerceCustomers from "../pagehealth/AccessStatistics/AnnualAccess/EcommerceCustomers/index";

import EcommerceSellers from "../pagehealth/PopupManagement/EcommerceSellers/index";
import EcommerceSellerDetail from "../pagehealth/PopupManagement/EcommerceSellers/EcommerceSellerDetail";

import Ranking from "../pagehealth/Notification/Ranking";
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
import UiScrollbar from "../pages/AdvanceUi/UiScrollbar/UiScrollbar";
import UiAnimation from "../pages/AdvanceUi/UiAnimation/UiAnimation";
import UiSwiperSlider from "../pages/AdvanceUi/UiSwiperSlider/UiSwiperSlider";
import UiRatings from "../pages/AdvanceUi/UiRatings/UiRatings";
import UiHighlight from "../pages/AdvanceUi/UiHighlight/UiHighlight";


import ApiKey from '../pages/APIKey/index';

import UserProfile from "../pages/Authentication/user-profile";

import ToDoList from "../pages/ToDo";
import UiLink from "../pages/BaseUi/UiLinks/UiLinks";


import MemberList from "pagehealth/MembershipManagement/MemberList";
import MemberWithdrawal from "pagehealth/MembershipManagement/MemberWithdrawal";
import HospitalList from "pagehealth/HospitalManagement/HospitalList"
import CheckupProgram from "pagehealth/HospitalManagement/CheckupProgram";
import AffiliatesList from "pagehealth/AffiliateManagement/AffilatesList";
import ReservationList from "pagehealth/ReservationManagement/ReservationList";


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
  { path: "/apps-member-withdrawal", component: <MemberWithdrawal/> },

  // Hospital Management
  { path: "/apps-hospital-list", component: <HospitalList /> },
  { path: "/apps-checkup-program", component: <CheckupProgram /> },

  // Affiliate management
  { path: "/apps-affiliates-list", component: <AffiliatesList /> },

  
  // Reservation management
  { path: "/apps-reservation-list", component: <ReservationList/>},


  //Projects
  { path: "/apps-projects-list", component: <ProjectList /> },
  { path: "/apps-projects-overview", component: <ProjectOverview /> },
  { path: "/apps-projects-create", component: <CreateProject /> },


  //Supports Tickets
  { path: "/apps-crm-leads", component: <CrmLeads /> },
  { path: "/apps-tickets-details", component: <TicketsDetails /> },


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
    component: <Navigate to="/dashboard" />,
  },
  { path: "*", component: <Navigate to="/dashboard" /> },
];
