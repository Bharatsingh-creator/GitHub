import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const completeOAuthLogin = async () => {
      const token = new URLSearchParams(window.location.search).get("token");

      if (!token) {
        navigate("/", { replace: true });
        return;
      }

      try {
        const { data: profile } = await axios.get(
          "http://localhost:5000/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const session = {
          ...profile,
          _id: profile?._id || profile?.id,
          token,
        };

        localStorage.setItem("user", JSON.stringify(session));
        localStorage.setItem("userInfo", JSON.stringify(session));
        navigate("/dashboard", { replace: true });
      } catch (error) {
        console.error("OAuth profile fetch failed:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("userInfo");
        navigate("/", { replace: true });
      }
    };

    completeOAuthLogin();
  }, [navigate]);

  return <div>Logging you in with Google...</div>;
};

export default OAuthSuccess;
