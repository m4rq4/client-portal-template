import { TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';

interface CampaignHealthProps {
  data: {
    ctr: string;
    cpc?: string;
    spend: string;
    clicks: number;
  };
}

export function CampaignHealth({ data }: CampaignHealthProps) {
  const cpc = data.cpc || (parseFloat(data.spend) / (data.clicks || 1)).toFixed(2);
  
  const ctrScore = parseFloat(data.ctr) >= 5 ? 2 : parseFloat(data.ctr) >= 2 ? 1 : 0;
  const cpcScore = parseFloat(cpc) <= 1.5 ? 2 : parseFloat(cpc) <= 3 ? 1 : 0;
  const spendScore = parseFloat(data.spend) >= 5 ? 1 : 0;
  const totalScore = ctrScore + cpcScore + spendScore;
  
  let healthStatus, healthColor, summary, improvements;
  
  if (totalScore >= 4) {
    healthStatus = '🟢 STRONG';
    healthColor = 'bg-green-500/20 text-green-400';
    summary = 'Your campaign is performing well across all key metrics. CTR is excellent, costs are efficient, and spend is pacing correctly.';
    improvements = 'To scale: increase daily budget by 20-30% and expand targeting to nearby areas.';
  } else if (totalScore >= 2) {
    healthStatus = '🔵 STABLE';
    healthColor = 'bg-blue-500/20 text-blue-400';
    summary = 'Campaign is running solidly with room for optimization. Main metrics are within acceptable ranges.';
    improvements = parseFloat(data.ctr) < 3 
      ? 'Focus on CTR first - test new headlines like "Cash Offer in 24 Hours" or "We Buy Houses As-Is".'
      : 'Monitor CPC closely. If it rises above $3, narrow your audience to homeowners 35+ with home value $200k+';
  } else {
    healthStatus = '🟡 NEEDS ATTENTION';
    healthColor = 'bg-amber-500/20 text-amber-400';
    summary = 'Campaign needs adjustments to improve efficiency. Low engagement or high costs detected.';
    improvements = 'Priority fixes: 1) Refresh ad creative with newer images, 2) Check landing page loads under 3 seconds, 3) Verify form has only name/phone/email fields.';
  }

  return (
    <div className="bg-slate-800/50 rounded-lg p-4">
      <h4 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
        <CheckCircle className="w-4 h-4" />
        Campaign Health
      </h4>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-300">Overall Status</span>
          <span className={`text-xs px-2 py-1 rounded-full ${healthColor}`}>
            {healthStatus}
          </span>
        </div>
        
        <div className="bg-slate-900/50 rounded-lg p-3">
          <p className="text-sm text-slate-300 mb-1 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            What&apos;s Working
          </p>
          <p className="text-xs text-slate-400">{summary}</p>
        </div>
        
        <div className="bg-slate-900/50 rounded-lg p-3">
          <p className="text-sm text-slate-300 mb-1 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            How to Improve
          </p>
          <p className="text-xs text-slate-400">{improvements}</p>
        </div>
        
        <p className="text-xs text-slate-500 italic mt-2">
          Click any metric above for detailed analysis
        </p>
      </div>
    </div>
  );
}
