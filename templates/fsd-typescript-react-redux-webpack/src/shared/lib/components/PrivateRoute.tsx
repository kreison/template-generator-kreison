import { FC } from 'react';
import { Navigate } from 'react-router-dom';


interface PrivateRouteProps {
  condition: boolean,
  component: JSX.Element,
  navigateRoute?: string,
  [key: string]: unknown
}


const PrivateRoute: FC<PrivateRouteProps> = (props) => {
  const { condition, component, navigateRoute = 'FIX_ME PATHS DEFAULT' } = props;
  if (!condition) {
    return <Navigate to={navigateRoute} />;
  }

  return component;
};

export default PrivateRoute;
