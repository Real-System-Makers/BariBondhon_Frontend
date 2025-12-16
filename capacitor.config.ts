import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.baribondhon.app',
  appName: 'BariBondhu',
  webDir: 'out',
  server: {
    // Development: using local IP so both iOS and Android simulators can connect
    url: 'http://172.20.10.2:3000',
    cleartext: true,
    androidScheme: 'http',
    iosScheme: 'http',
  },
  ios: {
    contentInset: 'always',
  },
  android: {
    allowMixedContent: true,
  },
};

export default config;
