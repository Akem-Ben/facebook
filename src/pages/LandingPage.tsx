import { useState } from "react";



const LandingPage = () => {
    const [loading, setLoading] = useState(false);

    const handleFacebookLogin = () => {
      setLoading(true);
        window.location.href = 'http://localhost:3030/auth/facebook';
      };
  return (
    <>
    <div className="flex justify-center items-center h-screen bg-red-800">
        <button className="p-4 border hover:text-white hover:bg-transparent rounded-xl bg-black text-white" onClick={handleFacebookLogin}>{loading ? 'Loading...' : "Click here to Register"}</button>
    </div>
    </>
  )
}


export default LandingPage;