import logo from '../assets/logo.svg';

export default function Logo({ size = 36, className = '' }) {
  return (
    <img
      src={logo}
      alt="Amanfo '97"
      width={size}
      height={size}
      className={className}
      style={{ width: size, height: size, objectFit: 'contain' }}
    />
  );
}
