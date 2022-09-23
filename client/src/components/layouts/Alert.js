import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

export const alert = ({ alerts }) => (
  <div className="alert-wrapper">
    {alerts.map((alert) => (
      <div className={`alert alert-${alert.alertType}`} key={alert.id}>
        {alert.msg}
      </div>
    ))}
  </div>
);
alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(alert);
