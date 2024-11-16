import React, { Fragment, useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PageHeader from '../../layout/layoutsection/pageHeader/pageHeader'
import Select from 'react-dropdown-select'
import ReactDatePicker from 'react-datepicker'
import axios from 'axios'
import { api } from '../../GlobalKey/GlobalKey'

const InsuranceForm = () =>
{
    const { userId } = useParams();


    const navigate = useNavigate();


    const [ insuranceName, setInsuranceName ] = useState( '' );
    const [ name, setName ] = useState( '' );
    const [ email, setEmail ] = useState( '' );
    const [ phoneNumber, setPhoneNumber ] = useState( '' );
    const [ whatsappNumber, setWhatsappNumber ] = useState( '' );
    const [ address, setAddress ] = useState( '' );
    const [ pinCode, setPinCode ] = useState( '' );
    const [ city, setCity ] = useState( '' );
    const [ state, setState ] = useState( '' );
    const [ panNumber, setPanNumber ] = useState( '' );
    const [ aadhaarNumber, setAadhaarNumber ] = useState( '' );
    const [ fatherName, setFatherName ] = useState( '' );
    const [ motherName, setMotherName ] = useState( '' );
    const [ occupation, setOccupation ] = useState( '' );



    const [ myToken, setMyToken ] = useState( '' )
    const [ myCompanyId, setMyCompanyId ] = useState( '' )


    const [ healthData, setHealthData ] = useState( {
        insuranceType: 'health-insurance',
        planType: 'Basic Plan',
        gender: '',
        familyMembers: {
            self: false,
            spouse: false,
            son: false,
            daughter: false,
            father: false,
            mother: false
        },
        sumInsured: '',
        pinCode: '',
    } );

    const [ vehicleData, setVehicleData ] = useState( {
        insuranceType: 'vehicle-insurance',
        purpose: '',
        vehicleType: '',
        caseType: '',
        policyType: '',
        fuelType: '',
        registerNumber: '',
        makeModel: '',
        variantName: '',
        rto: '',
        registrationDate: null,
        manufacturingDate: null,
        rcCopy: null,
        registrationCopy: null,
        addOns: {
            ZeroDepreciationCover: false,
            CostOfConsumption: false,
            EngineGearBoxCover: false,
            NCBProtection: false,
            RoadsideAssistance: false,
            InvoiceCover: false,
            WindShieldCover: false,
            EmergencyAssistanceCover: false,
            MedicalExpensesCover: false,
            AmbulanceChargesCover: false,
            HydrostaticLockCover: false,
            HospitalCashCover: false,
            KeyReplacement: false,
            GeographicExtension: false,
            LossOfUseCover: false,
            LossOfPersonalBelonging: false,
            EmergencyTransportHotelExpenses: false,
            TyreSecure: false,
            PassengerAssistCover: false,
            IMT23Cover: false,
            GeographicExtension2: false,
            CleanerCover: false,
            ConductorCover: false,
            PACover: false,
        },
    } );


    const handleHealthSubmit = ( e ) =>
    {
        e.preventDefault();

        axios.post( api + '/admin/insurance/reg-insurance-form',
            {
                insuranceType: 'health-insurance',
                data: healthData,
                companyId: myCompanyId,
                insuranceName,
                userId
            },
            {
                headers: {
                    Authorization: 'Bearer ' + myToken

                }
            }
        ).then( response =>
        {
            if ( response.data.status == 1 )
            {
                const myData = response.data.data;
                console.log( myData );
                alert( 'Form Submited' );
                setHealthData( {
                    planType: 'Basic Plan',
                    gender: '',
                    familyMembers: {
                        self: false,
                        spouse: false,
                        son: false,
                        daughter: false,
                        father: false,
                        mother: false
                    },
                    sumInsured: '',
                    pinCode: '',
                    terms: false
                } )
            }
            else
            {
                alert( response.data.message );
            }

        } ).catch( error =>
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
            }
        } );


    }


    const handleVehicleSubmit = ( e ) =>
    {
        e.preventDefault();

        axios.post( api + '/admin/insurance/reg-insurance-form',
            {
                insuranceType: 'vehicle-insurance',
                data: vehicleData,
                companyId: myCompanyId,
                insuranceName,
                userId
            },
            {
                headers: {
                    Authorization: 'Bearer ' + myToken
                }
            }
        ).then( response =>
        {
            if ( response.data.status === 1 )
            {
                alert( 'Form Submitted' );
                console.log( response.data.data );
                setVehicleData( {
                    purpose: '',
                    vehicleType: '',
                    caseType: '',
                    policyType: '',
                    fuelType: '',
                    registerNumber: '',
                    makeModel: '',
                    variantName: '',
                    rto: '',
                    registrationDate: null,
                    manufacturingDate: null,
                    rcCopy: null,
                    registrationCopy: null,
                    addOns: {
                        ZeroDepreciationCover: false,
                        CostOfConsumption: false,
                        EngineGearBoxCover: false,
                        NCBProtection: false,
                        RoadsideAssistance: false,
                        InvoiceCover: false,
                        WindShieldCover: false,
                        EmergencyAssistanceCover: false,
                        MedicalExpensesCover: false,
                        AmbulanceChargesCover: false,
                        HydrostaticLockCover: false,
                        HospitalCashCover: false,
                        KeyReplacement: false,
                        GeographicExtension: false,
                        LossOfUseCover: false,
                        LossOfPersonalBelonging: false,
                        EmergencyTransportHotelExpenses: false,
                        TyreSecure: false,
                        PassengerAssistCover: false,
                        IMT23Cover: false,
                        GeographicExtension2: false,
                        CleanerCover: false,
                        ConductorCover: false,
                        PACover: false,
                    },
                } );
            } else
            {
                alert( response.data.message );
            }
        } ).catch( error =>
        {
            alert( error.message );
            console.log( error );
            if ( error.response.status === 403 || error.response.status === 401 )
            {
                localStorage.setItem( "token", null );
                localStorage.removeItem( 'token' );
                localStorage.clear();
                navigate( '/' );
            }
        } );
    }


    const [ activeForm, setActiveForm ] = useState( 'health' );


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
            .post( api + `/admin/user-list/one-data`,
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

                    setName( myData.name );
                    setEmail( myData.email );
                    setPhoneNumber( myData.phoneNumber );
                    setWhatsappNumber( myData.whatsappNumber );
                    setAddress( myData.address );
                    setPinCode( myData.pinCode );
                    setCity( myData.city );
                    setState( myData.state );
                    setPanNumber( myData.panNumber );
                    setAadhaarNumber( myData.aadhaarNumber );
                    setFatherName( myData.fatherName );
                    setMotherName( myData.motherName );
                    setOccupation( myData.occupation );

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


    const DefaultSelect = [
        { value: '100000', label: '1 Lac' },
        { value: '200000', label: '2 Lac' },
        { value: '300000', label: '3 Lac' },

    ]
    const PolicyTypeSelect = [
        { value: 'Comprehensive', label: 'Comprehensive' },
        { value: 'Own Damage', label: 'Own Damage' },
        { value: 'Third Party', label: 'Third Party' },

    ]
    const VehicalTypeSelect = [
        { value: 'Private', label: 'Private' },
        { value: 'PCV', label: 'PCV' },
        { value: 'GCV', label: 'GCV' },

    ]
    const CaseTypeSelect = [
        { value: 'Roll Over', label: 'Roll Over' },
        { value: 'New', label: 'NEW' },
        { value: 'Used', label: 'Used' },

    ]
    const FuelTypeSelect = [
        { value: 'Petrol', label: 'Petrol' },
        { value: 'Disel', label: 'Disel' },
        { value: 'Electric', label: 'Eletric' },

    ]

    return (
        <div> <PageHeader currentpage="User Data" activepage="Home" mainpage="User Data" />


            <div className="col-span-12">
                <div className="box">
                    <div className="box-header">
                        <h5 className="box-title">KYC Documents:</h5>
                    </div>

                    {/* <button onClick={ () => navigator.clipboard.writeText( publicLink ) }
                        style={ {
                            backgroundColor: '#007bff',
                            color: 'white',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            border: 'none',
                            cursor: 'pointer',
                            // marginRight: '10px',
                            margin: "10px"
                        } }
                    >
                        Copy public link: { publicLink }
                    </button> */}


                    <div className="box-body">
                        <p>
                            <b>Name: </b>{ name }
                        </p>
                        {/* <p>
                <b>DOB: </b>{ name }
              </p> */}
                        <p>
                            <b>Email Id: </b>{ email }
                        </p>
                        <p>
                            <b>Reg No: </b>{ userId }
                        </p>
                        <p>
                            <b>PAN No: </b>{ panNumber }
                        </p>
                        <p>
                            <b>Aadhaar No: </b>{ aadhaarNumber }
                        </p>
                    </div>
                </div>
            </div>


            <div className=' flex'>
                <div>
                    <button type="button"
                        onClick={ () => setActiveForm( 'health' ) }
                        className="py-3 px-4 ti-btn bg-primary text-white hover:bg-primary focus:ring-primary sm:p-5 dark:focus:ring-offset-white/10">
                        Health Insurance
                    </button>
                </div>
                <div>
                    <button type="button"
                        onClick={ () => setActiveForm( 'vehicle' ) }
                        className="py-3 px-4 ti-btn bg-primary text-white hover:bg-primary focus:ring-primary sm:p-5 dark:focus:ring-offset-white/10">
                        Vehicle Insurance
                    </button>
                </div>



            </div>

            <div className='py-1'></div>

            {/* Health Insurance Form Layout  */ }


            { activeForm === 'health' && (

                <div className="col-span-12">

                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title">Health Insurance</h5>
                        </div>
                        <div className="box-body">
                            <form onSubmit={ handleHealthSubmit } className="ti-validation">

                                <div className="box">
                                    <div className="box-body">
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Insurance Name</label>
                                            <input type="text" className="my-auto ti-form-input"
                                                value={ insuranceName }
                                                onChange={ ( e ) => setInsuranceName( e.target.value ) }
                                                placeholder="Insurance Name" required />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid lg:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <div className="box">
                                            <div className="box-header">
                                                <h5 className="box-title">Plan Type</h5>
                                            </div>
                                            <div className="box-body">
                                                <div className="space-y-2">
                                                    <div className="flex">
                                                        <input type="radio" name="planType" className="ti-form-radio" id="basic-plan"
                                                            value="basic"
                                                            checked={ healthData.planType === 'basic' }
                                                            onChange={ ( e ) => setHealthData( { ...healthData, planType: e.target.value } ) }
                                                        />
                                                        <label htmlFor="basic-plan" className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">Basic Plan</label>
                                                    </div>
                                                    <div className="flex">
                                                        <input type="radio" name="planType" className="ti-form-radio" id="super-top-up"
                                                            value="super top-up"
                                                            checked={ healthData.planType === 'super top-up' }
                                                            onChange={ ( e ) => setHealthData( { ...healthData, planType: e.target.value } ) }
                                                        />
                                                        <label htmlFor="super-top-up" className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">Super Top-up</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="box">
                                            <div className="box-header">
                                                <h5 className="box-title">Gender</h5>
                                            </div>
                                            <div className="box-body">
                                                <div className="space-y-2">
                                                    <div className="flex">
                                                        <input type="radio" name="gender" className="ti-form-radio" id="male"
                                                            value="Male"
                                                            checked={ healthData.gender === 'Male' }
                                                            onChange={ ( e ) => setHealthData( { ...healthData, gender: e.target.value } ) }
                                                        />
                                                        <label htmlFor="male" className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">Male</label>
                                                    </div>
                                                    <div className="flex">
                                                        <input type="radio" name="gender" className="ti-form-radio" id="female"
                                                            value="Female"
                                                            checked={ healthData.gender === 'Female' }
                                                            onChange={ ( e ) => setHealthData( { ...healthData, gender: e.target.value } ) }
                                                        />
                                                        <label htmlFor="female" className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">Female</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="box">
                                            <div className="box-header">
                                                <h5 className="box-title">Family Member</h5>
                                            </div>
                                            <div className="box-body">
                                                <div className="grid sm:grid-cols-2 gap-2">
                                                    { [ "self", "spouse", "son", "daughter", "father", "mother" ].map( member => (
                                                        <label key={ member } className="p-3 flex w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70">
                                                            <input type="checkbox" className="ti-form-checkbox mt-0.5"
                                                                value={ member }
                                                                checked={ healthData.familyMembers[ member ] }
                                                                onChange={ ( e ) => setHealthData( { ...healthData, familyMembers: { ...healthData.familyMembers, [ member ]: e.target.checked } } ) }
                                                            />
                                                            <span className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">{ member.charAt( 0 ).toUpperCase() + member.slice( 1 ) }</span>
                                                        </label>
                                                    ) ) }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="box">
                                            <div className="box-header">
                                                <h5 className="box-title">Sum Insured</h5>
                                            </div>
                                            <div className="box-body">
                                                <div className="space-y-2">
                                                    <Select classNamePrefix='react-select' className="rounded-full"
                                                        options={ DefaultSelect }
                                                        value={ DefaultSelect.find( option => option.value === healthData.sumInsured ) }
                                                        onChange={ ( option ) => setHealthData( { ...healthData, sumInsured: option.value } ) }
                                                        placeholder='Open this select menu' />
                                                </div>
                                            </div>
                                        </div>


                                        <div className="box">
                                            <div className="box-body">
                                                <div className="space-y-2">
                                                    <label className="ti-form-label mb-0">PIN Code</label>
                                                    <input type="text" className="my-auto ti-form-input"
                                                        value={ healthData.pinCode }
                                                        onChange={ ( e ) => setHealthData( { ...healthData, pinCode: e.target.value } ) }
                                                        placeholder="PIN Code" required />
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                                <div className="my-5">
                                    <input type="checkbox" className="ti-form-checkbox mt-0.5" id="terms-checkbox" required />
                                    <label htmlFor="terms-checkbox" className="text-sm text-gray-500 ltr:ml-3 rtl:mr-3 dark:text-white/70">I agree with the terms and conditions</label>
                                </div>
                                <button type="submit" className="ti-btn ti-btn-primary">Submit</button>
                            </form>

                        </div>
                    </div>
                </div >
            ) }


            {/* Vehicle Insurance Form Layout  */ }

            {
                activeForm === 'vehicle' && (

                    <div className="col-span-12">
                        <div className="box">
                            <div className="box-header">
                                <h5 className="box-title">Vehicle Insurance</h5>
                            </div>
                            <div className="box-body">

                                <form onSubmit={ handleVehicleSubmit } className="ti-validation">

                                    <div className="box">
                                        <div className="box-body">
                                            <div className="space-y-2">
                                                <label className="ti-form-label mb-0">Insurance Name</label>
                                                <input type="text" className="my-auto ti-form-input"
                                                    value={ insuranceName }
                                                    onChange={ ( e ) => setInsuranceName( e.target.value ) }
                                                    placeholder="Insurance Name" required />
                                            </div>
                                        </div>
                                    </div>


                                    <div className="grid lg:grid-cols-2 gap-4">


                                        <div className="box">
                                            <div className="box-header">
                                                <h5 className="box-title">Purpose</h5>
                                            </div>
                                            <div className="box-body">
                                                <div className="space-y-2">
                                                    <div className="flex">
                                                        <input
                                                            type="radio"
                                                            name="purpose"
                                                            className="ti-form-radio"
                                                            id="request-quote"
                                                            checked={ vehicleData.purpose === 'request-quote' }
                                                            onChange={ () => setVehicleData( { ...vehicleData, purpose: 'request-quote' } ) }
                                                        />
                                                        <label htmlFor="request-quote" className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">
                                                            Request offline Quote
                                                        </label>
                                                    </div>
                                                    <div className="flex">
                                                        <input
                                                            type="radio"
                                                            name="purpose"
                                                            className="ti-form-radio"
                                                            id="direct-policy"
                                                            checked={ vehicleData.purpose === 'direct-policy' }
                                                            onChange={ () => setVehicleData( { ...vehicleData, purpose: 'direct-policy' } ) }
                                                        />
                                                        <label htmlFor="direct-policy" className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">
                                                            Direct Policy Issuance
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="box">
                                            <div className="box-header">
                                                <h5 className="box-title">Vehicle Type</h5>
                                            </div>
                                            <div className="box-body">
                                                <div className="space-y-2">
                                                    <Select
                                                        classNamePrefix='react-select'
                                                        className="rounded-full"
                                                        options={ VehicalTypeSelect }
                                                        value={ VehicalTypeSelect.find( option => option.value === vehicleData.vehicleType ) }
                                                        onChange={ ( option ) => setVehicleData( { ...vehicleData, vehicleType: option.value } ) }
                                                        placeholder='Open this select menu'
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="box">
                                            <div className="box-header">
                                                <h5 className="box-title">Case Type</h5>
                                            </div>
                                            <div className="box-body">
                                                <div className="space-y-2">
                                                    <Select
                                                        classNamePrefix='react-select'
                                                        className="rounded-full"
                                                        options={ CaseTypeSelect }
                                                        value={ CaseTypeSelect.find( option => option.value === vehicleData.caseType ) }
                                                        onChange={ ( option ) => setVehicleData( { ...vehicleData, caseType: option.value } ) }
                                                        placeholder='Open this select menu'
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="box">
                                            <div className="box-header">
                                                <h5 className="box-title">Policy Type</h5>
                                            </div>
                                            <div className="box-body">
                                                <div className="space-y-2">
                                                    <Select
                                                        classNamePrefix='react-select'
                                                        className="rounded-full"
                                                        options={ PolicyTypeSelect }
                                                        value={ PolicyTypeSelect.find( option => option.value === vehicleData.policyType ) }
                                                        onChange={ ( option ) => setVehicleData( { ...vehicleData, policyType: option.value } ) }
                                                        placeholder='Open this select menu'
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="box">
                                            <div className="box-header">
                                                <h5 className="box-title">Fuel Type</h5>
                                            </div>
                                            <div className="box-body">
                                                <div className="space-y-2">
                                                    <Select
                                                        classNamePrefix='react-select'
                                                        className="rounded-full"
                                                        options={ FuelTypeSelect }
                                                        value={ FuelTypeSelect.find( option => option.value === vehicleData.fuelType ) }
                                                        onChange={ ( option ) => setVehicleData( { ...vehicleData, fuelType: option.value } ) }
                                                        placeholder='Open this select menu'
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="box">
                                            <div className="box-header">
                                                <h5 className="box-title">Register Number</h5>
                                            </div>
                                            <div className="box-body">
                                                <div className="space-y-2">
                                                    <input
                                                        type="text"
                                                        value={ vehicleData.registerNumber }
                                                        onChange={ ( e ) => setVehicleData( { ...vehicleData, registerNumber: e.target.value } ) }
                                                        className="my-auto ti-form-input"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="box">
                                            <div className="box-header">
                                                <h5 className="box-title">Make Model</h5>
                                            </div>
                                            <div className="box-body">
                                                <div className="space-y-2">
                                                    <input
                                                        type="text"
                                                        value={ vehicleData.makeModel }
                                                        onChange={ ( e ) => setVehicleData( { ...vehicleData, makeModel: e.target.value } ) }
                                                        className="my-auto ti-form-input"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="box">
                                            <div className="box-header">
                                                <h5 className="box-title">Variant Name</h5>
                                            </div>
                                            <div className="box-body">
                                                <div className="space-y-2">
                                                    <input
                                                        type="text"
                                                        value={ vehicleData.variantName }
                                                        onChange={ ( e ) => setVehicleData( { ...vehicleData, variantName: e.target.value } ) }
                                                        className="my-auto ti-form-input"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="box">
                                            <div className="box-header">
                                                <h5 className="box-title">RTO</h5>
                                            </div>
                                            <div className="box-body">
                                                <div className="space-y-2">
                                                    <input
                                                        type="text"
                                                        value={ vehicleData.rto }
                                                        onChange={ ( e ) => setVehicleData( { ...vehicleData, rto: e.target.value } ) }
                                                        className="my-auto ti-form-input"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="box">
                                            <div className="box-header">
                                                <h5 className="box-title">Registration Date</h5>
                                            </div>
                                            <div className="box-body">
                                                <div className="space-y-2">
                                                    <ReactDatePicker
                                                        selected={ vehicleData.registrationDate }
                                                        onChange={ ( date ) => setVehicleData( { ...vehicleData, registrationDate: date } ) }
                                                        className="my-auto ti-form-input"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="box">
                                            <div className="box-header">
                                                <h5 className="box-title">Manufacturing Date</h5>
                                            </div>
                                            <div className="box-body">
                                                <div className="space-y-2">
                                                    <ReactDatePicker
                                                        selected={ vehicleData.manufacturingDate }
                                                        onChange={ ( date ) => setVehicleData( { ...vehicleData, manufacturingDate: date } ) }
                                                        className="my-auto ti-form-input"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="box">
                                            <div className="box-header">
                                                <h5 className="box-title">RC Copy</h5>
                                            </div>
                                            <div className="box-body">
                                                <div className="space-y-2">
                                                    <input
                                                        type="file"
                                                        onChange={ ( e ) => setVehicleData( { ...vehicleData, rcCopy: e.target.files[ 0 ] } ) }
                                                        className="my-auto ti-form-input"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="box">
                                            <div className="box-header">
                                                <h5 className="box-title">Registration Copy</h5>
                                            </div>
                                            <div className="box-body">
                                                <div className="space-y-2">
                                                    <input
                                                        type="file"
                                                        onChange={ ( e ) => setVehicleData( { ...vehicleData, registrationCopy: e.target.files[ 0 ] } ) }
                                                        className="my-auto ti-form-input"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="box">
                                            <div className="box-header">
                                                <h5 className="box-title">Invoice Copy</h5>
                                            </div>
                                            <div className="box-body">
                                                <div className="space-y-2">
                                                    <input
                                                        type="file"
                                                        onChange={ ( e ) => setVehicleData( { ...vehicleData, invoiceCopy: e.target.files[ 0 ] } ) }
                                                        className="my-auto ti-form-input"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>




                                    </div>


                                    <div className="box">
                                        <div className="box-header">
                                            <h5 className="box-title">Add-Ons</h5>
                                        </div>
                                        <div className="box-body">
                                            <div className="space-y-2">
                                                { Object.keys( vehicleData.addOns ).map( addOn => (
                                                    <div className="flex" key={ addOn }>
                                                        <input
                                                            type="checkbox"
                                                            name={ addOn }
                                                            className="ti-form-checkbox"
                                                            checked={ vehicleData.addOns[ addOn ] }
                                                            onChange={ () => setVehicleData( {
                                                                ...vehicleData,
                                                                addOns: {
                                                                    ...vehicleData.addOns,
                                                                    [ addOn ]: !vehicleData.addOns[ addOn ]
                                                                }
                                                            } ) }
                                                        />
                                                        <label htmlFor={ addOn } className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">
                                                            { addOn.replace( /([A-Z])/g, ' $1' ).trim() }
                                                        </label>
                                                    </div>
                                                ) ) }
                                            </div>
                                        </div>
                                    </div>


                                    <div className="my-5">
                                        <input type="checkbox" className="ti-form-checkbox mt-0.5" id="hs-checkbox-group-1" required />
                                        <label htmlFor="hs-checkbox-group-1" className="text-sm text-gray-500 ltr:ml-3 rtl:mr-3 dark:text-white/70">I agree with the terms and conditions</label>
                                    </div>


                                    <button type="submit" className="ti-btn ti-btn-primary">Submit</button>

                                </form>
                            </div>
                        </div>
                    </div>

                )
            }

            {/* Term and Life Insurance Form Layout  */ }

        </div >
    )
}

export default InsuranceForm