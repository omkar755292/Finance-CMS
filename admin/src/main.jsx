import React, { Fragment } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.scss";
import { RouteData } from "./common/routingData";
import { HelmetProvider } from 'react-helmet-async';

import App from "./layout/App";



import Error404 from "./component/errorpage/Error404/error404";

import Firebaselayout from "./layout/firebase/firebaselayout";

import ScrollToTop from "./ScrollToTop/ScrolltoTop";
import SignInCover1 from "./component/Authentication/signincover1";
import Firebaselogin from "./layout/firebase/firebaselogin";
import MyHome from "./component/Dashboard/dashboard";
import IncomeTaxCalForm2324 from "./component/IncomeTax/incomeTaxCalForm2324";
import AppForm from "./layout/AppForm";
import UserGSTFormFillUpPublic from "./component/GST/UserGSTFormFillUpPublic";
import IncomeTaxCalForm2324Public from "./component/IncomeTax/incomeTaxCalForm2324Publiv";

const helmetContext = {};

ReactDOM.createRoot( document.getElementById( "root" ) ).render(
	<Fragment>
		<HelmetProvider context={ helmetContext }>
			<BrowserRouter>
				<ScrollToTop />
				<Routes>

					<Route path={ `${ import.meta.env.BASE_URL }` } element={ <Firebaselayout /> }>
						<Route index element={ <Firebaselogin /> } />
						<Route path={ `${ import.meta.env.BASE_URL }login` } element={ <Firebaselogin /> } />
						{/* <Route path={ `${ import.meta.env.BASE_URL }firebase/firebaseregister` } element={ <Firebaseregister /> } /> */ }
					</Route>

					{ RouteData.map( ( idx ) => (
						<Fragment key={ Math.random() }>
							{/* //Main page */ }
							<Route path={ `${ import.meta.env.BASE_URL }` } element={ <App /> }>
								<Route index element={ <MyHome /> } />
								<Route exact path={ idx.path } element={ idx.element } />

							</Route>


						</Fragment>
					) ) }

					<Fragment key={ Math.random() }>
						{/* //Main page */ }
						<Route path={ `${ import.meta.env.BASE_URL }` } element={ <AppForm /> }>
							<Route path={ `${ import.meta.env.BASE_URL }income-tax-filling-yr-23-24/:formPassword/:formId/:serviceId` } element={ <IncomeTaxCalForm2324Public /> } />
							<Route path={ `${ import.meta.env.BASE_URL }gst-reg/:formPassword/:formId/:serviceId` } element={ <UserGSTFormFillUpPublic /> } />


						</Route>
					</Fragment>

					<Route path="*" element={ <Error404 /> } />

				</Routes>
			</BrowserRouter>
		</HelmetProvider>
	</Fragment>,
);
