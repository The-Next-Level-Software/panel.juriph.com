import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./Pages/Public/Home";
import BlogDetails from "./Pages/Public/BlogDetails";
import Blogs from "./Pages/Public/Blogs";
import "./index.css";

import SelectPage from "./Pages/Auth/SelectPage";
import Signin from "./Pages/Auth/Signin";
import SignUp from "./Pages/Auth/Signup";

import ClientWelcome from "./Pages/Auth/ClientsSteps/ClientWelcome";
import LawyerWelcome from "./Pages/Auth/LawyerSteps/LawyerWelcome";

import ClientStep1 from "./Pages/Auth/ClientsSteps/ClientStep1";
import ClientStep2 from "./Pages/Auth/ClientsSteps/ClientStep2";
import ClientStep3 from "./Pages/Auth/ClientsSteps/ClientStep3";
import ClientStep4 from "./Pages/Auth/ClientsSteps/ClientStep4";

import LawyerStep1 from "./Pages/Auth/LawyerSteps/LawyerStep1";
import LawyerStep2 from "./Pages/Auth/LawyerSteps/LawyerStep2";
import LawyerStep3 from "./Pages/Auth/LawyerSteps/LawyerStep3";
import LawyerStep4 from "./Pages/Auth/LawyerSteps/LawyerStep4";
import LawyerStep5 from "./Pages/Auth/LawyerSteps/LawyerStep5";

// CLIENT DASHBOARD
import ClientLayout from "./components/Client/Layout";
import ClientDashboard from "./Pages/Client/Dashboard";
import ClientActiveCases from "./Pages/Client/ActiveCases";
import ClientCaseDetail from "./Pages/Client/CaseDetails";
import HistoryAndFeedback from "./Pages/Client/HistoryAndFeedback.jsx";
import ClientMessages from "./Pages/Client/Messages";
import ClientPayments from "./Pages/Client/Payments";
import ClientBidsReceived from "./Pages/Client/BidsReceived";
import ClientPostACase from "./Pages/Client/PostACase";

import ClientSettingsLayout from "./components/Client/SettingLayout";
import ClientProfile from "./Pages/Client/Settings/Profile";
import ClientAccount from "./Pages/Client/Settings/Account";
import ClientNotification from "./Pages/Client/Settings/Notifications";
import ClientPaymentMethod from "./Pages/Client/Settings/PaymentMethod";
import ClientSecurity from "./Pages/Client/Settings/Security";

// LAWYER DASHBOARD
import LawyerLayout from "./components/Lawyer/Layout";
import LawyerDashboard from "./Pages/Lawyer/Dashboard";
import LawyerActiveCases from "./Pages/Lawyer/ActiveCases";
import LawyerActiveCasesDetail from "./Pages/Lawyer/ActiveCaseDetail";
import LawyerAvailableCases from "./Pages/Lawyer/AvailableCases";
import LawyerCaseDetail from "./Pages/Lawyer/CaseDetail";
import BidNow from "./Pages/Lawyer/BidNow";
import LawyerMessage from "./Pages/Lawyer/Message";
import LawyerPayments from "./Pages/Lawyer/Payments";
import LawyerMyBids from "./Pages/Lawyer/MyBids";
import Profile from "./Pages/Lawyer/Profile"
import LawyerSetting from "./components/Lawyer/SettingLayout";
import LawyerProfile from "./Pages/Lawyer/Settings/Profile";
import LawyerAccount from "./Pages/Lawyer/Settings/Account";
import LawyerNotification from "./Pages/Lawyer/Settings/Notifications";
import LawyerPaymentMethod from "./Pages/Lawyer/Settings/PaymentMethod";
import LawyerSecurity from "./Pages/Lawyer/Settings/Security";

// ✅ ADMIN DASHBOARD (IMPORTS MUST EXIST — adjust paths as per your project)
import Layout from "./components/Admin/Layout";
import Dashboard from "./Pages/Admin/Dashboard";
import BlogManagement from "./Pages/Admin/BlogManagement";
import CaseManagement from "./Pages/Admin/CaseManagement";
import UserManagement from "./Pages/Admin/UserManagement";
import DisputeResolution from "./Pages/Admin/DisputeResolution";
import FinancialOverview from "./Pages/Admin/FinancialOverview";

