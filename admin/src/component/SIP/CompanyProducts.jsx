import React, { Fragment, useEffect, useState } from 'react'
import PageHeader from '../../layout/layoutsection/pageHeader/pageHeader'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { api } from '../../GlobalKey/GlobalKey';

const UpdateProduct = () =>
{

  const [ companyData, setCompanyData ] = useState( '' );
  const [ productData, setProductData ] = useState( [] );
  const { sipCompanyId, userId } = useParams();
  const [ productName, setProductName ] = useState( '' );
  const [ renewTime, setRenewTime ] = useState( '' );
  const navigate = useNavigate();

  useEffect( () =>
  {
    setProductData( companyData.productList );

  }, [ companyData ] )


  useEffect( () =>
  {
    let getToken = localStorage.getItem( 'token' )
    let getCompanyId = localStorage.getItem( 'companyId' )
    if ( !getToken )
    {
      navigate( '/' )
    }

    axios.post( api + `/admin/sip/sip-one-company-data`,
      {
        companyId: getCompanyId,
        sipCompanyId: sipCompanyId,
        userId,
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
      setCompanyData( myData );

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

    console.log( { sipCompanyId, productName, renewTime } )

    await axios.post( api + `/admin/sip/add-new-product`,
      {
        sipCompanyId,
        companyId: myCompanyId,
        productName,
        renewTime,
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

          setProductName( '' );
          setRenewTime( '' );
          alert( "Product added successfully" );
          const myData = response.data.data;
          console.log( myData );
          setCompanyData( myData );

        } else
        {
          alert( response.data.message );
        }
      }
    } )
      .catch( ( error ) => console.log( error ) );


  }

  return (
    <div>
      <PageHeader currentpage="User Data" activepage="Home" mainpage="User Data" />

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">

          <div className="box xl:overflow-auto">
            <div className="box-header">
              <h5 className="box-title">Company Name: { companyData.sipCompanyName } </h5>
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
                        <th>Product Name</th>
                        <th>Time</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      { Array.isArray( productData ) && productData.map( ( product, index ) => (
                        <Fragment key={ index }>
                          <tr>
                            <td>{ product.name }</td>
                            <td>{ product.renewTimePM }</td>


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

          <div className="grid grid-cols-12  gap-x-6">
            <div className="col-span-12">
              <div className="box">
                <div className="box-header">
                  <h5 className="box-title">Product Form</h5>
                </div>
                <div className="box-body">

                  <form onSubmit={ handleSubmit }>
                    <div className="grid gap-6 space-y-4 lg:grid-cols-2 lg:space-y-0">

                      <div className="space-y-2">
                        <label className="ti-form-label mb-0">Product Name</label>
                        <input type="text"
                          name="productName"
                          value={ productName }
                          onChange={ ( e ) => { setProductName( e.target.value ) } }
                          className="my-auto ti-form-input" placeholder="Product Name" />
                      </div>

                      <div className="space-y-2">
                        <label className="ti-form-label mb-0">Renew Time per months</label>
                        <input type="number"
                          onWheel={ ( e ) => e.target.blur() }
                          min="1"
                          max="30"
                          step="1"
                          required
                          name="renewTime"
                          value={ renewTime }
                          onChange={ ( e ) => { setRenewTime( e.target.value ) } }
                          className="my-auto ti-form-input" placeholder="Renew Time" />
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


    </div >
  )
}

export default UpdateProduct