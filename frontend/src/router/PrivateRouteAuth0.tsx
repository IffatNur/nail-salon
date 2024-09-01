import Loading from '@/pages/Loading';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRouteAuth0 = ({component} ) => {
    const Component = withAuthenticationRequired(component, {
        onRedirecting:() => <Loading></Loading>,
    })
    return (
        <Component></Component>
    );
};

export default PrivateRouteAuth0; 