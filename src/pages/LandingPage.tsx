import { useState } from "react";



const LandingPage = () => {
    const [loading, setLoading] = useState(false);

    const handleFacebookLogin = () => {
      setLoading(true);
        window.location.href = 'http://localhost:3030/auth/facebook';
      };
  return (
    <>
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '200px'}}>
        <button style={{padding: '20px', backgroundColor: '#ADD8E6'}} onClick={handleFacebookLogin}>{loading ? 'Loading...' : "Click here to Proceed"}</button>
    </div>
    </>
  )
}


export default LandingPage;