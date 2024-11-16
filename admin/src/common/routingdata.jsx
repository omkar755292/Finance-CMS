
import ConsultancyOnboarding from "../component/consultancy/onBoarding";
import ConsultancyOnboardingNew from "../component/consultancy/onBoardingNew";
import UserList from "../component/userList/userList";
import ConsultancyUserList from "../component/consultancy/userList";
import ConsultancyServiceList from "../component/consultancy/ServiceList";
import ConsultancyAddNewService from "../component/consultancy/AddNewService";
import ConsultancyServiceListNotes from "../component/consultancy/ServiceListNotes";
import MyHome from "../component/Dashboard/dashboard";
import MyProfile from "../component/Profile/MyProfile";
import UserAddNewKYC from "../component/userList/addNewKYC";
import AdminList from "../component/adminList/userList";
import UserUpdateKYC from "../component/userList/UpdateKYC";
import AdminAddNewKYC from "../component/adminList/addNewKYC";
import AdminUpdateKYC from "../component/adminList/UpdateKYC";
import AssignRoll from "../component/adminList/asignRoll";
import SipOnboarding from "../component/SIP/onboarding";
import GstOnboarding from "../component/GST/onboarding";
import IncomeTaxOnboarding from "../component/IncomeTax/onboarding";
import InsuranceOnboarding from "../component/Insurance/onboarding";
import GstOnboardingNew from "../component/GST/onBoardingNew";
import IncomeTaxOnboardingNew from "../component/IncomeTax/onBoardingNew";
import InsuranceOnboardingNew from "../component/Insurance/onBoardingNew";
import SipOnboardingNew from "../component/SIP/onBoardingNew";
import SIPUserList from "../component/SIP/userList";
import GSTUserList from "../component/GST/userList";
import IncomeTaxUserList from "../component/IncomeTax/userList";
import InsuranceUserList from "../component/Insurance/userList";
import CompanyData from "../component/SIP/CompanyData";
import GstForm from "../component/GST/gstForm";
import IncomeTaxCalForm2324 from "../component/IncomeTax/incomeTaxCalForm2324";
import UpdateProduct from "../component/SIP/CompanyProducts";
import UpdateGstForm from "../component/GST/GstFormQuestionPack";
import UserGSTRegForm from "../component/GST/UserGSTRegForm";
import InsuranceForm from "../component/Insurance/InsuranceForm";
import NewSIPInvestment from "../component/SIP/NewSIPInvestment";
import InsuranceClaim from "../component/Insurance/InsuranceClaim";
import InsuranceClaimForm from "../component/Insurance/InsuranceClaimForm";
import InsuranceServiceList from "../component/Insurance/ServiceList";
import InsuranceSupportDocsData from "../component/Insurance/SupportDocsData";
import SIPServiceList from "../component/SIP/ServiceList";

//component path END

