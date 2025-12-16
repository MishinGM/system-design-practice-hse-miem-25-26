import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 200 },
    { duration: '1m', target: 200 },
    { duration: '30s', target: 0 },
  ],
};

export default function () {
  const url = 'http://nginx:80/api/orders';

  if (Math.random() < 0.95) {
    http.post(url, JSON.stringify({
      user_id: 1,
      amount: Math.random() * 100,
      description: 'custom load'
    }), { headers: { 'Content-Type': 'application/json' } });
  } else {
    http.get(url);
  }
  sleep(0.5);
}
