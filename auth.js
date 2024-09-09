/*
From:
https://aws.amazon.com/blogs/security/how-to-add-authentication-single-page-web-application-with-amazon-cognito-oauth2-implementation/
*/

var auth = {
  /*
    constructor() {
  //    this.myHeaders = new Headers();
   //   this.myHeaders.set('Cache-Control', 'no-store');
    };
  */
  /*
  var urlParams = new URLSearchParams(window.location.search);
  var tokens;
  var domain = "YOUR_COGNITO_DOMAIN_PREFIX";
  var region = "YOUR_REGION";
  var appClientId = "YOUR_APPCLIENT_ID";
  var userPoolId = "YOUR_USERPOOL_ID";
  var redirectURI = "YOUR_REDIRECT_URI";
  */

  login() {
    const path = window.location.pathname;
    let callbackLocation = location.href.replace(path, '/callback.html');
    callbackLocation = callbackLocation.replace('127.0.0.1', 'localhost')
    location.href = `https://atlas-casting-overlay.auth.ap-southeast-2.amazoncognito.com/login?client_id=1h2tmqc97m6jubk0keb05mduf6&response_type=token&scope=openid&redirect_uri=${callbackLocation}`
  },

  logout() {

    window.localStorage.removeItem('tokens');

    const path = window.location.pathname;
    let callbackLocation = location.href.replace(path, '/console.html');
    callbackLocation = callbackLocation.replace('127.0.0.1', 'localhost')
    location.href = `https://atlas-casting-overlay.auth.ap-southeast-2.amazoncognito.com/logout?client_id=1h2tmqc97m6jubk0keb05mduf6&logout_uri=${callbackLocation}`

  },

  qmValidTokenInStorage() {

    var tokens

    try {
      tokens = JSON.parse(window.localStorage.getItem('tokens'));
    } catch (e) {
      window.localStorage.removeItem('tokens');
      tokens = null;
    }

    if (tokens) {
      // local storage contains 'tokens' object...
      if (tokens.received_date && tokens.access_token && tokens.expires_in) {
        // Object hs required properties...
        if (tokens.received_date + tokens.expires_in * 1000 > Date.now()) {
          // token hasn't expired
          return true;
        }
      }
    }
    return false;
  },

  qmGetTokensFromStorage() {
    var tokens = JSON.parse(window.localStorage.getItem('tokens'));

    return tokens || {};
  },


  qmGetTokensFromUrl(location) {
    if (!location.hash) {
      return {};
    }

    const params = new URLSearchParams(location.hash.substring(1));

    return (
      {
        received_date: Date.now(),
        id_token: params.get('id_token'),
        access_token: params.get('access_token'),
        expires_in: params.get('expires_in')
      }
    )
  },

  qmWriteTokensToStorage(tokens) {
    window.localStorage.setItem('tokens', JSON.stringify(tokens));
  },



  /*
    qmWriteTokensToStorage(tokens) {
      window.localStorage.setItem('tokens', JSON.stringify(tokens));
    }
  */
  /*
    qmGetTokensFromUrl(location) {
      if (!location.hash) {
        return {};
      }
  
      const params = new URLSearchParams(location.hash.substring(1));
  
      return (
        {
          received_date: Date.now(),
          id_token: params.get('id_token'),
          access_token: params.get('access_token'),
          expires_in: params.get('expires_in')
        }
      )
    };
  */
  //Convert Payload from Base64-URL to JSON
  decodePayload(payload) {
    const cleanedPayload = payload.replace(/-/g, '+').replace(/_/g, '/');
    const decodedPayload = atob(cleanedPayload)

    const uriEncodedPayload = Array.from(decodedPayload).reduce(function (acc, char) {
      const uriEncodedChar = ('00' + char.charCodeAt(0).toString(16)).slice(-2)
      return acc + '%' + uriEncodedChar
    }, '')

    const jsonPayload = decodeURIComponent(uriEncodedPayload);

    return JSON.parse(jsonPayload)
  },

  //Parse JWT Payload
  parseJWTPayload(token) {
    const [header, payload, signature] = token.split('.');
    const jsonPayload = this.decodePayload(payload);

    return jsonPayload;
  },

  //Parse JWT Header
  parseJWTHeader(token) {
    const [header, payload, signature] = token.split('.');
    const jsonHeader = this.decodePayload(header);

    return jsonHeader;
  },
};

//export default auth;
