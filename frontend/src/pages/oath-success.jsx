import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");

    if (token) {
      localStorage.setItem("userInfo", JSON.stringify({ token }));
      navigate("/dashboard");
    }
  }, []);

  return <div>Logging you in...</div>;
};

export default OAuthSuccess;