// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiURL: 'http://localhost:4020',
  firebaseConfig: {
    apiKey: 'AIzaSyChgwcfEKVbblHZMtbjoSRYE2UcLHYwdXU',
    authDomain: 'view-point-app.firebaseapp.com',
    databaseURL: 'https://view-point-app.firebaseio.com',
    projectId: 'view-point-app',
    storageBucket: 'view-point-app.appspot.com',
    messagingSenderId: '203750769129',
    appId: '1:203750769129:web:f767eff33dcf5c1ee88b78',
    measurementId: 'G-Q7673T0GL2'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
