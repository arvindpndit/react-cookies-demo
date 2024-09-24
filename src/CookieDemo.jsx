import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

function CookieDemo() {
  const [showBanner, setShowBanner] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    const consent = Cookies.get('cookieConsent');
    if (consent === 'true') {
      setConsentGiven(true);
    } else {
      setShowBanner(true);
    }
  }, []);

  const setCookie = () => {
    if (consentGiven) {
      Cookies.set('user', 'Arvind', { expires: 7 });
      alert('Cookie set successfully');
    } else {
      alert('Cannot set cookie without consent');
    }
  };

  const getCookie = () => {
    const user = Cookies.get('user');
    alert(user ? `User: ${user}` : 'No user cookie found');
  };

  const removeCookie = () => {
    Cookies.remove('user');
    alert('User cookie removed');
  };

  const acceptCookies = () => {
    Cookies.set('cookieConsent', 'true', { expires: 365 });
    setConsentGiven(true);
    setShowBanner(false);
  };

  const declineCookies = () => {
    Cookies.set('cookieConsent', 'false', { expires: 365 });
    setConsentGiven(false);
    setShowBanner(false);
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '20px',
        }}
      >
        <button onClick={setCookie} disabled={!consentGiven}>
          Set Cookie
        </button>
        <button onClick={getCookie}>Get Cookie</button>
        <button onClick={removeCookie}>Remove Cookie</button>
        <p>Consent Status: {consentGiven ? 'Granted' : 'Not Granted'}</p>
      </div>

      {showBanner && (
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#f0f0f0',
            padding: '15px',
            textAlign: 'center',
            boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <p style={{ marginBottom: '10px', color: 'black' }}>
            This website uses cookies to enhance your browsing experience. By
            accepting, you agree to our use of cookies.
          </p>
          <button style={{ marginRight: '10px' }} onClick={acceptCookies}>
            Accept
          </button>
          <button onClick={declineCookies}>Decline</button>
        </div>
      )}
    </div>
  );
}

export default CookieDemo;

