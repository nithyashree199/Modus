export default {
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
      name: 'Administration',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'Billing',
      url: '/base',
      icon: 'icon-credit-card',
      children: [
        {
          name: 'Payer',
          url: '/base/payerform',
          icon: 'fa fa-dollar',
        },
        {
          name: 'Clearing House',
          url: '/base/payerform',
          icon: 'icon-home',
        }
      ],
    },
    
    
  ],
};
