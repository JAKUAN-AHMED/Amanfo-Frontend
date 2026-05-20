import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import AuthShell from '../components/AuthShell';

export default function RequestSuccess() {
  return (
    <AuthShell title="Request Submitted">
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
          <Clock size={36} />
        </div>
        <p className="text-gray-600">
          Thanks! Your membership request has been received. Our admin team will review your
          details and notify you by email within 1–3 business days.
        </p>
        <Link
          to="/"
          className="mt-6 w-full bg-brand-dark hover:bg-brand text-white font-semibold py-3 rounded-lg text-center"
        >
          Back to Home
        </Link>
      </div>
    </AuthShell>
  );
}
