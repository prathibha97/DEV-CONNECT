import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
}) => {
  if (loading) {
    return <div>Loading...</div>;
  }
  if (isAuthenticated) {
    return <Component />;
  }
  return <Navigate to="/login" />;
};

PrivateRoute.prototypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