export const RouteData = [

    // {/* Dashboard content */}
    { path: `${ import.meta.env.BASE_URL }dashboard`, element: <MyHome />, title: '' },
    { path: `${ import.meta.env.BASE_URL }profile`, element: <MyProfile />, title: '' },

    // { path: `${ import.meta.env.BASE_URL }userDetails`, element: <UserList />, title: '' },

    // Todo: user list
    { path: `${ import.meta.env.BASE_URL }user-list`, element: <UserList />, title: '' },
    { path: `${ import.meta.env.BASE_URL }user-new-kyc`, element: <UserAddNewKYC />, title: '' },
    { path: `${ import.meta.env.BASE_URL }user-update-kyc/:userId`, element: <UserUpdateKYC />, title: '' },



    // Todo: Admin
    { path: `${ import.meta.env.BASE_URL }:category/admin-list`, element: <AdminList />, title: '' },
    { path: `${ import.meta.env.BASE_URL }admin-list`, element: <AdminList />, title: '' },
    { path: `${ import.meta.env.BASE_URL }admin-new-kyc`, element: <AdminAddNewKYC />, title: '' },
    { path: `${ import.meta.env.BASE_URL }admin-update-kyc/:userId`, element: <AdminUpdateKYC />, title: '' },
    { path: `${ import.meta.env.BASE_URL }admin-assign-roll/:userId`, element: <AssignRoll />, title: '' },



    // SIP
    { path: `${ import.meta.env.BASE_URL }sip/on-boarding`, element: <SipOnboarding />, title: '' },
    { path: `${ import.meta.env.BASE_URL }sip/on-boarding/add/:userId`, element: <SipOnboardingNew />, title: '' },
    { path: `${ import.meta.env.BASE_URL }sip/user-list`, element: <SIPUserList />, title: '' },
    { path: `${ import.meta.env.BASE_URL }sip/user-sip-investment/:userId`, element: <SIPServiceList />, title: '' },
    { path: `${ import.meta.env.BASE_URL }sip/new-sip-investment/:userId`, element: <NewSIPInvestment />, title: '' },
    { path: `${ import.meta.env.BASE_URL }sip/company-data`, element: <CompanyData />, title: '' },
    { path: `${ import.meta.env.BASE_URL }sip/company-data/:sipCompanyId`, element: <UpdateProduct />, title: '' },





    // GST
    { path: `${ import.meta.env.BASE_URL }gst/on-boarding`, element: <GstOnboarding />, title: '' },
    { path: `${ import.meta.env.BASE_URL }gst/on-boarding/add/:userId`, element: <GstOnboardingNew />, title: '' },
    { path: `${ import.meta.env.BASE_URL }gst/user-list`, element: <GSTUserList />, title: '' },
    { path: `${ import.meta.env.BASE_URL }gst/gst-form`, element: <GstForm />, title: '' },
    { path: `${ import.meta.env.BASE_URL }gst/gst-form/:questionId`, element: <UpdateGstForm />, title: '' },
    { path: `${ import.meta.env.BASE_URL }gst/user/:userId/gst-reg-form`, element: <UserGSTRegForm />, title: '' },




    // Insurance
    { path: `${ import.meta.env.BASE_URL }insurance/on-boarding`, element: <InsuranceOnboarding />, title: '' },
    { path: `${ import.meta.env.BASE_URL }insurance/on-boarding/add/:userId`, element: <InsuranceOnboardingNew />, title: '' },
    { path: `${ import.meta.env.BASE_URL }insurance/user-list`, element: <InsuranceUserList />, title: '' },
    { path: `${ import.meta.env.BASE_URL }insurance/service-list/:userId`, element: <InsuranceServiceList /> },
    { path: `${ import.meta.env.BASE_URL }insurance/service/:userId/new-insurance`, element: <InsuranceForm />, title: '' },
    { path: `${ import.meta.env.BASE_URL }insurance/service/:userId/:serviceId/insurance-claim`, element: <InsuranceClaim />, title: '' },
    { path: `${ import.meta.env.BASE_URL }/insurance/service/:userId/:serviceId/new-claim`, element: <InsuranceClaimForm />, title: '' },
    { path: `${ import.meta.env.BASE_URL }/insurance/service/:userId/:serviceId/support-documents`, element: <InsuranceSupportDocsData />, title: '' },



    // Income Tax
    { path: `${ import.meta.env.BASE_URL }income-tax/on-boarding`, element: <IncomeTaxOnboarding />, title: '' },
    { path: `${ import.meta.env.BASE_URL }income-tax/on-boarding/add/:userId`, element: <IncomeTaxOnboardingNew />, title: '' },
    { path: `${ import.meta.env.BASE_URL }income-tax/user-list`, element: <IncomeTaxUserList />, title: '' },
    { path: `${ import.meta.env.BASE_URL }income-tax/23-24/:formId/:serviceId`, element: <IncomeTaxCalForm2324 />, title: '' },



    // Consultancy
    { path: `${ import.meta.env.BASE_URL }consultancy/on-boarding`, element: <ConsultancyOnboarding />, title: '' },
    { path: `${ import.meta.env.BASE_URL }consultancy/on-boarding/add/:userId`, element: <ConsultancyOnboardingNew />, title: '' },
    { path: `${ import.meta.env.BASE_URL }consultancy/user-list`, element: <ConsultancyUserList />, title: '' },
    { path: `${ import.meta.env.BASE_URL }consultancy/service-list/:userId`, element: <ConsultancyServiceList /> },
    { path: `${ import.meta.env.BASE_URL }consultancy/service/:userId/new-service`, element: <ConsultancyAddNewService /> },
    { path: `${ import.meta.env.BASE_URL }consultancy/service/:serviceId/:userId/notes`, element: <ConsultancyServiceListNotes /> },






]
