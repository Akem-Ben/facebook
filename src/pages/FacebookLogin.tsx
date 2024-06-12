import React, { useState } from 'react';
import useFacebookSDK from './useFacebookSDK';

declare global {
  interface Window {
    FB: any;
  }
}

const FacebookLogin: React.FC = () => {
  useFacebookSDK();

  const [accessToken, setAccessToken] = useState<string | null>(null);
  
  const handleLogin = () => {
    window.FB.login((response: any) => {
      if (response.authResponse) {
        const { accessToken } = response.authResponse;
        setAccessToken(accessToken);
        fetchFacebookData(accessToken);
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    }, { scope: 'public_profile' });
  };

  const fetchFacebookData = (token: string) => {
    window.FB.api('/me', 'GET', { fields: 'id,name,email', access_token: token }, (response: any) => {
      console.log(response);
    });
  };

//   const sendToServer = (data: any) => {
//     fetch('/saveFacebookData', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log('Success:', data);
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
//   };

  return (
    <>
    <button onClick={handleLogin}>
      Login with Facebook
    </button>
  </>
  );
};

export default FacebookLogin;
