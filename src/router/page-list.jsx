import { lazy } from 'react';

const pageList = {
  privates: [
    {
      path: '/dashboard',
      component: lazy(() => import('@/pages/private/dashboard')),
    },
    {
      path: '/factory',
      component: lazy(() => import('@/pages/private/factory/')),
    },
    {
      path: '/factory/vendor',
      component: lazy(() => import('@/pages/private/factory/vendor')),
    },
    {
      path: '/factory/riwayat-pemeriksaan',
      component: lazy(() =>
        import('@/pages/private/factory/riwayat-pemeriksaan')
      ),
    },
    {
      path: '/factory/riwayat-pemeriksaan/:id',
      component: lazy(() =>
        import('@/pages/private/factory/riwayat-pemeriksaan/detail')
      ),
    },
    {
      path: '/user-access',
      component: lazy(() => import('@/pages/private/user-access')),
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
