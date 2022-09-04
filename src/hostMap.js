const map = {
  '//localhost:8080': 'production-url',
  '//localhost:10811': 'production-url'
};

export default function hostMap(host) {
  if (process.env.NODE_ENV === 'production') return map[host];
  return host;
}
