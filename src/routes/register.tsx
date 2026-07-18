import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Link } from '@/lib/next-shims';
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Check } from 'lucide-react';
import { logoUrl } from '@/lib/products';

const Brand = ({ className = '' }: { className?: string }) => (
  <div className={`inline-flex items-center gap-2.5 ${className}`}>
    <img src={logoUrl} alt="Aerova" className="w-10 h-10 rounded-xl object-cover shadow-sm" />
    <div className="flex flex-col leading-none">
      <span className="font-sans text-2xl text-[#1e293b]">Aerova<span className="text-[#00B4E6]">.</span></span>
      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#94a3b8] mt-0.5">Air Mineral</span>
    </div>
  </div>
);

function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Password tidak cocok!');
      return;
    }
    console.log('Register submitted:', formData);
  };

  const inputBase =
    'w-full pl-11 pr-4 py-3 bg-white border border-[#e8ecf1] rounded-full text-sm outline-none focus:border-[#00B4E6] focus:ring-4 focus:ring-[#00B4E6]/10 transition-all';

  return (
    <div className="min-h-screen bg-[#fafbfc] text-[#1e293b] flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-white border-r border-[#e8ecf1] flex-col justify-between p-12">
        <div
          className="absolute -top-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-gradient-to-br from-[#00B4E6]/15 to-transparent blur-3xl"
          aria-hidden
        />
        <div
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gradient-to-tr from-[#e8ecf1] to-transparent blur-3xl"
          aria-hidden
        />

        <Link href="/">
          <Brand />
        </Link>

        <div className="relative space-y-6 max-w-md">
          <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[#00B4E6]">
            Gabung sekarang
          </span>
          <h1 className="font-sans text-5xl xl:text-6xl leading-[1.05] text-[#1e293b]">
            Hidrasi keluarga, <span className="text-[#00B4E6]">jadi lebih mudah.</span>
          </h1>
          <p className="text-[#94a3b8] text-base">
            Daftar gratis dan nikmati harga pabrik untuk Aerova cup 220ml, botol 600ml, hingga pembelian per dus.
          </p>

          <ul className="space-y-3 pt-4">
            {[
              'Gratis biaya registrasi',
              'Harga spesial pembelian dus',
              'Penawaran eksklusif untuk member',
            ].map((line) => (
              <li key={line} className="flex items-center gap-3">
                <span className="w-7 h-7 inline-flex items-center justify-center rounded-full bg-[#00B4E6]/10 text-[#00B4E6]">
                  <Check className="w-3.5 h-3.5" strokeWidth={3} />
                </span>
                <span className="text-sm text-[#1e293b] font-medium">{line}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-[#94a3b8]">
          © {new Date().getFullYear()} PT Aerova · Air Mineral
        </p>
      </div>

      {/* Right panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10 overflow-y-auto">
        <div className="w-full max-w-md py-8">
          <Link href="/" className="lg:hidden inline-block mb-10">
            <Brand />
          </Link>

          <div className="mb-8">
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[#00B4E6]">
              Daftar
            </span>
            <h2 className="font-sans text-4xl text-[#1e293b] mt-2 leading-tight">
              Buat akun Aerova.
            </h2>
            <p className="text-sm text-[#94a3b8] mt-2">
              Isi data di bawah untuk mulai memesan air mineral Aerova.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { name: 'fullName', label: 'Nama Lengkap', type: 'text', icon: User, placeholder: 'John Doe' },
              { name: 'email', label: 'Email', type: 'email', icon: Mail, placeholder: 'you@example.com' },
              { name: 'phone', label: 'Nomor Telepon', type: 'tel', icon: Phone, placeholder: '+62 812 3456 7890' },
            ].map(({ name, label, type, icon: Icon, placeholder }) => (
              <div key={name}>
                <label
                  htmlFor={name}
                  className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#94a3b8] mb-2"
                >
                  {label}
                </label>
                <div className="relative">
                  <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
                  <input
                    type={type}
                    name={name}
                    id={name}
                    placeholder={placeholder}
                    value={(formData as any)[name]}
                    onChange={handleChange}
                    required
                    className={inputBase}
                  />
                </div>
              </div>
            ))}

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#94a3b8] mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-11 py-3 bg-white border border-[#e8ecf1] rounded-full text-sm outline-none focus:border-[#00B4E6] focus:ring-4 focus:ring-[#00B4E6]/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#1e293b] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#94a3b8] mb-2"
              >
                Konfirmasi Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-11 py-3 bg-white border border-[#e8ecf1] rounded-full text-sm outline-none focus:border-[#00B4E6] focus:ring-4 focus:ring-[#00B4E6]/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#1e293b] transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <label className="flex items-start gap-2 text-xs text-[#94a3b8] pt-2">
              <input
                type="checkbox"
                className="w-3.5 h-3.5 mt-0.5 rounded border-[#e8ecf1] accent-[#00B4E6]"
                required
              />
              <span>
                Saya setuju dengan{' '}
                <Link href="/terms" className="text-[#1e293b] font-semibold hover:text-[#00B4E6]">
                  Syarat & Ketentuan
                </Link>{' '}
                dan{' '}
                <Link href="/privacy" className="text-[#1e293b] font-semibold hover:text-[#00B4E6]">
                  Kebijakan Privasi
                </Link>
              </span>
            </label>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#1e293b] text-white px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-[#00B4E6] transition-all active:scale-[0.98] mt-2"
            >
              Daftar Sekarang
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="relative my-8 flex items-center gap-4">
            <div className="flex-1 border-t border-[#e8ecf1]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#94a3b8]">
              atau
            </span>
            <div className="flex-1 border-t border-[#e8ecf1]" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {['Google', 'Facebook'].map((provider) => (
              <button
                key={provider}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-white border border-[#e8ecf1] rounded-full text-xs font-semibold text-[#1e293b] hover:border-[#1e293b]/30 transition-colors"
              >
                {provider}
              </button>
            ))}
          </div>

          <p className="text-center text-sm text-[#94a3b8] mt-8">
            Sudah punya akun?{' '}
            <Link
              href="/login"
              className="text-[#1e293b] font-semibold hover:text-[#00B4E6] transition-colors"
            >
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute('/register')({ component: RegisterPage });
