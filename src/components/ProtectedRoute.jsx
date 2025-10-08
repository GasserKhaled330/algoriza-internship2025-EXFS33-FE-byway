import React from 'react';
import UnAuthorized from '../pages/UnAuthorized.jsx';
import { isAuthenticatedAtom, userAtom } from '../Atoms/authAtoms.js';
import { useAtomValue } from 'jotai';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
	const isAuthenticated = useAtomValue(isAuthenticatedAtom);
	const user = useAtomValue(userAtom);

	if (!isAuthenticated) {
		return <Navigate to="/signin" replace />;
	}
	if (allowedRoles && user) {
		const userRoles = user.roles;
		const hasRequiredRole = allowedRoles.some((role) =>
			userRoles.includes(role)
		);
		if (!hasRequiredRole) {
			return <UnAuthorized />;
		}
	}
	return <Outlet />;
};

export default ProtectedRoute;
