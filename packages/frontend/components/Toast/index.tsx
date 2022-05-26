import React from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const ToastMessage = ({ type, message }: any) =>
  // @ts-ignore
  toast[type](
    <div style={{ display: "flex", color: "black" }}>
      <div style={{ flexGrow: 1, fontSize: 15, padding: "8px 12px" }}>
        {message}
      </div>
    </div>
  );

ToastMessage.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

ToastMessage.dismiss = toast.dismiss;

export default ToastMessage;
