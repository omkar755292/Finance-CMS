import React, { Fragment, useEffect, useState } from 'react'
import PageHeader from '../../layout/layoutsection/pageHeader/pageHeader'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { api } from '../../GlobalKey/GlobalKey';

const UpdateGstForm = () =>
{

  const [ formData, setFormData ] = useState( '' );
  const [ questionData, setQuestionData ] = useState( [] );
  const { questionId } = useParams();
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

    console.log( questionId );
    axios.post( api + `/admin/gst/gst-reg-form-one`,
      {
        companyId: getCompanyId,
        questionId,
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

    console.log( { questionId, question, questionType } )

    await axios.post( api + `/admin/gst/add-new-question`,
      {
        questionId,
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

                    <div className='py-1'></div>

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
  )
}

export default UpdateGstForm