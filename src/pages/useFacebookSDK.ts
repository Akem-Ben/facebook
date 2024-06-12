import { config } from 'process';
import { useEffect } from 'react';

declare global {
    interface Window {
      FB: any;
    }
  }
const useFacebookSDK = () => {

  useEffect(() => {
    if (window.FB) return;

    const fbScript = document.createElement('script');
    fbScript.src = 'https://connect.facebook.net/en_US/sdk.js';
    fbScript.async = true;
    fbScript.defer = true;
    fbScript.onload = () => {
      window.FB.init({
        appId: "439734552021456",
        cookie: true,
        xfbml: true,
        version: 'v10.0',
        config_id: "829573668571256"
      });
    };

    document.body.appendChild(fbScript);

    return () => {
      if (fbScript.parentNode) {
        fbScript.parentNode.removeChild(fbScript);
      }
    };
  }, []);
};

export default useFacebookSDK;
