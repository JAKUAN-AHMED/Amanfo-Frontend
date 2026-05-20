import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import AuthShell from '../components/AuthShell';

export default function ResetSuccess() {
  return (
    <AuthShell title="Password Reset Successful">
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
          <CheckCircle2 size={36} />
        </div>
        <p className="text-gray-600">
          Your password has been updated. You can now log in with your new credentials.
        </p>
        <Link
          to="/login"
          className="mt-6 w-full bg-brand-dark hover:bg-brand text-white font-semibold py-3 rounded-lg text-center"
        >
          Back to Login
        </Link>
      </div>
    </AuthShell>
  );
}
