import requestIp from 'request-ip';
import geoip from 'geoip-lite';

export default (req, res) => {
  const clientIp = requestIp.getClientIp(req)
      .replace('::1', '')
      .replace('127.0.0.1', '') || '76.169.76.173' // <-- default location `KY`
  const geo = geoip.lookup(clientIp)
  res.status(200).json({ geo })
}