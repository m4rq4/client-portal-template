import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MetricAnalysisProps {
  metric: string;
  data: {
    leads: number;
    spend: string;
    impressions: number;
    clicks: number;
    ctr: string;
    cpm: string;
    cpc?: string;
  };
  onClose: () => void;
}

export function MetricAnalysis({ metric, data, onClose }: MetricAnalysisProps) {
  const cpc = data.cpc || (parseFloat(data.spend) / (data.clicks || 1)).toFixed(2);
  
  const analyses: Record<string, { 
    title: string; 
    status: string; 
    statusColor: string; 
    explanation: string; 
    why: string 
  }> = {
    impressions: {
      title: 'Impressions',
      status: data.impressions >= 1000 ? '🟢 GOOD' : data.impressions >= 100 ? '🔵 BUILDING' : '🟡 STARTING',
      statusColor: data.impressions >= 1000 ? 'bg-green-500/20 text-green-400' : data.impressions >= 100 ? 'bg-blue-500/20 text-blue-400' : 'bg-amber-500/20 text-amber-400',
      explanation: `Impressions measure how many times your ad was displayed. You've reached ${data.impressions.toLocaleString()} people. Real estate campaigns typically need 1,000+ impressions daily for meaningful data.`,
      why: data.impressions >= 1000 
        ? 'Your targeting is reaching a healthy audience size. Good visibility in your target market.' 
        : data.impressions >= 100 
        ? 'Campaign is building reach. Consider expanding audience or increasing budget for faster data collection.'
        : 'Campaign just started. Impressions will grow as the algorithm optimizes. Monitor for first 48-72 hours.'
    },
    clicks: {
      title: 'Clicks',
      status: data.clicks >= 10 ? '🟢 GOOD' : data.clicks >= 3 ? '🔵 BUILDING' : '🟡 LOW',
      statusColor: data.clicks >= 10 ? 'bg-green-500/20 text-green-400' : data.clicks >= 3 ? 'bg-blue-500/20 text-blue-400' : 'bg-amber-500/20 text-amber-400',
      explanation: `${data.clicks} people clicked your ad to learn more. This shows genuine interest from homeowners. Each click represents someone actively considering selling their home for cash.`,
      why: data.clicks >= 10 
        ? 'Strong engagement. People are interested in your cash offer messaging.' 
        : data.clicks >= 3 
        ? 'Getting traction. As impressions grow, clicks will follow if CTR stays healthy.'
        : 'Need more data. Focus on improving CTR first, then scale impressions.'
    },
    leads: {
      title: 'Leads',
      status: data.leads >= 1 ? '🟢 ACTIVE' : '⚪ WAITING',
      statusColor: data.leads >= 1 ? 'bg-green-500/20 text-green-400' : 'bg-slate-500/20 text-slate-400',
      explanation: data.leads >= 1 
        ? `${data.leads} homeowners have submitted their contact info. These are qualified leads - people who want a cash offer on their home.` 
        : 'No leads yet. This is normal in the first few hours of a campaign. Leads typically come after 20-50 clicks depending on landing page conversion.',
      why: data.leads >= 1 
        ? 'Your funnel is working! Follow up quickly - cash buyers who respond within 5 minutes have 80% higher conversion rates.' 
        : 'Watch your landing page load speed and form fields. Each extra field reduces conversions by 11%.'
    },
    spend: {
      title: 'Ad Spend',
      status: parseFloat(data.spend) >= 10 ? '🟢 ACTIVE' : parseFloat(data.spend) >= 3 ? '🔵 STARTING' : '⚪ NEW',
      statusColor: parseFloat(data.spend) >= 10 ? 'bg-green-500/20 text-green-400' : parseFloat(data.spend) >= 3 ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-500/20 text-slate-400',
      explanation: `You've spent $${data.spend} of your daily budget.`,
      why: parseFloat(data.spend) >= 10 
        ? 'Good daily spend rate. Budget is being used efficiently throughout the day.' 
        : parseFloat(data.spend) >= 3 
        ? 'Campaign ramping up. Spend accelerates as Meta finds your best audience.'
        : 'Campaign just started. Spend typically increases in hours 2-6 as algorithm optimizes.'
    },
    ctr: {
      title: 'Click-Through Rate (CTR)',
      status: parseFloat(data.ctr) >= 5 ? '🟢 EXCELLENT' : parseFloat(data.ctr) >= 2 ? '🔵 GOOD' : '🟡 NEEDS WORK',
      statusColor: parseFloat(data.ctr) >= 5 ? 'bg-green-500/20 text-green-400' : parseFloat(data.ctr) >= 2 ? 'bg-blue-500/20 text-blue-400' : 'bg-amber-500/20 text-amber-400',
      explanation: `CTR measures how compelling your ad is. Out of ${data.impressions.toLocaleString()} people who saw your ad, ${data.clicks} clicked it. Industry average for real estate is 2-3%.`,
      why: parseFloat(data.ctr) >= 5 
        ? 'Your ad creative (image + headline) is highly engaging. The high CTR means people are responding well to your messaging.' 
        : parseFloat(data.ctr) >= 2 
        ? 'Solid performance. Your ad is resonating with the target audience.'
        : 'Consider testing new images or headlines. Try "We Buy Houses" vs "Cash For Homes" angles.'
    },
    cpm: {
      title: 'Cost Per 1,000 Impressions (CPM)',
      status: parseFloat(data.cpm) <= 15 ? '🟢 EFFICIENT' : parseFloat(data.cpm) <= 25 ? '🔵 NORMAL' : '🟡 HIGH',
      statusColor: parseFloat(data.cpm) <= 15 ? 'bg-green-500/20 text-green-400' : parseFloat(data.cpm) <= 25 ? 'bg-blue-500/20 text-blue-400' : 'bg-amber-500/20 text-amber-400',
      explanation: `CPM shows how much you pay to show your ad 1,000 times. Currently $${data.cpm}. Houston real estate CPM typically ranges $15-30.`,
      why: parseFloat(data.cpm) <= 15 
        ? 'Efficient targeting. Your audience selection is cost-effective.' 
        : parseFloat(data.cpm) <= 25 
        ? 'Normal range for competitive real estate market.'
        : 'High competition for this audience. Consider narrowing targeting or testing different demographics.'
    },
    cpc: {
      title: 'Cost Per Click (CPC)',
      status: parseFloat(cpc) <= 1.5 ? '🟢 GOOD' : parseFloat(cpc) <= 3 ? '🔵 NORMAL' : '🟡 HIGH',
      statusColor: parseFloat(cpc) <= 1.5 ? 'bg-green-500/20 text-green-400' : parseFloat(cpc) <= 3 ? 'bg-blue-500/20 text-blue-400' : 'bg-amber-500/20 text-amber-400',
      explanation: `You're paying $${cpc} per click. Real estate PPC typically costs $1-4 per click depending on competition and targeting precision.`,
      why: parseFloat(cpc) <= 1.5 
        ? 'Excellent cost efficiency. Your targeting and creative are working well together.' 
        : parseFloat(cpc) <= 3 
        ? 'Reasonable cost. Focus on conversion rate to ensure positive ROI.'
        : 'Clicks are expensive. Test broader audiences or improve CTR to bring this down.'
    }
  };

  const analysis = analyses[metric] || analyses.impressions;

  return (
    <div 
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" 
      onClick={onClose}
    >
      <div 
        className="bg-slate-900 rounded-xl border border-slate-700 p-5 max-w-md w-full max-h-[80vh] overflow-y-auto" 
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">{analysis.title}</h3>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className={cn("inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-4", analysis.statusColor)}>
          {analysis.status}
        </div>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-slate-300 mb-2">What This Means</h4>
            <p className="text-sm text-slate-400 leading-relaxed">{analysis.explanation}</p>
          </div>
          
          <div className="bg-slate-800/50 rounded-lg p-3">
            <h4 className="text-sm font-medium text-slate-300 mb-2">Why This Matters</h4>
            <p className="text-sm text-slate-400 leading-relaxed">{analysis.why}</p>
          </div>
        </div>
        
        <Button 
          onClick={onClose}
          className="w-full mt-5"
        >
          Got it
        </Button>
      </div>
    </div>
  );
}
