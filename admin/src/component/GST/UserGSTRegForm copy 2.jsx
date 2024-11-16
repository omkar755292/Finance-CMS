import React, { Fragment, useEffect, useState } from 'react'
import PageHeader from '../../layout/layoutsection/pageHeader/pageHeader'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { api } from '../../GlobalKey/GlobalKey';





const UserGSTRegForm = () =>
{


  const { userId } = useParams();



  const { formId } = useParams();
  const { serviceId } = useParams();

  const [ name, setName ] = useState( "" );
  const [ userId, setUserId ] = useState( "" );
  const [ email, setEmail ] = useState( "" );
  const [ aadhaarNumber, setAadhaarNumber ] = useState( "" );
  const [ panNumber, setPanNumber ] = useState( "" );
  const [ publicLink, setPublicLink ] = useState( "" );



  let navigate = useNavigate()
  const [ myToken, setMyToken ] = useState( '' )
  const [ myCompanyId, setMyCompanyId ] = useState( '' )


  const [ formData, setFormData ] = useState( '' );
  const [ questionData, setQuestionData ] = useState( [] );
  const { formId } = useParams();
  const [ question, setQuestion ] = useState( '' );
  const [ questionType, setQuestionType ] = useState( '' );
  const navigate = useNavigate();


  useEffect( () =>
  {

    let getToken = localStorage.getItem( 'token' )
    let getCompanyId = localStorage.getItem( 'companyId' )

    if ( !getToken )
    {
      navigate( '/' )
    }

    axios.post( api + `/admin/gst/gst-reg-form-one`,
      {
        companyId: getCompanyId,
        formId,
      },
      {
        headers: {
          Authorization: 'Bearer ' + getToken

        }
      }

    ).then( response =>
    {

      const myData = response.data.data;
      console.log( myData );
      setFormData( myData );
      setQuestionData( myData.questions );


    } ).catch( error =>
    {

      alert( error );
      console.log( error );

      if ( error.response.status == 403 || error.response.status == 401 )
      {

        localStorage.setItem( "token", null );
        localStorage.removeItem( 'token' );
        localStorage.clear();
        navigate( '/' )

      } else
      {
        alert( error )
      }

    } );

  }, [] )


  const handleSubmit = async ( e ) =>
  {

    e.preventDefault();
    const myToken = localStorage.getItem( 'token' );
    const myCompanyId = localStorage.getItem( 'companyId' );

    console.log( { formId, question, questionType } )

    await axios.post( api + `/admin/gst/add-new-question`,
      {
        formId,
        companyId: myCompanyId,
        question,
        questionType

      },
      {
        headers: {
          Authorization: 'Bearer ' + myToken
        }

      }

    ).then( ( response ) =>
    {
      console.log( response.data );

      if ( response.status === 200 )
      {

        if ( response.data.status == "1" )
        {
          setQuestion( '' );
          setQuestionType( '' );
          alert( "Question added successfully" );
          const myData = response.data.data;
          console.log( myData );
          setFormData( myData );
          setQuestionData( myData.questions );
        } else
        {
          alert( response.data.message );
        }
      }
    } ).catch( ( error ) => console.log( error ) );


  }


  // text/number/date/time/date-time/file
  const queType = [
    { value: 'text', label: 'Text with single line' },
    { value: 'number', label: 'Only number input' },
    { value: 'date', label: 'Select only date' },
    { value: 'time', label: 'Select only time' },
    { value: 'date-time', label: 'Select date & time' },
    { value: 'file', label: 'Upload file' },
  ];



  return (



    <div>
      <PageHeader currentpage="Filling Year: 23-24" activepage="Income Tax" mainpage="Form" />

      <div className="grid grid-cols-12 gap-6">

        <div className="col-span-12">
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">KYC Documents:</h5>
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
              <h5 className="box-title">Income Tax Calculation</h5>
            </div>
            <div className="box-body">
              <form className="ti-validation" onSubmit={ handleCheck }>
                <div className="grid lg:grid-cols-2 gap-6">

                  <div className="space-y-2">
                    <label className="ti-form-label mb-0">Gross Income</label>
                    <input
                      min={ 0 }
                      onWheel={ event => event.currentTarget.blur() }
                      type="number"
                      className="my-auto ti-form-input"
                      value={ grossIncome }
                      onChange={ ( e ) => setGrossIncome( parseFloat( e.target.value ) ) }
                      required
                    />
                  </div>



                  <div className="space-y-2">
                    <label className="ti-form-label mb-0">Standard Deduction ( Up to 50000.00)</label>
                    <input
                      min={ 0 }
                      max={ 50000 }
                      onWheel={ event => event.currentTarget.blur() }
                      type="number"
                      className="my-auto ti-form-input"
                      value={ standardDeduction }
                      onChange={ ( e ) => setStandardDeduction( parseFloat( e.target.value ) ) }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="ti-form-label mb-0">Standard Deduction ( Up to 150000.00)</label>
                    <input
                      min={ 0 }
                      max={ 150000 }
                      onWheel={ event => event.currentTarget.blur() }
                      type="number"
                      className="my-auto ti-form-input"
                      value={ section80C }
                      onChange={ ( e ) => setSection80C( parseFloat( e.target.value ) ) }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="ti-form-label mb-0">Section 80CCD(1B) Deduction ( Up to 50000.00)</label>
                    <input
                      min={ 0 }
                      max={ 50000 }
                      onWheel={ event => event.currentTarget.blur() }
                      type="number"
                      className="my-auto ti-form-input"
                      value={ section80CCD_1B }
                      onChange={ ( e ) => setSection80CCD_1B( parseFloat( e.target.value ) ) }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="ti-form-label mb-0">Section 80GG (House Rent) Deduction ( Up to 60000.00)</label>
                    <input
                      min={ 0 }
                      max={ 60000 }
                      onWheel={ event => event.currentTarget.blur() }
                      type="number"
                      className="my-auto ti-form-input"
                      value={ section80GG }
                      onChange={ ( e ) => setSection80GG( parseFloat( e.target.value ) ) }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="ti-form-label mb-0">Section 80TTB Deduction ( Up to 50000.00)</label>
                    <input
                      min={ 0 }
                      max={ 50000 }
                      onWheel={ event => event.currentTarget.blur() }
                      type="number"
                      className="my-auto ti-form-input"
                      value={ section80TTB }
                      onChange={ ( e ) => setSection80TTB( parseFloat( e.target.value ) ) }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="ti-form-label mb-0">Professional Tax Deduction ( Up to 2400.00)</label>
                    <input
                      min={ 0 }
                      max={ 2400 }
                      onWheel={ event => event.currentTarget.blur() }
                      type="number"
                      className="my-auto ti-form-input"
                      value={ professionalTax }
                      onChange={ ( e ) => setProfessionalTax( parseFloat( e.target.value ) ) }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="ti-form-label mb-0">Other Deduction ( Up to 50000.00)</label>
                    <input
                      min="0"
                      max={ 50000 }
                      onWheel={ event => event.currentTarget.blur() }
                      type="number"
                      className="my-auto ti-form-input"
                      value={ otherDeduction }
                      onChange={ ( e ) => setOtherDeduction( parseFloat( e.target.value ) ) }
                      required
                    />
                  </div>


                </div>



                <div className="my-5">
                  <input type="checkbox" className="ti-form-checkbox mt-0.5" id="hs-checkbox-group-1" required />
                  <label htmlFor="hs-checkbox-group-1" className="text-sm text-gray-500 ltr:ml-3 rtl:mr-3 dark:text-white/70">I agree with the <a href="#" className="text-primary hover:underline">terms and conditions</a></label>
                </div>

                {
                  itCalculation
                    ?
                    <div>
                      <button
                        onClick={ () => handleEitForm() }
                        type="button"
                        className="ti-btn rounded-full ti-btn-warning">
                        Edit Form
                      </button>
                    </div>
                    :
                    <div>
                      <button
                        type="submit"
                        className="ti-btn ti-btn-primary"
                      >
                        Check out
                      </button>
                    </div>
                }

              </form>
            </div>
          </div>
        </div>

        {/* Todo: Other Table */ }

        {
          itCalculation &&
          <div className="col-span-12">
            <div className="box">
              <div className="box-header">
                <h5 className="box-title">Income Tax</h5>
              </div>
              <div className="box-body">
                <div className="grid lg:grid-cols-2 gap-6">



                  <div className="col-span-12 lg:col-span-6">
                    <div className="box">
                      <div className="box-header">
                        <h5 className="box-title">Old Regime</h5>
                      </div>
                      <div className="box-body">
                        <div className="overflow-auto table-danger rounded-md border border-gray-200 dark:border-white/10">
                          <div>
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
                                    Taxable Income
                                  </button>
                                  <div id="hs-basic-always-open-collapse-three"
                                    className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                                    aria-labelledby="hs-basic-always-open-heading-three">
                                    <p className="text-gray-800 dark:text-gray-200">
                                      Your Taxable income is: { oldTaxableIncome }
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <table className="ti-custom-table ti-custom-table-head">
                            <thead>
                              <tr>
                                <th scope="col">Tax Slab</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Tax</th>
                              </tr>
                            </thead>
                            <tbody>

                              <tr>
                                <td className="font-medium">0% (0 to 250000)</td>
                                <td>{ os0 }</td>
                                <td>{ os0 * 0 / 100 }</td>
                              </tr>

                              <tr>
                                <td className="font-medium">5% (250001 to 500000)</td>
                                <td>{ os5 }</td>
                                <td>{ os5 * 5 / 100 }</td>
                              </tr>

                              <tr>
                                <td className="font-medium">20% (500001 to 1000000)</td>
                                <td>{ os20 }</td>
                                <td>{ os20 * 20 / 100 }</td>
                              </tr>

                              <tr>
                                <td className="font-medium">30% ( { '>' } 1000000)</td>
                                <td>{ os30 }</td>
                                <td>{ os30 * 30 / 100 }</td>
                              </tr>

                            </tbody>
                          </table>




                        </div>
                        {/* agg div with 50 height:  */ }
                        <div style={ { height: '50px' } } className="box-body"></div>

                        <div>
                          <p className="text-gray-800 dark:text-gray-200">
                            Sum Of Tax Slabs: { oldSumOfTaxSlabs }
                          </p>
                          <p className="text-gray-800 dark:text-gray-200">
                            Tax Rebate 87A: { oTR87A }
                          </p>
                          <p className="text-gray-800 dark:text-gray-200">
                            Tax AfterTax Rebate 87A: { oldFinalTax }
                          </p>
                          <p className="text-gray-800 dark:text-gray-200">
                            Cess 4%: { oldFinalTax * 4 / 100 }
                          </p>
                          <p className="text-gray-800 dark:text-gray-200">
                            Total Income Tax: { oldFinalTax * 104 / 100 }
                          </p>
                        </div>


                      </div>

                    </div>
                  </div>


                  <div className="col-span-12 lg:col-span-6">
                    <div className="box">
                      <div className="box-header">
                        <h5 className="box-title">New Regime</h5>
                      </div>
                      <div className="box-body">
                        <div className="overflow-auto table-success rounded-md border border-gray-200 dark:border-white/10">
                          <div>
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
                                    Taxable Income
                                  </button>
                                  <div id="hs-basic-always-open-collapse-three"
                                    className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                                    aria-labelledby="hs-basic-always-open-heading-three">
                                    <p className="text-gray-800 dark:text-gray-200">
                                      Your Taxable income is: { newTaxableIncome }
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <table className="ti-custom-table ti-custom-table-head">
                            <thead>
                              <tr>
                                <th scope="col">Tax Slab</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Tax</th>
                              </tr>
                            </thead>
                            <tbody>

                              <tr>
                                <td className="font-medium">0% (0 to 300000)</td>
                                <td>{ ns0 }</td>
                                <td>{ ns0 * 0 / 100 }</td>
                              </tr>

                              <tr>
                                <td className="font-medium">5% (300001 to 600000)</td>
                                <td>{ ns5 }</td>
                                <td>{ ns5 * 5 / 100 }</td>
                              </tr>

                              <tr>
                                <td className="font-medium">10% (600001 to 900000)</td>
                                <td>{ ns10 }</td>
                                <td>{ ns10 * 10 / 100 }</td>
                              </tr>

                              <tr>
                                <td className="font-medium">15% (900001 to 1200000)</td>
                                <td>{ ns15 }</td>
                                <td>{ ns15 * 15 / 100 }</td>
                              </tr>

                              <tr>
                                <td className="font-medium">20% (1200001 to 1500000)</td>
                                <td>{ ns20 }</td>
                                <td>{ ns20 * 20 / 100 }</td>
                              </tr>

                              <tr>
                                <td className="font-medium">30% ( { '>' } 1500000)</td>
                                <td>{ ns30 }</td>
                                <td>{ ns30 * 30 / 100 }</td>
                              </tr>







                            </tbody>
                          </table>
                        </div>

                        {/* agg div with 50 height:  */ }
                        <div style={ { height: '50px' } } className="box-body"></div>

                        <div>
                          <p className="text-gray-800 dark:text-gray-200">
                            Sum Of Tax Slabs: { newSumOfTaxSlabs }
                          </p>
                          <p className="text-gray-800 dark:text-gray-200">
                            Tax Rebate 87A: { nTR87A }
                          </p>
                          <p className="text-gray-800 dark:text-gray-200">
                            Tax AfterTax Rebate 87A: { newFinalTax }
                          </p>
                          <p className="text-gray-800 dark:text-gray-200">
                            Cess 4%: { newFinalTax * 4 / 100 }
                          </p>
                          <p className="text-gray-800 dark:text-gray-200">
                            Total Income Tax: { newFinalTax * 104 / 100 }
                          </p>
                        </div>


                      </div>
                    </div>
                  </div>


                </div>

              </div>
            </div>
          </div>
        }

        {
          itCalculation &&
          <div className="col-span-12">
            <div className="box">
              <div className="box-header">
                <h5 className="box-title">Income Tax Calculation Submit Form</h5>
              </div>
              <div className="box-body">
                <button
                  type="submit"
                  className="ti-btn ti-btn-primary"
                >
                  Submit Data
                </button>
              </div>
            </div>
          </div>
        }

      </div>

































      <div>
        <PageHeader currentpage="User Data" activepage="Home" mainpage="User Data" />

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12">

            <div className="box xl:overflow-auto">
              <div className="box-header">
                <h5 className="box-title">Company Name:</h5>
              </div>

              <div className="box-body">

                <div className="overflow-auto table-bordered">

                  <div className='app-container'>
                    <table
                      id='user-datatable'
                      className='ti-custom-table ti-striped-table ti-custom-table-hover'
                    >
                      <thead>
                        <tr>
                          <th>Question Id</th>
                          <th>Question</th>
                          <th>Type</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        { Array.isArray( questionData ) && questionData.map( ( que, index ) => (
                          <Fragment key={ index }>
                            <tr>
                              <td>{ que._id }</td>
                              <td>{ que.question }</td>
                              <td>{ que.questionType }</td>


                              <td>
                                <button
                                  // onClick={() => handleEdit(company.companyId)}
                                  style={ {
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    padding: '10px 20px',
                                    borderRadius: '5px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    marginRight: '10px'
                                  } }>Active</button>

                                <button type="button"
                                  /* // onClick={() => handleGoToServiceList(user.userFullData.userId)} */
                                  className="ti-btn ti-btn-danger"
                                  style={ {
                                    padding: '8px 20px',
                                    cursor: 'pointer',
                                    marginRight: '10px'
                                  } }>
                                  Delete
                                </button>

                                <button
                                  // onClick={() => handleGoToServiceList(user.userFullData.userId)}
                                  type="button"
                                  className="ti-btn rounded-full ti-btn-warning">
                                  Deactive
                                </button>


                              </td>
                            </tr>
                          </Fragment>
                        ) ) }
                      </tbody>
                    </table>
                  </div>

                </div>

              </div>
            </div>

            <div className="grid grid-cols-12 gap-x-6">
              <div className="col-span-12">
                <div className="box">
                  <div className="box-header">
                    <h5 className="box-title">Gst Questions Form</h5>
                  </div>
                  <div className="box-body">

                    <form onSubmit={ handleSubmit }>

                      <div className="grid gap-6 space-y-4 lg:space-y-0">

                        <div className="space-y-2">
                          <label className="ti-form-label mb-0">Question</label>
                          <input type="text"
                            name="question"
                            value={ question }
                            onChange={ ( e ) => { setQuestion( e.target.value ) } }
                            className="my-auto ti-form-input" placeholder="Question" />
                        </div>

                        <div className="space-y-2">
                          <label className="ti-form-label mb-0">Question Type</label>
                          <select
                            className="my-auto ti-form-select"
                            value={ questionType }
                            onChange={ ( e ) =>

                              setQuestionType( e.target.value ) }
                            required
                          >
                            <option value="">Select Question Type</option>
                            { queType.map( ( option, index ) => (
                              <option key={ index } value={ option.value }>{ option.label }</option>
                            ) ) }
                          </select>
                        </div>

                      </div>

                      <div className="space-y-4">
                        <button type="submit" className="ti-btn ti-btn-primary">Submit</button>
                      </div>


                    </form>


                  </div>
                </div>
              </div>


            </div>

          </div>
        </div>


      </div>


    </div >

  )
}

export default UserGSTRegForm