/*export default  {
  items: [

    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      title: true,
      name: 'Org Administration',
      wrapper: {
        element: '',
        attributes: {},
      },

    },
    {
      name: 'Org Admin',
      url: '/base',
      icon: 'icon-credit-card',
      children: [
        {
          name: 'Org Admin User',
          url: '/base/payerform',
          icon: 'fa fa-dollar',
        },
        {
          name: 'Facility',
          url: '/base/payerform',
          icon: 'icon-home',
        }
      ],
    },
    {
      title: true,
      name: 'Modus Administration',
      wrapper: {
        element: '',
        attributes: {},
      },

    },
    {
      name: 'Modus Administration',
      url: '/base',
      icon: 'icon-credit-card',
      children: [
        {
          name: 'Modus Administration User',
          url: '/base/modusadmin',
          icon: 'fa fa-dollar',
        },
        {
          name: 'Organization',
          url: '/base/organisation',
          icon: 'icon-home',
        }
      ],
    },


  ],
};*/

const components={
  Home : {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW',
    },
  },
  Modusadmin:{
    name: 'Modus Admin',
    url: '/dashboard',
    icon: 'icon-user',
    children: [
      {
        name: 'Modus Admin User',
        url: '/base/modusadmin',
        icon: 'icon-user-follow',
      },
      {
        name: 'Organization',
        url: '/base/organisation',
        icon: 'icon-home',
      }
    ],
  },
  OrgAdmin:{
    name: 'Administration',
    url: '/base/OrgAdmins',
    icon: 'icon-user',
    children: [
      {
        name: 'Adminsitration User',
        url: '/base/OrgAdmins',
        icon: 'icon-user-follow',
      },
      {
        name: 'Facility',
        url: '/base/Mainfacility',
        icon: 'icon-home',
      },
      /*{
        name: 'Facility-User',
        url: '/base/Facilityuser',
        icon: 'icon-home',
      }*/
    ],
  },
  OrgAdmintitle: {
    title: true,
    name: 'Organization',
    wrapper: {
      element: '',
      attributes: {},
    },

  },
  ModusadminTitle:{
    title: true,
    name: 'Modus Administration',
    wrapper: {
      element: '',
      attributes: {},
    }


}

}
const navconfig={
  Org_Admin:{
    items: [ components.OrgAdmintitle,
      components.OrgAdmin
    ]
},
System_Admin: {
  items: [components.ModusadminTitle,
    components.Modusadmin

  ]
}

}
export
{navconfig}
