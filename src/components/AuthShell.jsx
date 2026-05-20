import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function AuthShell({ title, subtitle, children, footer, back }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 py-10">
      <div className="flex flex-col items-center mb-8 text-center">
        <Logo size={64} />
        <h1 className="mt-5 text-3xl font-bold text-brand">{title}</h1>
        {subtitle && <p className="mt-2 text-gray-500 max-w-md">{subtitle}</p>}
      </div>
      <div className="w-full max-w-md border border-gray-200 rounded-2xl p-7 bg-white">
        {children}
      </div>
      {footer && <div className="mt-5 text-sm text-gray-600">{footer}</div>}
      {back && (
        <Link to={back} className="mt-3 text-sm text-brand font-medium">
          ← Back
        </Link>
      )}
    </div>
  );
}
