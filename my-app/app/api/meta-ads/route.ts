// API route for Meta Ads data
// Note: With static export, this becomes a static JSON file at build time

export const dynamic = 'force-static';
export const revalidate = 30;

// Fallback data when Meta API is not configured
const fallbackData = {
  leads: 0,
  spend: '5.13',
  impressions: 67,
  clicks: 5,
  ctr: '7.46',
  cpm: '0',
  campaignName: 'Katy Leads',
  lastUpdated: new Date().toISOString(),
  source: 'fallback'
};

export async function GET() {
  try {
    // For static export, return fallback data
    // In production with server runtime, this would fetch from Meta API
    return Response.json(fallbackData);
  } catch (error) {
    console.error('Meta API Error:', error);
    return Response.json(fallbackData);
  }
}
