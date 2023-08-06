import { Navigate, useLocation } from 'react-router-dom';
import { UserAuth } from '../provider/AuthContext';

const PrivateRoute = ({children}) => {
    const {user} = UserAuth()
    const location = useLocation()
    if(!user){
        return (<Navigate state={{from: location}} to="/login" replace/>)
    }
    return children
};

export default PrivateRoute;