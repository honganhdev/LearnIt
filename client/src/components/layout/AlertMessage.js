import { Alert, AlertIcon, AlertDescription } from "@chakra-ui/react";

const AlertMessage = ({ info }) => {
  if (info === null) return null;

  const statusMap = {
    success: "success",
    danger: "error",
    warning: "warning",
    info: "info",
  };

  return (
    <Alert status={statusMap[info.type] || "info"} borderRadius="md" mb={4}>
      <AlertIcon />
      <AlertDescription>{info.message}</AlertDescription>
    </Alert>
  );
};

export default AlertMessage;
