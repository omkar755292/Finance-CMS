import React, { Fragment, useState, useEffect } from 'react'
import PageHeader from '../../layout/layoutsection/pageHeader/pageHeader';
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { api } from "../../GlobalKey/GlobalKey";
import DatePicker from 'react-datepicker';
import Dropzone from 'react-dropzone-uploader';


const UserGSTFormFillUpPublic = () =>
{


  const { formId, formPassword, serviceId } = useParams();
  console.log( formId, formPassword, serviceId )

  const [ data, setData ] = useState( null );
  const [ myData, setMyData ] = useState( {} );




  const [ name, setName ] = useState( "" );
  const [ userId, setUserId ] = useState( "" );
  const [ email, setEmail ] = useState( "" );
  const [ aadhaarNumber, setAadhaarNumber ] = useState( "" );
  const [ panNumber, setPanNumber ] = useState( "" );
  const [ publicLink, setPublicLink ] = useState( "" );



  useEffect( () =>
  {



    console.log( serviceId );
    console.log( formId );

    axios
      .post( api + `/admin/gst/user-question-one-public`,
        {
          formId, formPassword, serviceId
        },

      )
      .then( response =>
      {
        console.log( response );
        if ( response.data.status == 1 )
        {
          const myData = response.data.data;

          setData( myData );
          setName( myData.userOnboardingData.userFullData.name );
          setUserId( myData.userOnboardingData.userFullData.userId );
          setEmail( myData.userOnboardingData.userFullData.email );
          setAadhaarNumber( myData.userOnboardingData.userFullData.aadhaarNumber );
          setPanNumber( myData.userOnboardingData.userFullData.panNumber );
          setPublicLink( `${ window.location.origin }/gst-reg/${ myData.formPassword }/${ myData.formId }/${ myData.serviceId }` )


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



  }, [] );




  const handleUpdateData = ( event, key, data ) =>
  {
    event.preventDefault();
    // in setMyData set key and data
    setMyData( {
      ...myData,
      [ key ]: data
    } );

    console.log( myData );
  }

  const handleUpdateDataDate = ( key, data ) =>
  {
    // in setMyData set key and data
    setMyData( {
      ...myData,
      [ key ]: data
    } );

    console.log( myData );
  }


  const handleSubmit = ( event ) =>
  {
    event.preventDefault();
  }







  return (
    <div>

      {
        data != null &&
        <div>
          <PageHeader currentpage={ `${ data.formName } - ${ data.questionPackData.formName } ` } activepage="GST" mainpage={ `${ serviceId }` } />

          <div className="grid grid-cols-12 gap-6">

            <div className="col-span-12">
              <div className="box">


                {/* add 50 height:  */ }
                <div style={ { height: 10 } }></div>

                <div className="bg-danger border border-danger text-white alert rounded-full px-6" role="alert">
                  <span className="font-bold">Danger</span> alert! After submit, you cannot edit this form. Please check all the information before submit.
                </div>


                <button onClick={ () => navigator.clipboard.writeText( publicLink ) }
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
                </button>

                <div style={ { height: 10 } }></div>

                <div className="box-header">
                  <h5 className="box-title">KYC Documents:</h5>
                </div>
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




            <div className="col-span-12">
              <div className="box">
                <div className="box-header">
                  <h5 className="box-title">Fill up form for GST Registration</h5>
                </div>
                <div className="box-body">
                  <form className="ti-validation" onSubmit={ handleSubmit }>
                    {/* <div className="grid lg:grid-cols-2 gap-6"> */ }















                    { data
                      .questionPackData
                      .questions
                      .map( ( option, index ) => (
                        <div>

                          {
                            option.questionType == "text" &&
                            <div className="space-y-2">
                              <div style={ { height: 10 } }></div>
                              <label className="ti-form-label mb-0">{ `${ option.question } (${ option.questionType })` }</label>
                              <input
                                type="text"
                                className="my-auto ti-form-input"
                                value={ myData[ option.question ] }
                                onChange={ ( e ) => handleUpdateData( e, option.question, e.target.value ) }
                                required
                              />
                            </div>
                          }

                          {
                            option.questionType == "number" &&
                            <div className="space-y-2">
                              <div style={ { height: 10 } }></div>

                              <label className="ti-form-label mb-0">{ `${ option.question } (${ option.questionType })` }</label>
                              <input
                                onWheel={ event => event.currentTarget.blur() }
                                type="number"
                                className="my-auto ti-form-input"
                                value={ myData[ option.question ] }
                                onChange={ ( e ) => handleUpdateData( e, option.question, e.target.value ) }
                                required
                              />
                            </div>
                          }


                          {
                            option.questionType == "date" &&
                            <div className="space-y-2">
                              <div style={ { height: 10 } }></div>

                              <label className="ti-form-label mb-0">{ `${ option.question } (${ option.questionType })` }</label>
                              <div className="flex rounded-sm overflow-auto">
                                <div className="px-4 inline-flex items-center min-w-fit ltr:rounded-l-sm rtl:rounded-r-sm border ltr:border-r-0 rtl:border-l-0 border-gray-200 bg-gray-50 dark:bg-black/20 dark:border-white/10">
                                  <span className="text-sm text-gray-500 dark:text-white/70">
                                    <i className="ri ri-calendar-line"></i>
                                  </span>
                                </div>

                                <DatePicker
                                  className="ti-form-input ltr:rounded-l-none rtl:rounded-r-none focus:z-10"
                                  showIcon
                                  selected={ myData[ option.question ] }
                                  onChange={ ( date ) => handleUpdateDataDate( option.question, date ) }
                                  required
                                />

                              </div>
                            </div>
                          }

                          {
                            option.questionType == "time" &&
                            <div className="space-y-2">
                              <div style={ { height: 10 } }></div>

                              <label className="ti-form-label mb-0">{ `${ option.question } (${ option.questionType })` }</label>
                              <div className="flex rounded-sm overflow-auto">
                                <div
                                  className="px-4 inline-flex items-center min-w-fit ltr:rounded-l-sm rtl:rounded-r-sm border ltr:border-r-0 rtl:border-l-0 border-gray-200 bg-gray-50 dark:bg-black/20 dark:border-white/10">
                                  <span className="text-sm text-gray-500 dark:text-white/70"><i
                                    className="ri ri-time-line"></i></span>
                                </div>

                                <DatePicker
                                  className="ti-form-input ltr:rounded-l-none rtl:rounded-r-none focus:z-10"
                                  selected={ myData[ option.question ] }
                                  onChange={ ( date ) => handleUpdateDataDate( option.question, date ) }
                                  showTimeSelect
                                  showTimeSelectOnly
                                  timeIntervals={ 15 }
                                  timeCaption="Time"
                                  dateFormat="h:mm aa"
                                  required
                                />


                              </div>
                            </div>
                          }

                          {
                            option.questionType == "date-time" &&
                            <div className="space-y-2">
                              <div style={ { height: 10 } }></div>

                              <label className="ti-form-label mb-0">{ `${ option.question } (${ option.questionType })` }</label>
                              <div className="flex rounded-sm overflow-auto">
                                <div
                                  className="px-4 inline-flex items-center min-w-fit ltr:rounded-l-sm rtl:rounded-r-sm border ltr:border-r-0 rtl:border-l-0 border-gray-200 bg-gray-50 dark:bg-black/20 dark:border-white/10">
                                  <span className="text-sm text-gray-500 dark:text-white/70"><i
                                    className="ri ri-calendar-line"></i></span>
                                </div>

                                <DatePicker
                                  className="ti-form-input ltr:rounded-l-none rtl:rounded-r-none focus:z-10"
                                  selected={ myData[ option.question ] }
                                  onChange={ ( date ) => handleUpdateDataDate( option.question, date ) }
                                  locale="en-GB"
                                  showTimeSelect
                                  timeFormat="p"
                                  timeIntervals={ 15 }
                                  dateFormat="Pp"
                                  required
                                />

                              </div>
                            </div>
                          }

                          {
                            option.questionType == "file" &&
                            <div className="space-y-2">
                              <div style={ { height: 10 } }></div>

                              <label className="ti-form-label mb-0">{ `${ option.question } (${ option.questionType })` }</label>
                              <input
                                type="file"
                                className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/70 file:bg-transparent file:border-0 file:bg-gray-100 ltr:file:mr-4 rtl:file:ml-4 file:py-3 file:px-4 dark:file:bg-black/20 dark:file:text-white/70"
                                accept=".pdf"
                                value={ myData[ option.question ] }
                                onChange={ ( e ) => handleUpdateData( e, option.question, e.target.value ) }
                                required
                              />
                            </div>
                          }

                        </div>
                      ) ) }


                    {/* </div> */ }



                    <div className="my-5">
                      <input type="checkbox" className="ti-form-checkbox mt-0.5" id="hs-checkbox-group-1" required />
                      <label htmlFor="hs-checkbox-group-1" className="text-sm text-gray-500 ltr:ml-3 rtl:mr-3 dark:text-white/70">I agree with the <a href="#" className="text-primary hover:underline">terms and conditions</a></label>
                    </div>


                    <div>
                      <button
                        type="submit"
                        className="ti-btn ti-btn-primary"
                      >
                        Check out
                      </button>
                    </div>


                  </form>
                </div>
              </div>
            </div>

          </div>
        </div>
      }

    </div >
  )
}
export default UserGSTFormFillUpPublic;