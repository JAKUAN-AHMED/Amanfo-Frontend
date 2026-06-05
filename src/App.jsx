import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RequireAuth, { RequireRole } from './components/RequireAuth';
import Landing from './pages/Landing';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import VerifyOtp from './pages/VerifyOtp';
import ResetPassword from './pages/ResetPassword';
import ResetSuccess from './pages/ResetSuccess';
import RequestMembership from './pages/RequestMembership';
import RequestSuccess from './pages/RequestSuccess';
import AdminLayout from './layouts/AdminLayout';
import SeniorLayout from './layouts/SeniorLayout';
import AdminDashboard from './pages/admin/Dashboard';
import AdminSeniors from './pages/admin/Seniors';
import AdminAnnouncement from './pages/admin/Announcement';
import AdminCreateUpdate from './pages/admin/CreateUpdate';
import AdminAnnouncementForm from './pages/admin/AnnouncementForm';
import AdminAddMember from './pages/admin/AddMember';
import AdminMemberDetail from './pages/admin/MemberDetail';
import AdminProfile from './pages/admin/Profile';
import AdminFaqs from './pages/admin/Faqs';
import AdminContributions from './pages/admin/Contributions';
import AdminLogin from './pages/admin/AdminLogin';
import AdminForgot from './pages/admin/AdminForgot';
import AdminOtp from './pages/admin/AdminOtp';
import AdminReset from './pages/admin/AdminReset';
import SeniorDashboard from './pages/senior/Dashboard';
import SeniorDirectory from './pages/senior/Directory';
import SeniorProfile from './pages/senior/Profile';
import SeniorAnnouncements from './pages/senior/Announcements';
import SeniorAnnouncementDetail from './pages/senior/AnnouncementDetail';
import SeniorContributions from './pages/senior/Contributions';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/reset-success" element={<ResetSuccess />} />
        <Route path="/request-membership" element={<RequestMembership />} />
        <Route path="/request-success" element={<RequestSuccess />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/forgot-password" element={<AdminForgot />} />
        <Route path="/admin/verify-otp" element={<AdminOtp />} />
        <Route path="/admin/reset-password" element={<AdminReset />} />

        <Route
          path="/admin"
          element={
            <RequireRole role="admin">
              <AdminLayout />
            </RequireRole>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="seniors" element={<AdminSeniors />} />
          <Route path="seniors/new" element={<AdminAddMember />} />
          <Route path="seniors/:id" element={<AdminMemberDetail />} />
          <Route path="seniors/:id/edit" element={<AdminAddMember mode="edit" />} />
          <Route path="announcement" element={<AdminAnnouncement />} />
          <Route path="announcement/new" element={<AdminAnnouncementForm />} />
          <Route path="announcement/create-update" element={<AdminCreateUpdate />} />
          <Route path="contributions" element={<AdminContributions />} />
          <Route path="faqs" element={<AdminFaqs />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>

        <Route
          path="/senior"
          element={
            <RequireAuth>
              <RequireRole role="senior">
                <SeniorLayout />
              </RequireRole>
            </RequireAuth>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<SeniorDashboard />} />
          <Route path="directory" element={<SeniorDirectory />} />
          <Route path="announcements" element={<SeniorAnnouncements />} />
          <Route path="announcements/:id" element={<SeniorAnnouncementDetail />} />
          <Route path="contributions" element={<SeniorContributions />} />
          <Route path="profile" element={<SeniorProfile />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
