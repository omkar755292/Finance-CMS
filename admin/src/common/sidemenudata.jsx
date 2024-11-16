import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';



//Svg icons of Dashboard

const dashboardSvg = <i className='ti ti-dashboard side-menu__icon'></i>

const usersSvg = <i className='ti ti-users side-menu__icon'></i>

const userCheckSvg = <i className='ti ti-user-check side-menu__icon'></i>

const userExclamationSvg = <i className='ti ti-user-exclamation side-menu__icon'></i>

const reportMoneySvg = <i className='ti ti-report-money side-menu__icon'></i>

const zoomMoneySvg = <i className='ti ti-zoom-money side-menu__icon'></i>

const receiptTaxSvg = <i className='ti ti-receipt-tax side-menu__icon'></i>

const trendingUpSvg = <i className='ti ti-trending-up side-menu__icon'></i>



export const MenuItems = [
  {
    id: 1,
    menutitle: 'MAIN',
    Items: [
      {
        id: 15,
        path: `${ import.meta.env.BASE_URL }dashboard`,
        icon: dashboardSvg,
        title: 'Dashboard',
        type: 'link',
        active: false,
        selected: false
      },


      {
        id: 15,
        icon: usersSvg,
        title: 'User List',
        type: 'sub',
        active: false,
        selected: false,
        children: [
          {
            id: 3,
            path: `${ import.meta.env.BASE_URL }user-list`,
            type: 'link',
            active: false,
            selected: false,
            title: 'All Users'
          },
          {
            id: 4,
            path: `${ import.meta.env.BASE_URL }user-new-kyc`,
            type: 'link',
            active: false,
            selected: false,
            title: 'Users KYC'
          }
        ]
      },

      // Todo: NEW

      {
        id: 5,
        icon: reportMoneySvg,
        title: 'SIP',
        type: 'sub',
        active: false,
        selected: false,
        children: [
          {
            id: 6,
            path: `${ import.meta.env.BASE_URL }sip/on-boarding`,
            type: 'link',
            active: false,
            selected: false,
            title: 'On-boarding'
          },
          {
            id: 7,
            path: `${ import.meta.env.BASE_URL }sip/user-list`,
            type: 'link',
            active: false,
            selected: false,
            title: 'User List'
          },
          {
            id: 10,
            path: `${ import.meta.env.BASE_URL }sip/company-data`,
            type: 'link',
            active: false,
            selected: false,
            title: 'Company Data'
          },
        ]
      },

      // Todo: NEW

      {
        id: 11,
        icon: zoomMoneySvg,
        title: 'GST',
        type: 'sub',
        active: false,
        selected: false,
        children: [
          {
            id: 12,
            path: `${ import.meta.env.BASE_URL }gst/on-boarding`,
            type: 'link',
            active: false,
            selected: false,
            title: 'On-boarding'
          },
          {
            id: 13,
            path: `${ import.meta.env.BASE_URL }gst/user-list`,
            type: 'link',
            active: false,
            selected: false,
            title: 'User List'
          },
          {
            id: 16,
            path: `${ import.meta.env.BASE_URL }gst/gst-form`,
            type: 'link',
            active: false,
            selected: false,
            title: 'GST Form'
          },
        ]
      },

      // Todo: NEW

      {
        id: 17,
        icon: receiptTaxSvg,
        title: 'Income Tax',
        type: 'sub',
        active: false,
        selected: false,
        children: [
          {
            id: 18,
            path: `${ import.meta.env.BASE_URL }income-tax/on-boarding`,
            type: 'link',
            active: false,
            selected: false,
            title: 'On-boarding'
          },
          {
            id: 19,
            path: `${ import.meta.env.BASE_URL }income-tax/user-list`,
            type: 'link',
            active: false,
            selected: false,
            title: 'User List'
          },
        ]
      },

      // Todo: NEW

      {
        id: 17,
        icon: receiptTaxSvg,
        title: 'Insurance',
        type: 'sub',
        active: false,
        selected: false,
        children: [
          {
            id: 18,
            path: `${ import.meta.env.BASE_URL }insurance/on-boarding`,
            type: 'link',
            active: false,
            selected: false,
            title: 'On-boarding'
          },
          {
            id: 19,
            path: `${ import.meta.env.BASE_URL }insurance/user-list`,
            type: 'link',
            active: false,
            selected: false,
            title: 'User List'
          },
        ]
      },

      // Todo: NEW

      {
        id: 22,
        icon: trendingUpSvg,
        title: 'Consultancy',
        type: 'sub',
        active: false,
        selected: false,
        children: [
          {
            id: 23,
            path: `${ import.meta.env.BASE_URL }consultancy/on-boarding`,
            type: 'link',
            active: false,
            selected: false,
            title: 'On-boarding'
          },
          {
            id: 24,
            path: `${ import.meta.env.BASE_URL }consultancy/user-list`,
            type: 'link',
            active: false,
            selected: false,
            title: 'User List'
          },
        ]
      },

      // Todo: NEW

      {
        id: 27,
        icon: userExclamationSvg,
        title: 'Admin List',
        type: 'sub',
        active: false,
        selected: false,
        children: [
          {
            id: 28,
            path: `${ import.meta.env.BASE_URL }admin-list`,
            type: 'link',
            active: false,
            selected: false,
            title: 'All Admins'
          }, {
            id: 29,
            path: `${ import.meta.env.BASE_URL }admin-new-kyc`,
            type: 'link',
            active: false,
            selected: false,
            title: 'Admins KYC'
          }
        ]
      },

      {
        id: 30,
        icon: userCheckSvg,
        title: 'Super Admin List',
        type: 'sub',
        active: false,
        selected: false,
        children: [
          {
            id: 31,
            path: `${ import.meta.env.BASE_URL }super-admin-list`,
            type: 'link',
            active: false,
            selected: false,
            title: 'All Super Admin'
          }, 
          // {
          //   id: 32,
          //   path: `${ import.meta.env.BASE_URL }super-admin-new-kyc`,
          //   type: 'link',
          //   active: false,
          //   selected: false,
          //   title: 'Super Admin KYC'
          // }
        ]
      }
    ]
  }
]
export default MenuItems
