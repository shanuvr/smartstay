import React, { useEffect } from 'react';

const TawkToChat = () => {
  useEffect(() => {
    // Prevent injecting the script multiple times if the component re-mounts
    if (document.getElementById('tawkto-script')) return;

    const s1 = document.createElement("script");
    const s0 = document.getElementsByTagName("script")[0];
    
    s1.id = 'tawkto-script';
    s1.async = true;
    s1.src = 'https://embed.tawk.to/6a72f2b624e5411d4460cefc/1jv8g879m';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    
    if (s0 && s0.parentNode) {
      s0.parentNode.insertBefore(s1, s0);
    } else {
      document.head.appendChild(s1);
    }

    return () => {
      // Cleanup is typically not required for TawkTo, but if we wanted to remove it:
      // const script = document.getElementById('tawkto-script');
      // if (script) script.remove();
    };
  }, []);

  return null; // This component doesn't render any visible UI itself
};

export default TawkToChat;
