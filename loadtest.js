import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '5s', target: 5 },
    { duration: '10s', target: 15 },
    { duration: '5s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<800'],
  },
};

const BASE_URL = 'https://github.com/D4R13NDX/colibri-pwa';

export default function () {
  // Vista 1: Home
  const home = http.get(`${BASE_URL}/`);
  check(home, {
    'status 200 en home': (r) => r.status === 200,
  });

  sleep(1);

  // Vista 2: About (o cualquier otra ruta)
  const about = http.get(`${BASE_URL}/about`);
  check(about, {
    'status 200 en about': (r) => r.status === 200,
  });

  sleep(1);
}
