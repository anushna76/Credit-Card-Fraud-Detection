const geoip = require('geoip-lite');

const getGeolocation = (ip) => {
  // For development, use a public IP or mock IP
  const geo = geoip.lookup(ip === '::1' || ip === '127.0.0.1' ? '207.97.227.239' : ip);
  if (geo) {
    return { lat: geo.ll[0], long: geo.ll[1] };
  }
  return { lat: 0, long: 0 }; // Fallback if geolocation fails
};

module.exports = getGeolocation;