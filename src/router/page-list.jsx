import { lazy } from 'react';

const pageList = {
  privates: [
    {
      path: '/',
      component: lazy(() => import('@/pages/private/index')),
    },
    {
      path: '/dashboard',
      component: lazy(() => import('@/pages/private/dashboard')),
    },
    {
      path: '/dashboard/monitoring',
      component: lazy(() =>
        import('@/pages/private/dashboard/MobileView/main')
      ),
    },
    // {
    //   path: '/dashboard/monitoring-grading',
    //   component: lazy(() =>
    //     import('@/pages/private/dashboard/MobileView/MonitoringGrading')
    //   ),
    // },
    // {
    //   path: '/dashboard/demografi-buah',
    //   component: lazy(() =>
    //     import('@/pages/private/dashboard/MobileView/DemografiBuah')
    //   ),
    // },
    {
      path: '/dashboard/riwayat-pemeriksaan/:id',
      component: lazy(() =>
        import('@/pages/private/factory/riwayat-pemeriksaan/detail')
      ),
    },
    {
      path: '/factory',
      component: lazy(() => import('@/pages/private/factory/')),
    },
    {
      path: '/factory/:factoryId/vendor',
      component: lazy(() => import('@/pages/private/factory/vendor')),
    },
    {
      path: '/factory/:factoryId/riwayat-pemeriksaan',
      component: lazy(() =>
        import('@/pages/private/factory/riwayat-pemeriksaan')
      ),
    },
    {
      path: '/factory/:factoryId/riwayat-pemeriksaan/:historyId',
      component: lazy(() =>
        import('@/pages/private/factory/riwayat-pemeriksaan/detail')
      ),
    },
    {
      path: '/factory/:factoryId/history-maintenance',
      component: lazy(() => import('@/pages/private/factory/history-maintenance')),
    },
    {
      path: '/factory/:factoryId/history-maintenance/:mesinId',
      component: lazy(() => import('@/pages/private/factory/history-maintenance/detail-mesin')),
    },
    {
      path: '/factory/:factoryId/history-maintenance/:mesinId/:maintenanceId',
      component: lazy(() => import('@/pages/private/factory/history-maintenance/detail-maintenance')),
    },
    {
      path: '/user-access',
      component: lazy(() => import('@/pages/private/user-access')),
    },
    {
      path: '/profile',
      component: lazy(() => import('@/pages/private/profile')),
    },
    {
      path: '/profile/change-password',
      component: lazy(() => import('@/pages/private/profile/change-password')),
    },
  ],
  auth: [
    {
      path: 'login',
      component: lazy(() => import('@/pages/auth/login')),
    },
  ],
};

export default pageList;
