import { lazy } from 'react';

const pageList = {
  privates: [
    {
      path: '/',
      component: lazy(() => import('@/pages/private/dashboard')),
    },
    {
      path: '/dashboard',
      component: lazy(() => import('@/pages/private/dashboard')),
    },
    {
      path: '/dashboard/monitoring',
      component: lazy(() => import('@/pages/private/dashboard/monitoring')),
    },
    {
      path: '/dashboard/demografi',
      component: lazy(() => import('@/pages/private/dashboard/demografi')),
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
