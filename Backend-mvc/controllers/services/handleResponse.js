const handleResponse = (
  res,
  status,
  message,
  error = null,
  data = null,
  success
) => {
  return res.status(status).json({ message, error, data, success });
};
// const handleResponseNegative = (res,status,message,error=null,data=null) => {

//   return res.status(status).json({message,sucess:false,error,data})
// }
module.exports = handleResponse;
