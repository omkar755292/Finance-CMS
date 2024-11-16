import React, { Fragment, useState, useEffect } from 'react'
import PageHeader from '../../layout/layoutsection/pageHeader/pageHeader';
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { api } from "../../GlobalKey/GlobalKey";
import { Password } from '@mui/icons-material';


const IncomeTaxCalForm2324Public = () =>
{


  const { formId } = useParams();
  const { serviceId } = useParams();
  const { formPassword } = useParams();

  const [ name, setName ] = useState( "" );
  const [ userId, setUserId ] = useState( "" );
  const [ email, setEmail ] = useState( "" );
  const [ aadhaarNumber, setAadhaarNumber ] = useState( "" );
  const [ panNumber, setPanNumber ] = useState( "" );
  const [ publicLink, setPublicLink ] = useState( "" );
  const [ publicLinkAvailable, setPublicLinkAvailable ] = useState( false );


  const [ companyId, setCompanyId ] = useState( "" );



  let navigate = useNavigate()


  const [ grossIncome, setGrossIncome ] = useState( 0 );
  const [ standardDeduction, setStandardDeduction ] = useState( 0 );
  const [ section80C, setSection80C ] = useState( 0 );
  const [ section80CCD_1B, setSection80CCD_1B ] = useState( 0 );
  const [ section80GG, setSection80GG ] = useState( 0 );
  const [ section80TTB, setSection80TTB ] = useState( 0 );
  const [ professionalTax, setProfessionalTax ] = useState( 0 );
  const [ otherDeduction, setOtherDeduction ] = useState( 0 );


  const [ itCalculation, setItCalculation ] = useState( false );


  const [ oldTaxableIncome, setOldTaxableIncome ] = useState( 0 );
  const [ oldSumOfTaxSlabs, setOldSumOfTaxSlabs ] = useState( 0 );
  const [ oldFinalTax, setOldFinalTax ] = useState( 0 );
  const [ newTaxableIncome, setNewTaxableIncome ] = useState( 0 );
  const [ newSumOfTaxSlabs, setNewSumOfTaxSlabs ] = useState( 0 );
  const [ newFinalTax, setNewFinalTax ] = useState( 0 );




  const [ os0, setOs0 ] = useState( 0 );
  const [ os5, setOs5 ] = useState( 0 );
  const [ os20, setOs20 ] = useState( 0 );
  const [ os30, setOs30 ] = useState( 0 );


  const [ ns0, setNs0 ] = useState( 0 );
  const [ ns5, setNs5 ] = useState( 0 );
  const [ ns10, setNs10 ] = useState( 0 );
  const [ ns15, setNs15 ] = useState( 0 );
  const [ ns20, setNs20 ] = useState( 0 );
  const [ ns30, setNs30 ] = useState( 0 );


  const [ oTR87A, setOTR87A ] = useState( 0 );
  const oTR87A_TA = 500000;
  const [ nTR87A, setNTR87A ] = useState( 0 );
  const nTR87A_TA = 700000;

  useEffect( () =>
  {


    console.log( serviceId );
    console.log( formId );

    axios
      .post( api + `/admin/income-tax/filling-yr-2324-data-get-public`,
        {
          serviceId,
          formId,
          formPassword
        },
      )
      .then( response =>
      {
        console.log( response );
        if ( response.data.status == 1 )
        {
          const myData = response.data.data;
          setPublicLinkAvailable( myData.publicLink );


          setCompanyId( myData.companyId );

          setName( myData.userOnboardingData.userFullData.name );
          setUserId( myData.userOnboardingData.userFullData.userId );
          setEmail( myData.userOnboardingData.userFullData.email );
          setAadhaarNumber( myData.userOnboardingData.userFullData.aadhaarNumber );
          setPanNumber( myData.userOnboardingData.userFullData.panNumber );
          setPublicLink( `${ window.location.origin }/income-tax-filling-yr-23-24/${ myData.formPassword }/${ myData.formId }/${ myData.serviceId }` )

          setGrossIncome( parseFloat( myData.grossIncome ) )
          setStandardDeduction( parseFloat( myData.standardDeduction ) )
          setSection80C( parseFloat( myData.section80C ) )
          setSection80CCD_1B( parseFloat( myData.section80CCD_1B ) )
          setSection80GG( parseFloat( myData.section80GG ) )
          setSection80TTB( parseFloat( myData.section80TTB ) )
          setProfessionalTax( parseFloat( myData.professionalTax ) )
          setOtherDeduction( parseFloat( myData.otherDeduction ) )

          setOldTaxableIncome( parseFloat( myData.oldTaxableIncome ) )
          setOldSumOfTaxSlabs( parseFloat( myData.oldSumOfTaxSlabs ) )
          setNewTaxableIncome( parseFloat( myData.newTaxableIncome ) )
          setNewSumOfTaxSlabs( parseFloat( myData.newSumOfTaxSlabs ) )
          setOldFinalTax( parseFloat( myData.oldFinalTax ) )
          setNewFinalTax( parseFloat( myData.newFinalTax ) )


        } else
        {
          alert( response.data.message );
        }

      } )
      .catch( error =>
      {
        alert( error );
        console.log( error );
      } );



  }, [] );

  const handleEitForm = () =>
  {
    setItCalculation( false );
  }

  const handleCheck = ( event ) =>
  {
    event.preventDefault();

    const myOldTaxableIncome = grossIncome - standardDeduction - section80C - section80CCD_1B - section80GG - section80TTB - professionalTax - otherDeduction;

    const myNewTaxableIncome = grossIncome - standardDeduction;

    if ( myOldTaxableIncome > 0 && myNewTaxableIncome > 0 )
    {

      setOldTaxableIncome( myOldTaxableIncome );

      var remindOldTaxableIncome = myOldTaxableIncome;
      var aos0 = 0;
      var aos5 = 0;
      var aos20 = 0;
      var aos30 = 0;

      if ( remindOldTaxableIncome > 250000 )
      {
        aos0 = 250000;
        setOs0( 250000 )
        remindOldTaxableIncome = remindOldTaxableIncome - 250000;
      } else
      {
        aos0 = remindOldTaxableIncome;
        setOs0( remindOldTaxableIncome )
        remindOldTaxableIncome = 0;
      }

      if ( remindOldTaxableIncome > 250000 )
      {
        aos5 = 250000;
        setOs5( 250000 )
        remindOldTaxableIncome = remindOldTaxableIncome - 250000;
      } else
      {
        aos5 = remindOldTaxableIncome;
        setOs5( remindOldTaxableIncome )
        remindOldTaxableIncome = 0;
      }

      if ( remindOldTaxableIncome > 500000 )
      {
        aos20 = 500000;
        setOs20( 500000 )
        remindOldTaxableIncome = remindOldTaxableIncome - 500000;
      } else
      {
        aos20 = remindOldTaxableIncome;
        setOs20( remindOldTaxableIncome )
        remindOldTaxableIncome = 0;
      }

      aos30 = remindOldTaxableIncome
      setOs30( remindOldTaxableIncome )
      remindOldTaxableIncome = 0;

      setOldSumOfTaxSlabs( ( aos0 * 0 / 100 ) + ( aos5 * 5 / 100 ) + ( aos20 * 20 / 100 ) + ( aos30 * 30 / 100 ) );

      console.log( 'setOldSumOfTaxSlabs', ( ( aos0 * 0 / 100 ) + ( aos5 * 5 / 100 ) + ( aos20 * 20 / 100 ) + ( aos30 * 30 / 100 ) ) );

      if ( myOldTaxableIncome <= oTR87A_TA )
      {
        if ( ( ( aos0 * 0 / 100 ) + ( aos5 * 5 / 100 ) + ( aos20 * 20 / 100 ) + ( aos30 * 30 / 100 ) ) < 12500 )
        {
          setOTR87A( ( ( aos0 * 0 / 100 ) + ( aos5 * 5 / 100 ) + ( aos20 * 20 / 100 ) + ( aos30 * 30 / 100 ) ) )
          setOldFinalTax( 0 )
        } else
        {
          setOTR87A( 12500 )
          setOldFinalTax( ( ( aos0 * 0 / 100 ) + ( aos5 * 5 / 100 ) + ( aos20 * 20 / 100 ) + ( aos30 * 30 / 100 ) ) - 12500 )
        }
      } else
      {
        setOldFinalTax( ( ( aos0 * 0 / 100 ) + ( aos5 * 5 / 100 ) + ( aos20 * 20 / 100 ) + ( aos30 * 30 / 100 ) ) )
      }




      setNewTaxableIncome( myNewTaxableIncome );
      var ans0 = 0;
      var ans5 = 0;
      var ans10 = 0;
      var ans15 = 0;
      var ans20 = 0;
      var ans30 = 0;

      var remindNewTaxableIncome = myNewTaxableIncome;

      if ( remindNewTaxableIncome > 300000 )
      {
        ans0 = 300000;
        setNs0( 300000 )
        remindNewTaxableIncome = remindNewTaxableIncome - 300000;
      } else
      {
        ans0 = remindNewTaxableIncome;
        setNs0( remindNewTaxableIncome )
        remindNewTaxableIncome = 0;
      }

      if ( remindNewTaxableIncome > 300000 )
      {
        ans5 = 300000;
        setNs5( 300000 )
        remindNewTaxableIncome = remindNewTaxableIncome - 300000;
      } else
      {
        ans5 = remindNewTaxableIncome;
        setNs5( remindNewTaxableIncome )
        remindNewTaxableIncome = 0;
      }

      if ( remindNewTaxableIncome > 300000 )
      {
        ans10 = 300000;
        setNs10( 300000 )
        remindNewTaxableIncome = remindNewTaxableIncome - 300000;
      } else
      {
        ans10 = remindNewTaxableIncome;
        setNs10( remindNewTaxableIncome )
        remindNewTaxableIncome = 0;
      }

      if ( remindNewTaxableIncome > 300000 )
      {
        ans15 = 300000;
        setNs15( 300000 )
        remindNewTaxableIncome = remindNewTaxableIncome - 300000;
      } else  
      {
        ans15 = remindNewTaxableIncome;
        setNs15( remindNewTaxableIncome )
        remindNewTaxableIncome = 0;
      }

      if ( remindNewTaxableIncome > 300000 )
      {
        ans20 = 300000;
        setNs20( 300000 )
        remindNewTaxableIncome = remindNewTaxableIncome - 300000;
      } else
      {
        ans20 = remindNewTaxableIncome;
        setNs20( remindNewTaxableIncome )
        remindNewTaxableIncome = 0;
      }

      ans30 = remindNewTaxableIncome;
      setNs30( remindNewTaxableIncome )
      remindNewTaxableIncome = 0;

      setNewSumOfTaxSlabs( ( ans0 * 0 / 100 ) + ( ans5 * 5 / 100 ) + ( ans10 * 10 / 100 ) + ( ans15 * 15 / 100 ) + ( ans20 * 20 / 100 ) + ( ans30 * 30 / 100 ) );

      if ( myNewTaxableIncome <= nTR87A_TA )
      {
        if ( ( ( ans0 * 0 / 100 ) + ( ans5 * 5 / 100 ) + ( ans10 * 10 / 100 ) + ( ans15 * 15 / 100 ) + ( ans20 * 20 / 100 ) + ( ans30 * 30 / 100 ) ) < 25000 )
        {
          setNTR87A( ( ( ans0 * 0 / 100 ) + ( ans5 * 5 / 100 ) + ( ans10 * 10 / 100 ) + ( ans15 * 15 / 100 ) + ( ans20 * 20 / 100 ) + ( ans30 * 30 / 100 ) ) )
          setNewFinalTax( 0 )
        } else
        {
          setNTR87A( 25000 )
          setNewFinalTax( ( ( ans0 * 0 / 100 ) + ( ans5 * 5 / 100 ) + ( ans10 * 10 / 100 ) + ( ans15 * 15 / 100 ) + ( ans20 * 20 / 100 ) + ( ans30 * 30 / 100 ) ) - 25000 )

        }

      } else if ( myNewTaxableIncome <= 727777 && myNewTaxableIncome > nTR87A_TA )
      {
        setNTR87A( 25000 )
        setNewFinalTax( myNewTaxableIncome - 700000 )

      } else
      {
        setNewFinalTax( ( ( ans0 * 0 / 100 ) + ( ans5 * 5 / 100 ) + ( ans10 * 10 / 100 ) + ( ans15 * 15 / 100 ) + ( ans20 * 20 / 100 ) + ( ans30 * 30 / 100 ) ) )
      }










      setItCalculation( true );
    } else
    {
      alert( "Your income and deduction is: " + myOldTaxableIncome + " " + myNewTaxableIncome + ", bellow 0" );

    }



  }


  const handleSubmit = () =>
  {

    const myOldTaxableIncome = grossIncome - standardDeduction - section80C - section80CCD_1B - section80GG - section80TTB - professionalTax - otherDeduction;

    const myNewTaxableIncome = grossIncome - standardDeduction;

    if ( myOldTaxableIncome > 0 && myNewTaxableIncome > 0 )
    {

      setOldTaxableIncome( myOldTaxableIncome );

      var remindOldTaxableIncome = myOldTaxableIncome;
      var aos0 = 0;
      var aos5 = 0;
      var aos20 = 0;
      var aos30 = 0;

      if ( remindOldTaxableIncome > 250000 )
      {
        aos0 = 250000;
        setOs0( 250000 )
        remindOldTaxableIncome = remindOldTaxableIncome - 250000;
      } else
      {
        aos0 = remindOldTaxableIncome;
        setOs0( remindOldTaxableIncome )
        remindOldTaxableIncome = 0;
      }

      if ( remindOldTaxableIncome > 250000 )
      {
        aos5 = 250000;
        setOs5( 250000 )
        remindOldTaxableIncome = remindOldTaxableIncome - 250000;
      } else
      {
        aos5 = remindOldTaxableIncome;
        setOs5( remindOldTaxableIncome )
        remindOldTaxableIncome = 0;
      }

      if ( remindOldTaxableIncome > 500000 )
      {
        aos20 = 500000;
        setOs20( 500000 )
        remindOldTaxableIncome = remindOldTaxableIncome - 500000;
      } else
      {
        aos20 = remindOldTaxableIncome;
        setOs20( remindOldTaxableIncome )
        remindOldTaxableIncome = 0;
      }

      aos30 = remindOldTaxableIncome
      setOs30( remindOldTaxableIncome )
      remindOldTaxableIncome = 0;

      var myOldSumOfTaxSlabs = ( aos0 * 0 / 100 ) + ( aos5 * 5 / 100 ) + ( aos20 * 20 / 100 ) + ( aos30 * 30 / 100 );
      setOldSumOfTaxSlabs( myOldSumOfTaxSlabs );

      console.log( 'setOldSumOfTaxSlabs', ( ( aos0 * 0 / 100 ) + ( aos5 * 5 / 100 ) + ( aos20 * 20 / 100 ) + ( aos30 * 30 / 100 ) ) );

      if ( myOldTaxableIncome <= oTR87A_TA )
      {
        if ( ( ( aos0 * 0 / 100 ) + ( aos5 * 5 / 100 ) + ( aos20 * 20 / 100 ) + ( aos30 * 30 / 100 ) ) < 12500 )
        {
          setOTR87A( ( ( aos0 * 0 / 100 ) + ( aos5 * 5 / 100 ) + ( aos20 * 20 / 100 ) + ( aos30 * 30 / 100 ) ) )
          setOldFinalTax( 0 )
        } else
        {
          setOTR87A( 12500 )
          setOldFinalTax( ( ( aos0 * 0 / 100 ) + ( aos5 * 5 / 100 ) + ( aos20 * 20 / 100 ) + ( aos30 * 30 / 100 ) ) - 12500 )
        }
      } else
      {
        setOldFinalTax( ( ( aos0 * 0 / 100 ) + ( aos5 * 5 / 100 ) + ( aos20 * 20 / 100 ) + ( aos30 * 30 / 100 ) ) )
      }




      setNewTaxableIncome( myNewTaxableIncome );
      var ans0 = 0;
      var ans5 = 0;
      var ans10 = 0;
      var ans15 = 0;
      var ans20 = 0;
      var ans30 = 0;

      var remindNewTaxableIncome = myNewTaxableIncome;

      if ( remindNewTaxableIncome > 300000 )
      {
        ans0 = 300000;
        setNs0( 300000 )
        remindNewTaxableIncome = remindNewTaxableIncome - 300000;
      } else
      {
        ans0 = remindNewTaxableIncome;
        setNs0( remindNewTaxableIncome )
        remindNewTaxableIncome = 0;
      }

      if ( remindNewTaxableIncome > 300000 )
      {
        ans5 = 300000;
        setNs5( 300000 )
        remindNewTaxableIncome = remindNewTaxableIncome - 300000;
      } else
      {
        ans5 = remindNewTaxableIncome;
        setNs5( remindNewTaxableIncome )
        remindNewTaxableIncome = 0;
      }

      if ( remindNewTaxableIncome > 300000 )
      {
        ans10 = 300000;
        setNs10( 300000 )
        remindNewTaxableIncome = remindNewTaxableIncome - 300000;
      } else
      {
        ans10 = remindNewTaxableIncome;
        setNs10( remindNewTaxableIncome )
        remindNewTaxableIncome = 0;
      }

      if ( remindNewTaxableIncome > 300000 )
      {
        ans15 = 300000;
        setNs15( 300000 )
        remindNewTaxableIncome = remindNewTaxableIncome - 300000;
      } else  
      {
        ans15 = remindNewTaxableIncome;
        setNs15( remindNewTaxableIncome )
        remindNewTaxableIncome = 0;
      }

      if ( remindNewTaxableIncome > 300000 )
      {
        ans20 = 300000;
        setNs20( 300000 )
        remindNewTaxableIncome = remindNewTaxableIncome - 300000;
      } else
      {
        ans20 = remindNewTaxableIncome;
        setNs20( remindNewTaxableIncome )
        remindNewTaxableIncome = 0;
      }

      ans30 = remindNewTaxableIncome;
      setNs30( remindNewTaxableIncome )
      remindNewTaxableIncome = 0;

      var myNewSumOfTaxSlabs = ( ans0 * 0 / 100 ) + ( ans5 * 5 / 100 ) + ( ans10 * 10 / 100 ) + ( ans15 * 15 / 100 ) + ( ans20 * 20 / 100 ) + ( ans30 * 30 / 100 );
      setNewSumOfTaxSlabs( myNewSumOfTaxSlabs );

      if ( myNewTaxableIncome <= nTR87A_TA )
      {
        if ( ( ( ans0 * 0 / 100 ) + ( ans5 * 5 / 100 ) + ( ans10 * 10 / 100 ) + ( ans15 * 15 / 100 ) + ( ans20 * 20 / 100 ) + ( ans30 * 30 / 100 ) ) < 25000 )
        {
          setNTR87A( ( ( ans0 * 0 / 100 ) + ( ans5 * 5 / 100 ) + ( ans10 * 10 / 100 ) + ( ans15 * 15 / 100 ) + ( ans20 * 20 / 100 ) + ( ans30 * 30 / 100 ) ) )
          setNewFinalTax( 0 )
        } else
        {
          setNTR87A( 25000 )
          setNewFinalTax( ( ( ans0 * 0 / 100 ) + ( ans5 * 5 / 100 ) + ( ans10 * 10 / 100 ) + ( ans15 * 15 / 100 ) + ( ans20 * 20 / 100 ) + ( ans30 * 30 / 100 ) ) - 25000 )

        }

      } else if ( myNewTaxableIncome <= 727777 && myNewTaxableIncome > nTR87A_TA )
      {
        setNTR87A( 25000 )
        setNewFinalTax( myNewTaxableIncome - 700000 )

      } else
      {
        setNewFinalTax( ( ( ans0 * 0 / 100 ) + ( ans5 * 5 / 100 ) + ( ans10 * 10 / 100 ) + ( ans15 * 15 / 100 ) + ( ans20 * 20 / 100 ) + ( ans30 * 30 / 100 ) ) )
      }





      axios
        .post( api + `/admin/income-tax/filling-yr-2324-save-data-public`,
          {
            companyId,
            serviceId,
            formId,
            userId,
            formPassword,


            grossIncome,
            standardDeduction,
            section80C,
            section80CCD_1B,
            section80GG,
            section80TTB,
            professionalTax,
            otherDeduction,
            // totalTax,
            // totalTaxPayable,
            // totalTaxPaid,
            oldTaxableIncome: myOldTaxableIncome,
            oldSumOfTaxSlabs: myOldSumOfTaxSlabs,
            newTaxableIncome: myNewTaxableIncome,
            newSumOfTaxSlabs: myNewSumOfTaxSlabs,
          }
        )
        .then( response =>
        {
          console.log( response );
          if ( response.data.status == 1 )
          {
            alert( "Your form is submitted. Now you have not any access this form." );

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



    } else
    {
      alert( "Your income and deduction is: " + myOldTaxableIncome + " " + myNewTaxableIncome + ", bellow 0" );

    }



  }



  return (
    <div>


      {
        publicLinkAvailable
          ?
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
                        onClick={ () => handleSubmit() }
                      >
                        Submit Data
                      </button>
                    </div>
                  </div>
                </div>
              }

            </div>

          </div>
          :
          <div>
            <main id="content" className="mx-auto" >
              <canvas className="error-basic-background"></canvas>
              <div className="text-center py-10 px-4 sm:px-6 lg:px-8">
                <h1 className="block font-bold text-primary text-9xl dark:text-primary">401</h1>
                <p className="mt-3 text-2xl font-bold text-gray-800 dark:text-white">Oops, Unauthorize.</p>
                <p className="text-gray-600 dark:text-white/70">Unauthorize 401 Error. Form already fill up after some time ago.</p>
                <div className="mt-5 flex flex-col justify-center items-center gap-2 sm:flex-row sm:gap-3">
                  <Link className="w-full sm:w-auto inline-flex justify-center items-center gap-x-3 text-center bg-primary hover:bg-primary border border-transparent text-white text-sm font-medium rounded-sm focus:outline-none focus:ring-0 focus:ring-primary focus:ring-offset-0 focus:ring-offset-white transition py-2 px-3 dark:focus:ring-offset-white/10"
                    to={ `https://betazeninfotech.com` }>
                    <i className="ri-arrow-left-line"></i>
                    Get Back to Home
                  </Link>
                </div>
              </div>
            </main>
          </div>

      }
    </div >
  )
}
export default IncomeTaxCalForm2324Public;