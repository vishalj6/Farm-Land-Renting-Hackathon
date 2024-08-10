import React from 'react'

const ProtectedRoutes = ({ children }) => {
    if (!localStorage.getItem('token')) {
        return <div>Invalid Token</div>
        // return <Navigate to="/login" />
    }
    return children;
}

export default ProtectedRoutes