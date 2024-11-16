import React, { Fragment, useState, useEffect } from "react";
import PageHeader from "../../layout/layoutsection/pageHeader/pageHeader";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../GlobalKey/GlobalKey";
import axios from "axios";


const ConsultancyAddNewService = () =>
{
    const { userId } = useParams();

    const [ subject, setSubject ] = useState( '' );
    const [ category, setCategory ] = useState( '' );
    const [ categoryOther, setCategoryOther ] = useState( false );
    const [ categoryOtherT, setCategoryOtherT ] = useState( "" );
    const [ subCategory, setSubCategory ] = useState( '' );
    const [ subCategoryOther, setSubCategoryOther ] = useState( false );
    const [ subCategoryOtherT, setSubCategoryOtherT ] = useState( "" );
    const [ note, setNote ] = useState( '' );
    const [ price, setPrice ] = useState( '' );
    const [ paymentType, setPaymentType ] = useState( '' );


    const paymentOptions = [
        { value: 'one-time', label: 'One Tipe' },
        { value: 'weekly-payment', label: 'Weekly Payment' },
        { value: 'monthly-payment', label: 'Monthly Payment' },
        { value: 'quarterly-payment', label: 'Quarterly Payment' },
        { value: 'half-yearly-payment', label: 'Half Yearly Payment' },
        { value: 'yearly-payment', label: 'Yearly Payment' },
    ];

    const categoryOptions = [
        { value: 'GST', label: 'GST', subCat: [ 'GST Registration', 'GST Return Filing', 'GST Consultation', 'Other Category' ] },
        { value: 'Income Tax', label: 'Income Tax', subCat: [ 'Income Tax Return Filing', 'Income Tax Consultation', 'Other Category' ] },
        { value: 'TDS', label: 'TDS', subCat: [ 'TDS Return Filing', 'TDS Consultation', 'Other Category' ] },
        { value: 'Accounting', label: 'Accounting', subCat: [ 'Accounting Services', 'Other Category' ] },
        { value: 'Payroll', label: 'Payroll', subCat: [ 'Payroll Services', 'Other Category' ] },
        { value: 'Trademark', label: 'Trademark', subCat: [ 'Trademark Registration', 'Trademark Consultation', 'Other Category' ] },
        { value: 'Patent', label: 'Patent', subCat: [ 'Patent Registration', 'Patent Consultation', 'Other Category' ] },
        { value: 'Company Registration', label: 'Company Registration', subCat: [ 'Private Limited', 'Limited Liability Partnership', 'Other Category' ] },
        { value: 'Firm Registration', label: 'Firm Registration', subCat: [ 'Proprietorship Firm', 'Partnership Firm', 'Other Category' ] },
        { value: 'ROC Compliance', label: 'ROC Compliance', subCat: [ 'Annual Filing', 'Other Category' ] },
        { value: 'ISO', label: 'ISO', subCat: [ 'ISO Registration', 'ISO Consultation', 'Other Category' ], },
        { value: 'Insurance', label: 'Insurance', subCat: [ 'Life Insurance', 'Health Insurance', 'Motor Insurance', 'Other Category' ] },
        { value: 'Loan', label: 'Loan', subCat: [ 'Home Loan', 'Personal Loan', 'Business Loan', 'Other Category' ] },
        { value: 'Others', label: 'Others', subCat: [ 'Other Category' ] },
    ];



    const [ subCategoryOptions, setSubCategoryOptions ] = useState( [] );


    const formSubmit = async ( e ) =>
    {
        e.preventDefault();


        var subjectI = subject;
        var categoryI = "";
        var subCategoryI = "";
        var noteI = note;
        var priceI = price;
        var paymentTypeI = paymentType;

        if ( category == 'Others' )
        {
            categoryI = categoryOtherT
        } else
        {
            categoryI = category;
        }

        if ( subCategory == "Other Category" )
        {
            subCategoryI = subCategoryOtherT;
        } else
        {
            subCategoryI = subCategory;
        }




        console.log( subjectI );
        // console.log( companyI );
        console.log( categoryI );
        console.log( subCategoryI );
        console.log( noteI );
        console.log( priceI );
        console.log( paymentTypeI );

        axios
            .post(
                api + `/admin/consultancy/reg-new-services`,
                {
                    companyId: myCompanyId,
                    userId: userId,
                    subject: subjectI,
                    category: categoryI,
                    subCategory: subCategoryI,
                    note: noteI,
                    price: priceI,
                    paymentType: paymentTypeI,
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + myToken

                    }
                }
            )
            .then( ( response ) =>
            {
                if ( response.status === 200 )
                {
                    if ( response.data.status == "1" )
                    {
                        alert( response.data.message );

        
                    } else
                    {
                        alert( response.data.message );
                    }
                }

            } )
            .catch( ( error ) =>
            {
                if ( error.response )
                {
                    // the request was made and the server responded with a status code
                    console.log( error.response );
                    console.log( error.response.status );
                } else if ( error.request )
                {
                    // the request was made but no response was received
                    console.log( "network error" );
                } else
                {
                    // something happened when setting up the request
                    console.log( error );
                }
            } );


        // Todo: Redirect to the dashboard page
    };

    return (
        <div>
            <PageHeader currentpage="New Services" activepage="Services" mainpage="Add Services" />

            <div className="grid grid-cols-12 gap-x-6"></div>

            <div className="grid grid-cols-12 gap-x-6">
                <div className="col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title">Add New services</h5>
                        </div>
                        <div className="box-body">
                            <form onSubmit={ formSubmit }>
                                <div className="grid lg:grid-cols-2 gap-6 space-y-4 lg:space-y-0">
                                    <div className="space-y-2">
                                        <label className="ti-form-label mb-0">Subject</label>
                                        <input
                                            type='text'
                                            className="my-auto ti-form-input"
                                            placeholder="Subject"
                                            value={ subject }
                                            onChange={ ( e ) => setSubject( e.target.value ) }

                                        />
                                    </div>
                                

                                    <div className="space-y-2">
                                        <label className="ti-form-label mb-0">Category</label>
                                        <select
                                            className="my-auto ti-form-select"
                                            value={ category }
                                            onChange={ ( e ) =>
                                            {
                                                setCategory( e.target.value );
                                                if ( e.target.value == "Others" )
                                                {
                                                    setCategoryOther( true );
                                                } else
                                                {
                                                    setCategoryOther( false );
                                                }

                                                var categorySelectId = parseInt( e.target.selectedIndex ) - 1;
                                                console.log( categorySelectId );

                                                setSubCategoryOptions( categoryOptions[ categorySelectId ][ "subCat" ] );

                                            } }
                                            required
                                        >
                                            <option value="">Select Category</option>
                                            { categoryOptions.map( ( option, index ) => (
                                                <option key={ index } value={ option.value }>{ option.label }</option>
                                            ) ) }
                                        </select>
                                    </div>


                                    {
                                        categoryOther
                                            ? <div className="space-y-2">
                                                <label className="ti-form-label mb-0">Category Other</label>
                                                <input
                                                    type="text"
                                                    className="my-auto ti-form-input"
                                                    placeholder="Enter Category..."
                                                    value={ categoryOtherT }
                                                    onChange={ ( e ) => setCategoryOtherT( e.target.value ) }
                                                    required
                                                />
                                            </div>
                                            : null
                                    }




                                    <div className="space-y-2">
                                        <label className="ti-form-label mb-0">Sub Category</label>
                                        <select
                                            className="my-auto ti-form-select"
                                            value={ subCategory }
                                            onChange={ ( e ) =>
                                            {
                                                setSubCategory( e.target.value );

                                                if ( e.target.value == "Other Category" )
                                                {
                                                    setSubCategoryOther( true );
                                                } else
                                                {
                                                    setSubCategoryOther( false );
                                                }
                                            } }
                                            required
                                        >
                                            <option value="">Select Sub Category</option>
                                            { subCategoryOptions.map( ( option, index ) => (
                                                <option key={ index } value={ option }>{ option }</option>
                                            ) ) }
                                        </select>
                                    </div>


                                    {
                                        subCategoryOther
                                            ? <div className="space-y-2">
                                                <label className="ti-form-label mb-0">Sub Category Other</label>
                                                <input
                                                    type="text"
                                                    className="my-auto ti-form-input"
                                                    placeholder="Enter Sub Category..."
                                                    value={ subCategoryOtherT }
                                                    onChange={ ( e ) => setSubCategoryOtherT( e.target.value ) }
                                                    required
                                                />
                                            </div>
                                            : null
                                    }


                                    <div className="space-y-2">
                                        <label className="ti-form-label mb-0">Price</label>
                                        <input
                                            type="number"
                                            className="my-auto ti-form-input"
                                            placeholder="Price (INR)"
                                            value={ price }
                                            onChange={ ( e ) => setPrice( e.target.value ) }
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="ti-form-label mb-0">Payment Type</label>
                                        <select
                                            className="my-auto ti-form-select"
                                            value={ paymentType }
                                            onChange={ ( e ) =>

                                                setPaymentType( e.target.value ) }
                                            required
                                        >
                                            <option value="">Select Payment Type</option>
                                            { paymentOptions.map( ( option, index ) => (
                                                <option key={ index } value={ option.value }>{ option.label }</option>
                                            ) ) }
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="ti-form-label mb-0">Note</label>
                                        <input
                                            type="text"
                                            className="my-auto ti-form-input"
                                            placeholder="Short Note..."
                                            value={ note }
                                            onChange={ ( e ) => setNote( e.target.value ) }
                                        />
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

export default ConsultancyAddNewService;
