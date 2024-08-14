import { Navigate } from 'react-router-dom';

const DashboardPage = () => {
  return <Navigate to='/dashboard/monitoring' replace={true} />;
};

export default DashboardPage;
