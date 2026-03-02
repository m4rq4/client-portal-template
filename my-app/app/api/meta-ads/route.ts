import type { NextRequest } from 'next/server';

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

export async function GET(request: NextRequest) {
  try {
    // Check for Meta API credentials
    const accessToken = process.env.META_ACCESS_TOKEN;
    const campaignId = process.env.META_CAMPAIGN_ID;

    if (!accessToken || !campaignId) {
      console.log('Meta API not configured, using fallback data');
      return Response.json(fallbackData);
    }

    // Fetch from Meta Marketing API
    const baseUrl = 'https://graph.facebook.com/v18.0';
    const insightsUrl = `${baseUrl}/${campaignId}/insights`;
    
    const params = new URLSearchParams({
      access_token: accessToken,
      fields: 'spend,impressions,clicks,ctr,campaign_name',
      date_preset: 'maximum'
    });

    const response = await fetch(`${insightsUrl}?${params}`, {
      next: { revalidate: 30 } // Cache for 30 seconds
    });

    if (!response.ok) {
      throw new Error(`Meta API error: ${response.status}`);
    }

    const data = await response.json();
    const insights = data.data?.[0] || {};
    
    const spend = parseFloat(insights.spend || 0);
    const impressions = parseInt(insights.impressions || 0);
    const clicks = parseInt(insights.clicks || 0);
    const cpm = impressions > 0 ? ((spend / impressions) * 1000).toFixed(2) : '0';
    
    return Response.json({
      leads: 0, // Would need conversion data from Pixel
      spend: spend.toFixed(2),
      impressions,
      clicks,
      ctr: parseFloat(insights.ctr || 0).toFixed(2),
      cpm,
      campaignName: insights.campaign_name || 'Katy Leads',
      lastUpdated: new Date().toISOString(),
      source: 'meta_api'
    });

  } catch (error) {
    console.error('Meta API Error:', error);
    return Response.json(fallbackData);
  }
}
