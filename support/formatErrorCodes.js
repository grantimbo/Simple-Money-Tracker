export const formatAuthCode = (code) => {
  const string = code.replace("auth/", "").replace(/-/g, " ");
  return string.charAt(0).toUpperCase() + string.slice(1);
};
