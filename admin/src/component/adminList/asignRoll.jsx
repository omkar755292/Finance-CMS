
import React, { Fragment, useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PageHeader from '../../layout/layoutsection/pageHeader/pageHeader';
import axios from 'axios'
import { api } from "../../GlobalKey/GlobalKey";



const AssignRoll = () =>
{


    const { userId } = useParams();

    const paymentOptions = [
        { value: 'priority-0', label: 'Priority 0' },
        { value: 'priority-1', label: 'Priority 1' },
        { value: 'priority-2', label: 'Priority 2' },
        { value: 'priority-3', label: 'Priority 3' },
        { value: 'priority-4', label: 'Priority 4' },
        { value: 'priority-5', label: 'Priority 5' }
    ];

    const [ userDataRoll, setUserDataRoll ] = useState( '' );
    const [ adminDataRoll, setAdminDataRoll ] = useState( '' );
    const [ sipServiceRoll, setSipServiceRoll ] = useState( '' );
    const [ gstServiceRoll, setGstServiceRoll ] = useState( '' );
    const [ incomeServiceRoll, setIncomeServiceRoll ] = useState( '' );
    const [ insuranceServiceRoll, setInsuranceServiceRoll ] = useState( '' );
    const [ consultancyServiceRoll, setConsultancyServiceRoll ] = useState( '' );



    // const [ name, setName ] = useState( '' );
    // const [ email, setEmail ] = useState( '' );
    // const [ phoneNumber, setPhoneNumber ] = useState( '' );
    // const [ whatsappNumber, setWhatsappNumber ] = useState( '' );
    // const [ password, setPassword ] = useState( '' );
    // const [ address, setAddress ] = useState( '' );
    // const [ pinCode, setPinCode ] = useState( '' );
    // const [ city, setCity ] = useState( '' );
    // const [ state, setState ] = useState( '' );
    // const [ panNumber, setPanNumber ] = useState( '' );
    // const [ aadhaarNumber, setAadhaarNumber ] = useState( '' );
    // const [ fatherName, setFatherName ] = useState( '' );
    // const [ motherName, setMotherName ] = useState( '' );
    // const [ occupation, setOccupation ] = useState( '' );

    // const [ aadhaarPdf, setAadhaarPdf ] = useState( null );
    // const [ panPdf, setPanPdf ] = useState( null );
    // const [ profileImage, setProfileImage ] = useState( null );






    let navigate = useNavigate()
    const [ myToken, setMyToken ] = useState( '' )
    const [ myCompanyId, setMyCompanyId ] = useState( '' )


    useEffect( () =>
    {
        let getToken = localStorage.getItem( 'token' )
        let getCompanyId = localStorage.getItem( 'companyId' )

        if ( !getToken )
        {
            navigate( '/' )
        }
        setMyToken( getToken );
        setMyCompanyId( getCompanyId );


        axios
            .post( api + `/admin/admin-list/one-data`,
                {
                    companyId: getCompanyId,
                    userId
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + getToken

                    }
                }
            )
            .then( response =>
            {
                if ( response.data.status == 1 )
                {
                    const myData = response.data.data;

                    console.log( myData );
                    // setUsers( myData );

                    setUserDataRoll( myData.userDataRoll );
                    setAdminDataRoll( myData.adminDataRoll );
                    setSipServiceRoll( myData.sipServiceRoll );
                    setGstServiceRoll( myData.gstServiceRoll );
                    setIncomeServiceRoll( myData.incomeServiceRoll );
                    setInsuranceServiceRoll( myData.insuranceServiceRoll );
                    setConsultancyServiceRoll( myData.consultancyServiceRoll );
                    // setName( myData.name );
                    // setEmail( myData.email );
                    // setPhoneNumber( myData.phoneNumber );
                    // setWhatsappNumber( myData.whatsappNumber );
                    // setAddress( myData.address );
                    // setPinCode( myData.pinCode );
                    // setCity( myData.city );
                    // setState( myData.state );
                    // setPanNumber( myData.panNumber );
                    // setAadhaarNumber( myData.aadhaarNumber );
                    // setFatherName( myData.fatherName );
                    // setMotherName( myData.motherName );
                    // setOccupation( myData.occupation );
                    // setAadhaarPdf( myData.aadhaarPdf );
                    // setPanPdf( myData.panPdf );
                    // setProfileImage( myData.profileImage );
                } else
                {
                    alert( response.data.message );
                    navigate( '/' );

                }

            } )
            .catch( error =>
            {
                alert( error );
                console.log( error );
                if ( error.response.status == 403 || error.response.status == 401 )
                {
                    // Log out process and go to home page
                    localStorage.setItem( "token", null );
                    localStorage.removeItem( 'token' );
                    localStorage.clear();
                    navigate( '/' )
                } else
                {
                    alert( error )
                }
            } );
    }, [] );



    const handleSubmit = ( event, myCompanyId, userId ) =>
    {
        event.preventDefault();

        axios
            .post( api + `/admin/admin-list/update-roll`,
                {
                    companyId: myCompanyId,
                    userId,
                    userDataRoll,
                    adminDataRoll,
                    sipServiceRoll,
                    gstServiceRoll,
                    incomeServiceRoll,
                    insuranceServiceRoll,
                    consultancyServiceRoll
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + myToken
                    }
                }
            )
            .then( response =>
            {
                if ( response.data.status == 1 )
                {
                    // window reload
                    window.location.reload();

                } else
                {
                    alert( response.data.message );
                }

            } )
            .catch( error =>
            {
                alert( error );
                console.log( error );
                if ( error.response.status == 403 || error.response.status == 401 )
                {
                    // Log out process and go to home page
                    localStorage.setItem( "token", null );
                    localStorage.removeItem( 'token' );
                    localStorage.clear();
                    navigate( '/' )
                } else
                {
                    alert( error )
                }
            } );

    };

    return (
        <div>
            <PageHeader currentpage="Admin Roll" activepage="Admin" mainpage="Roll" />

            <div className="grid grid-cols-12 gap-x-6"></div>

            <div className="grid grid-cols-12 gap-x-6">
                <div className="col-span-12">

                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title"> Roll description </h5>
                        </div>
                        <div className="box-body">
                            <div className="hs-accordion-group" data-hs-accordion-always-open>


                                <div className="hs-accordion" id="hs-basic-always-open-heading-three">
                                    <button
                                        className="hs-accordion-toggle hs-accordion-active:text-primary hs-accordion-active:pb-3 pb-0 pt-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-primary dark:text-gray-200 dark:hover:text-white/80"
                                        aria-controls="hs-basic-always-open-collapse-three" type="button">
                                        <svg
                                            className="hs-accordion-active:hidden hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-white/70"
                                            width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2.62421 7.86L13.6242 7.85999" stroke="currentColor" strokeWidth={ 2 }
                                                strokeLinecap="round" />
                                            <path d="M8.12421 13.36V2.35999" stroke="currentColor" strokeWidth={ 2 }
                                                strokeLinecap="round" />
                                        </svg>
                                        <svg
                                            className="hs-accordion-active:block hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-white/70"
                                            width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2.62421 7.86L13.6242 7.85999" stroke="currentColor" strokeWidth={ 2 }
                                                strokeLinecap="round" />
                                        </svg>
                                        Priority #0
                                    </button>
                                    <div id="hs-basic-always-open-collapse-three"
                                        className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                                        aria-labelledby="hs-basic-always-open-heading-three">
                                        <p className="text-gray-800 dark:text-gray-200">
                                            Admin don't get any access using this roll of selected services.
                                        </p>
                                    </div>
                                </div>

                                <div className="hs-accordion" id="hs-basic-always-open-heading-two">
                                    <button
                                        className="hs-accordion-toggle hs-accordion-active:text-primary hs-accordion-active:pb-3 pb-0 pt-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-primary dark:text-gray-200 dark:hover:text-white/80"
                                        aria-controls="hs-basic-always-open-collapse-two" type="button">
                                        <svg
                                            className="hs-accordion-active:hidden hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-white/70"
                                            width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2.62421 7.86L13.6242 7.85999" stroke="currentColor" strokeWidth={ 2 }
                                                strokeLinecap="round" />
                                            <path d="M8.12421 13.36V2.35999" stroke="currentColor" strokeWidth={ 2 }
                                                strokeLinecap="round" />
                                        </svg>
                                        <svg
                                            className="hs-accordion-active:block hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-white/70"
                                            width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2.62421 7.86L13.6242 7.85999" stroke="currentColor" strokeWidth={ 2 }
                                                strokeLinecap="round" />
                                        </svg>
                                        Priority #1
                                    </button>
                                    <div id="hs-basic-always-open-collapse-two"
                                        className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                                        aria-labelledby="hs-basic-always-open-heading-two">
                                        <p className="text-gray-800 dark:text-gray-200">
                                            Admin get full access with delete data using this roll of selected services.
                                        </p>
                                    </div>
                                </div>

                                <div className="hs-accordion" id="hs-basic-always-open-heading-three">
                                    <button
                                        className="hs-accordion-toggle hs-accordion-active:text-primary hs-accordion-active:pb-3 pb-0 pt-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-primary dark:text-gray-200 dark:hover:text-white/80"
                                        aria-controls="hs-basic-always-open-collapse-three" type="button">
                                        <svg
                                            className="hs-accordion-active:hidden hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-white/70"
                                            width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2.62421 7.86L13.6242 7.85999" stroke="currentColor" strokeWidth={ 2 }
                                                strokeLinecap="round" />
                                            <path d="M8.12421 13.36V2.35999" stroke="currentColor" strokeWidth={ 2 }
                                                strokeLinecap="round" />
                                        </svg>
                                        <svg
                                            className="hs-accordion-active:block hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-white/70"
                                            width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2.62421 7.86L13.6242 7.85999" stroke="currentColor" strokeWidth={ 2 }
                                                strokeLinecap="round" />
                                        </svg>
                                        Priority #2
                                    </button>
                                    <div id="hs-basic-always-open-collapse-three"
                                        className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                                        aria-labelledby="hs-basic-always-open-heading-three">
                                        <p className="text-gray-800 dark:text-gray-200">
                                            Admin get add, update & view access using this roll of selected services.
                                        </p>
                                    </div>
                                </div>

                                <div className="hs-accordion" id="hs-basic-always-open-heading-three">
                                    <button
                                        className="hs-accordion-toggle hs-accordion-active:text-primary hs-accordion-active:pb-3 pb-0 pt-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-primary dark:text-gray-200 dark:hover:text-white/80"
                                        aria-controls="hs-basic-always-open-collapse-three" type="button">
                                        <svg
                                            className="hs-accordion-active:hidden hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-white/70"
                                            width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2.62421 7.86L13.6242 7.85999" stroke="currentColor" strokeWidth={ 2 }
                                                strokeLinecap="round" />
                                            <path d="M8.12421 13.36V2.35999" stroke="currentColor" strokeWidth={ 2 }
                                                strokeLinecap="round" />
                                        </svg>
                                        <svg
                                            className="hs-accordion-active:block hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-white/70"
                                            width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2.62421 7.86L13.6242 7.85999" stroke="currentColor" strokeWidth={ 2 }
                                                strokeLinecap="round" />
                                        </svg>
                                        Priority #3
                                    </button>
                                    <div id="hs-basic-always-open-collapse-three"
                                        className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                                        aria-labelledby="hs-basic-always-open-heading-three">
                                        <p className="text-gray-800 dark:text-gray-200">
                                            Admin get add & view access using this roll of selected services.
                                        </p>
                                    </div>
                                </div>

                                <div className="hs-accordion" id="hs-basic-always-open-heading-three">
                                    <button
                                        className="hs-accordion-toggle hs-accordion-active:text-primary hs-accordion-active:pb-3 pb-0 pt-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-primary dark:text-gray-200 dark:hover:text-white/80"
                                        aria-controls="hs-basic-always-open-collapse-three" type="button">
                                        <svg
                                            className="hs-accordion-active:hidden hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-white/70"
                                            width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2.62421 7.86L13.6242 7.85999" stroke="currentColor" strokeWidth={ 2 }
                                                strokeLinecap="round" />
                                            <path d="M8.12421 13.36V2.35999" stroke="currentColor" strokeWidth={ 2 }
                                                strokeLinecap="round" />
                                        </svg>
                                        <svg
                                            className="hs-accordion-active:block hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-white/70"
                                            width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2.62421 7.86L13.6242 7.85999" stroke="currentColor" strokeWidth={ 2 }
                                                strokeLinecap="round" />
                                        </svg>
                                        Priority #4
                                    </button>
                                    <div id="hs-basic-always-open-collapse-three"
                                        className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                                        aria-labelledby="hs-basic-always-open-heading-three">
                                        <p className="text-gray-800 dark:text-gray-200">
                                            Admin get update & view access using this roll of selected services.
                                        </p>
                                    </div>
                                </div>

                                <div className="hs-accordion" id="hs-basic-always-open-heading-three">
                                    <button
                                        className="hs-accordion-toggle hs-accordion-active:text-primary hs-accordion-active:pb-3 pb-0 pt-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-primary dark:text-gray-200 dark:hover:text-white/80"
                                        aria-controls="hs-basic-always-open-collapse-three" type="button">
                                        <svg
                                            className="hs-accordion-active:hidden hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-white/70"
                                            width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2.62421 7.86L13.6242 7.85999" stroke="currentColor" strokeWidth={ 2 }
                                                strokeLinecap="round" />
                                            <path d="M8.12421 13.36V2.35999" stroke="currentColor" strokeWidth={ 2 }
                                                strokeLinecap="round" />
                                        </svg>
                                        <svg
                                            className="hs-accordion-active:block hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-white/70"
                                            width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2.62421 7.86L13.6242 7.85999" stroke="currentColor" strokeWidth={ 2 }
                                                strokeLinecap="round" />
                                        </svg>
                                        Priority #5
                                    </button>
                                    <div id="hs-basic-always-open-collapse-three"
                                        className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                                        aria-labelledby="hs-basic-always-open-heading-three">
                                        <p className="text-gray-800 dark:text-gray-200">
                                            Admin get only view access using this roll of selected services.
                                        </p>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>


                    <div className="box">
                        <div className="box-body">
                            <form onSubmit={ ( event ) => handleSubmit( event, myCompanyId, userId ) }>
                                <div className="grid lg:grid-cols-2 gap-6 space-y-4 lg:space-y-0">

                                    <div className="space-y-2">
                                        <label className="ti-form-label mb-0">User Data Service</label>
                                        <select
                                            className="my-auto ti-form-select"
                                            value={ userDataRoll }
                                            onChange={ ( e ) =>

                                                setUserDataRoll( e.target.value ) }
                                            required
                                        >
                                            <option value="">Select Payment Type</option>
                                            { paymentOptions.map( ( option, index ) => (
                                                <option key={ index } value={ option.value }>{ option.label }</option>
                                            ) ) }
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="ti-form-label mb-0">Admin Data Service</label>
                                        <select
                                            className="my-auto ti-form-select"
                                            value={ adminDataRoll }
                                            onChange={ ( e ) =>

                                                setAdminDataRoll( e.target.value ) }
                                            required
                                        >
                                            <option value="">Select Payment Type</option>
                                            { paymentOptions.map( ( option, index ) => (
                                                <option key={ index } value={ option.value }>{ option.label }</option>
                                            ) ) }
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="ti-form-label mb-0">SIP Service</label>
                                        <select
                                            className="my-auto ti-form-select"
                                            value={ sipServiceRoll }
                                            onChange={ ( e ) =>

                                                setSipServiceRoll( e.target.value ) }
                                            required
                                        >
                                            <option value="">Select Payment Type</option>
                                            { paymentOptions.map( ( option, index ) => (
                                                <option key={ index } value={ option.value }>{ option.label }</option>
                                            ) ) }
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="ti-form-label mb-0">GST Service</label>
                                        <select
                                            className="my-auto ti-form-select"
                                            value={ gstServiceRoll }
                                            onChange={ ( e ) =>

                                                setGstServiceRoll( e.target.value ) }
                                            required
                                        >
                                            <option value="">Select Payment Type</option>
                                            { paymentOptions.map( ( option, index ) => (
                                                <option key={ index } value={ option.value }>{ option.label }</option>
                                            ) ) }
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="ti-form-label mb-0">Income Tax Service</label>
                                        <select
                                            className="my-auto ti-form-select"
                                            value={ incomeServiceRoll }
                                            onChange={ ( e ) =>
                                                setIncomeServiceRoll( e.target.value ) }
                                            required
                                        >
                                            <option value="">Select Payment Type</option>
                                            { paymentOptions.map( ( option, index ) => (
                                                <option key={ index } value={ option.value }>{ option.label }</option>
                                            ) ) }
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="ti-form-label mb-0">Insurance Service</label>
                                        <select
                                            className="my-auto ti-form-select"
                                            value={ insuranceServiceRoll }
                                            onChange={ ( e ) =>
                                                setInsuranceServiceRoll( e.target.value ) }
                                            required
                                        >
                                            <option value="">Select Payment Type</option>
                                            { paymentOptions.map( ( option, index ) => (
                                                <option key={ index } value={ option.value }>{ option.label }</option>
                                            ) ) }
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="ti-form-label mb-0">consultancy Service</label>
                                        <select
                                            className="my-auto ti-form-select"
                                            value={ consultancyServiceRoll }
                                            onChange={ ( e ) =>

                                                setConsultancyServiceRoll( e.target.value ) }
                                            required
                                        >
                                            <option value="">Select Payment Type</option>
                                            { paymentOptions.map( ( option, index ) => (
                                                <option key={ index } value={ option.value }>{ option.label }</option>
                                            ) ) }
                                        </select>
                                    </div>




                                </div>

                                <button type="submit" className="ti-btn ti-btn-primary">Submit</button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AssignRoll;