function App() {
  return (
    <Routes>
      {/* PUBLIC PAGES */}
      <Route path="/" element={<Home />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/blog-details" element={<BlogDetails />} />

      {/* AUTH PAGES */}
      <Route path="/select-page" element={<SelectPage />} />
      <Route path="/sign-in" element={<Signin />} />
      <Route path="/sign-up" element={<SignUp />} />

      {/* CLIENT FLOW */}
      <Route path="/client-welcome" element={<ClientWelcome />}>
        <Route index element={<Navigate to="client-step-1" replace />} />
        <Route path="client-step-1" element={<ClientStep1 />} />
        <Route path="client-step-2" element={<ClientStep2 />} />
        <Route path="client-step-3" element={<ClientStep3 />} />
        <Route path="client-step-4" element={<ClientStep4 />} />
      </Route>

      {/* LAWYER FLOW */}
      <Route path="/lawyer-welcome" element={<LawyerWelcome />}>
        <Route index element={<Navigate to="lawyer-step-1" replace />} />
        <Route path="lawyer-step-1" element={<LawyerStep1 />} />
        <Route path="lawyer-step-2" element={<LawyerStep2 />} />
        <Route path="lawyer-step-3" element={<LawyerStep3 />} />
        <Route path="lawyer-step-4" element={<LawyerStep4 />} />
        <Route path="lawyer-step-5" element={<LawyerStep5 />} />
      </Route>

      {/* CLIENT DASHBOARD */}
      <Route path="/client-dashboard" element={<ClientLayout />}>
        <Route index element={<ClientDashboard />} />
        <Route path="active-cases" element={<ClientActiveCases />} />
        <Route path="active-cases/details" element={<ClientCaseDetail />} />
        <Route
          path="history-and-feedback"
          element={<HistoryAndFeedback />}
        />
        <Route path="messages" element={<ClientMessages />} />
        <Route path="payments" element={<ClientPayments />} />
        <Route path="bids-received" element={<ClientBidsReceived />} />
        <Route path="post-a-case" element={<ClientPostACase />} />

        <Route path="settings" element={<ClientSettingsLayout />}>
          <Route index element={<Navigate to="profile" replace />} />
          <Route path="profile" element={<ClientProfile />} />
          <Route path="account" element={<ClientAccount />} />
          <Route path="notifications" element={<ClientNotification />} />
          <Route path="payment-method" element={<ClientPaymentMethod />} />
          <Route path="security" element={<ClientSecurity />} />
        </Route>
      </Route>

      {/* LAWYER DASHBOARD */}
      <Route path="/lawyer-dashboard" element={<LawyerLayout />}>
        <Route index element={<LawyerDashboard />} />

        <Route path="active-cases" element={<LawyerActiveCases />} />
        <Route
          path="active-cases/detail"
          element={<LawyerActiveCasesDetail />}
        />

        <Route path="available-cases" element={<LawyerAvailableCases />} />
        <Route path="available-cases/detail" element={<LawyerCaseDetail />} />
        <Route path="available-cases/detail/bid-now" element={<BidNow />} />

        <Route path="messages" element={<LawyerMessage />} />
        <Route path="payments" element={<LawyerPayments />} />
        <Route path="my-bids" element={<LawyerMyBids />} />
        <Route path="profile" element={<Profile />} />

        <Route path="settings" element={<LawyerSetting />}>
          <Route index element={<Navigate to="profile" replace />} />
          <Route path="profile" element={<LawyerProfile />} />
          <Route path="account" element={<LawyerAccount />} />
          <Route path="notifications" element={<LawyerNotification />} />
          <Route path="payment-method" element={<LawyerPaymentMethod />} />
          <Route path="security" element={<LawyerSecurity />} />
        </Route>
      </Route>

      {/* ✅ ADMIN DASHBOARD */}
      <Route path="/admin-dashboard" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="blog-management" element={<BlogManagement />} />
        <Route path="case-management" element={<CaseManagement />} />
        <Route path="user-management" element={<UserManagement />} />
        <Route path="dispute-resolution" element={<DisputeResolution />} />
        <Route path="financial-overview" element={<FinancialOverview />} />
      </Route>

      
    </Routes>
  );
}

export default App;
