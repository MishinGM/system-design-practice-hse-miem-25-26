import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 1000 }, 
    { duration: '20s', target: 1000 },
    { duration: '10s', target: 0 },   
  ],
};

export default function () {
  const url = 'http://nginx:80/api/orders';
  if (Math.random() < 0.8) {
    http.post(url, JSON.stringify({
      user_id: 1,
      amount: Math.random() * 100,
      description: 'storm load'
    }), { headers: { 'Content-Type': 'application/json' } });
  } else {
    http.get(url);
  }
  sleep(0.5);
}
