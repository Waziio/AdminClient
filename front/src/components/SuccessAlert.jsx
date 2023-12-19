/* eslint-disable react/prop-types */
import { Alert, AlertIcon } from "@chakra-ui/react";
import { useEffect } from "react";

export default function SuccessAlert({ isOpen, alertMessage, onClose }) {
  const containerClasses = `w-1/6 fixed top-6 right-10 transition-opacity duration-500 opacity-0 ease-in-out ${isOpen ? 'opacity-100' : ''}`;
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        onClose();
      }, 5000);
    }
  });
  return (
    <div id="success-container" className={containerClasses}>
      <Alert visibility={!isOpen ? "hidden" : "initial"} id="alert" status="success" variant="solid">
        <AlertIcon />
        {alertMessage}
      </Alert>
    </div>
  );
}
