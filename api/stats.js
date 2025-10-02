let views = 0;
let liveUsers = [];

export default function handler(req, res) {
  views += 1;
  const now = Date.now();
  // Remove expired users (older than 5 min)
  liveUsers = liveUsers.filter(ts => now - ts < 5 * 60 * 1000);
  // Add this visit
  liveUsers.push(now);

  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({ pageviews: views, liveUsers: liveUsers.length });
}
