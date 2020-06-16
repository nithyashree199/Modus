import React from 'react';

const Payerform = React.lazy(() => import('./views/Base/Payerform/Payerform'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/base/Payerform', name: 'Payerform', component: Payerform },
];

export default routes;
