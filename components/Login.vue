<script setup lang="ts">
import { useTheme } from '~~/stores/theme';

interface User {
  active: boolean;
  client_id: string;
  exp: number;
  scope: string;
  username: string;
}

const router = useRouter();
const theme = useTheme();

const user = ref<null | User>(null);
const showLogout = ref(false);

const config = {
  client_id: 'MnAvOTj1GZEd4T53fBks7Yt2HJgrXlH19eHvglpV',
  redirect_uri: 'http://localhost:5500/',
  // client_id: "QvlD4fErAEibxoL2pJ8NIbNxemP3cqfyKyfX6PRG",
  // redirect_uri: "http://localhost:3200/callback",
  authorization_endpoint: 'https://effis.jrc.ec.europa.eu/oauth2/authorize',
  token_endpoint: 'https://effis.jrc.ec.europa.eu/oauth2/token',
  requested_scopes: 'openid read write group:dss',
};

function generateRandomString() {
  var array = new Uint32Array(28);
  window.crypto.getRandomValues(array);
  return Array.from(array, (dec) => ('0' + dec.toString(16)).substr(-2)).join(
    ''
  );
}

function sha256(plain: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest('SHA-256', data);
}

async function pkceChallengeFromVerifier(v: string) {
  const hashed = await sha256(v);
  return base64urlencode(hashed);
}

function base64urlencode(str: ArrayBuffer) {
  // Convert the ArrayBuffer to string using Uint8 array to convert to what btoa accepts.
  // btoa accepts chars only within ascii 0-255 and base64 encodes them.
  // Then convert the base64 encoded to base64url encoded
  //   (replace + with -, replace / with _, trim trailing =)
  return btoa(String.fromCharCode.apply(null, new Uint8Array(str) as any))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

const buttonPressed = async (e: any) => {
  e.preventDefault();

  if (!user.value) {
    var state = generateRandomString();
    localStorage.setItem('pkce_state', state);

    // Create and store a new PKCE code_verifier (the plaintext random secret)
    var code_verifier = generateRandomString();
    localStorage.setItem('pkce_code_verifier', code_verifier);

    // Hash and base64-urlencode the secret to use as the challenge
    var code_challenge = await pkceChallengeFromVerifier(code_verifier);

    var url =
      config.authorization_endpoint +
      '?response_type=code' +
      '&client_id=' +
      encodeURIComponent(config.client_id) +
      '&state=' +
      encodeURIComponent(state) +
      '&scope=' +
      encodeURIComponent(config.requested_scopes) +
      '&redirect_uri=' +
      encodeURIComponent(config.redirect_uri) +
      '&code_challenge=' +
      encodeURIComponent(code_challenge) +
      '&code_challenge_method=S256';
    // Redirect to the authorization server
    window.location = url as any;
  } else {
    showLogout.value = true;
  }
};

function sendPostRequest(
  url: string,
  params: { [key: string]: string },
  success: (r: any, b: any) => void,
  error: (r: any, b: any) => void
) {
  var request = new XMLHttpRequest();
  request.open('POST', url, true);
  request.setRequestHeader(
    'Content-Type',
    'application/x-www-form-urlencoded; charset=UTF-8'
  );
  request.onload = function () {
    var body = {};
    try {
      body = JSON.parse(request.response);
    } catch (e) {}

    if (request.status == 200) {
      success(request, body);
    } else {
      error(request, body);
    }
  };
  request.onerror = function () {
    error(request, {});
  };
  var body = Object.keys(params)
    .map((key) => key + '=' + params[key])
    .join('&');
  request.send(body);
}

async function getUserInfo() {
  // e.preventDefault();
  var request = new XMLHttpRequest();
  request.open('GET', 'http://localhost:8002/current_user', true);
  request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  request.setRequestHeader(
    'Authorization',
    'Bearer ' + localStorage.getItem('access_token')
  );
  request.onload = function () {
    var body = {};
    try {
      body = JSON.parse(request.response);
    } catch (e) {}

    if (request.status == 200) {
      user.value = body as User;
    } else {
      console.error(body);
    }
  };
  request.onerror = function (e) {
    console.error(e);
  };
  //var body = Object.keys(params).map(key => key + '=' + params[key]).join('&');
  request.send({} as any);
}

function logout() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('pkce_code_verifier');
  localStorage.removeItem('pkce_state');
  user.value = null;
  showLogout.value = false;
}

onMounted(() => {
  const code = router.currentRoute.value.query.code;
  const state = router.currentRoute.value.query.state;

  if (code && state) {
    // Verify the state matches our stored state (to prevent cross-site request forgery
    if (localStorage.getItem('pkce_state') != state) {
      alert('Invalid state');
    } else {
      // Exchange the authorization code for an access token
      sendPostRequest(
        config.token_endpoint,
        {
          grant_type: 'authorization_code',
          code: code as string,
          client_id: config.client_id,
          redirect_uri: config.redirect_uri,
          code_verifier: localStorage.getItem('pkce_code_verifier') as string,
        },
        function (request, body) {
          // Initialize your application now that you have an access token.
          // Here we just display it in the browser.
          /****************************************************************
           *
           *  Use  JOSE (or something similar) to validate the tokens before
           * storing them
           * https://jose.readthedocs.io/en/latest/#javascript-object-signing-and-encryption-jose
           *
           ****************************************************************/
          localStorage.setItem('access_token', body.access_token);
          localStorage.setItem('refresh_token', body.refresh_token);
          //localStorage.setItem("id_token", body.id_token);

          // Replace the history entry to remove the auth code from the browser address bar
          // @ts-ignore
          window.history.replaceState({}, null, '/');

          getUserInfo();
        },
        function (request, error) {
          // This could be an error response from the OAuth server, or an error because the
          // request failed such as if the OAuth server doesn't allow CORS requests
          console.error(error);
        }
      );
    }

    // Clean these up since we don't need them anymore
    localStorage.removeItem('pkce_state');
    localStorage.removeItem('pkce_code_verifier');

    // remove the code and state from the URL
    const query = router.currentRoute.value.query;
    delete query.code;
    delete query.state;
    router.replace({ query });
  } else if (localStorage.getItem('access_token')) {
    getUserInfo();
  }
});
</script>

<template>
  <v-btn
    icon
    border="none"
    variant="flat"
    color="transparent"
    @click="buttonPressed($event)"
  >
    <v-tooltip activator="parent" location="bottom">{{
      !user ? 'Login' : user.username
    }}</v-tooltip>

    <v-icon v-if="user === null" icon="mdi-account-circle"></v-icon>

    <v-icon
      v-if="user"
      :icon="`mdi-alpha-${user.username.slice(0, 1)}`"
      color="green"
    ></v-icon>
  </v-btn>

  <v-dialog v-model="showLogout" max-width="290">
    <v-card :class="`mx-auto ${theme.dark ? 'dark-card' : 'ligth-card'}`">
      <v-card-title class="headline">Logout</v-card-title>

      <v-card-text>Are you sure you want to logout?</v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="showLogout = false">
          Cancel
        </v-btn>
        <v-btn color="blue darken-1" text @click="logout"> Logout </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
