import React from 'react';

const Home = React.lazy(() => import('./views/Home/Home'));
const Payerform = React.lazy(() => import('./views/Base/Payerform/Payerform'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));
//const Logintbygoogle = React.lazy(()=>import('./login/Logintbygoogle'))
const ModusAdmin = React.lazy(() => import('./views/Base/ModusAdmin/ModusAdmin'));
const Organisation = React.lazy(() => import('./views/Base/Organisation/Organisation'));
const Neworganisation = React.lazy(() => import('./views/Base/Neworganisation/Neworganisation'));
const OrgAdmins = React.lazy(() => import('./views/Base/OrgAdmins/OrgAdmins'));
const Facilities = React.lazy(() => import('./views/Base/Facilities/Facilities'));
const NewFacility = React.lazy(() => import('./views/Base/Facilities/NewFacility'));
const Mainfacility = React.lazy(() => import('./views/Base/Facilities/Mainfacility'));
const Facilityusers = React.lazy(() => import('./views/Base/Facilityusers/Facilityusers'));
//const Newuser = React.lazy(() => import('./views/Base/Facilityusers/Newuser'));
const Facilityuser = React.lazy(() => import('./views/Base/Facilityusers/Facilityuser'));
const OrgFacility = React.lazy(() => import('./views/Base/Neworganisation/OrgFacility'))



const components={
  Home:{
    path:'/home',name:'Home',component:Home
  },
  Orgadmin : {
    path:'/base/OrgAdmins', name:'OrgAdmins',component:OrgAdmins
},
  Modusadmin:{

    path:'/base/modusadmin',
    name:'Modus-admin',
    component:ModusAdmin,
  },

  ModusAdminorg:{
    path:'/base/organisation',
    name:'Modus-org',
    component:Organisation,

  },
  ModusAdminneworg:{
    path:'/base/Neworganisation',
    name:'Modus-new-org',
    component:Neworganisation,
  },
  Facilities:{
    path:'/base/Facilities',
    name:'Facilities',
    component:Facilities,

  },
NewFacility:{
  path:'/base/NewFacility',
    name:'NewFacility',
    component:NewFacility,

},
Mainfacility:{
  path: '/base/Mainfacility',
  name: 'Mainfacility',
  component: Mainfacility
},
Facilityusers:{
  path: '/base/Facilityusers', name: 'Facilityusers', component: Facilityusers
},
Facilityuser:{
   path: '/base/Facilityuser', name: 'Facilityuser', component: Facilityuser
},
OrgFacility:{
  path:'/base/OrgFacility',name:'OrgFacility',component:OrgFacility
}


};
const rolesConfig={

  Org_Admin:{
    routes:[components.ModusAdminneworg,components.Home,components.Orgadmin,components.Mainfacility,components.Facilities,components.NewFacility,components.Facilityusers,components.Facilityuser]
  },
  System_Admin : {
    routes:[components.Home,components.Modusadmin,components.ModusAdminorg,components.ModusAdminneworg,components.OrgFacility,components.Facilityusers,components.Facilityuser]
  }
}

export {rolesConfig}  ;
//export default routes;
