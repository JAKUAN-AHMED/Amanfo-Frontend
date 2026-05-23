import { Users, Clock, CheckCircle2 } from 'lucide-react';

export const defaultStats = [
  { label: 'Total Seniors', value: '312', icon: <Users className="text-blue-500" size={22} />, bg: 'bg-blue-50' },
  { label: 'Pending Requests', value: '12', icon: <Clock className="text-amber-500" size={22} />, bg: 'bg-amber-50' },
  { label: 'Active Seniors', value: '254', icon: <CheckCircle2 className="text-emerald-500" size={22} />, bg: 'bg-emerald-50' },
];
