import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';
import Card from '../../components/ui/Card.jsx';
import Button from '../../components/ui/Button.jsx';
import Input from '../../components/ui/Input.jsx';
import Seo from '../../components/ui/Seo.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { brand } from '../../config/site.js';

const loginSchema = z.object({
  email: z.string().trim().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password is required'),
});

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  if (user) {
    return <Navigate to="/admin" replace />;
  }

  const onSubmit = async (data) => {
    try {
      setServerError('');
      await login(data.email, data.password);
      navigate('/admin');
    } catch (err) {
      setServerError(err.message || 'Invalid email or password. Please try again.');
    }
  };

  return (
    <>
      <Seo title="Admin Login" noindex={true} />

      <div className="min-h-screen bg-[#07070B] flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Logo / Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold font-display text-fg tracking-tight">
              {brand.name} <span className="text-accent">Admin</span>
            </h1>
            <p className="text-sm text-fg-2 mt-1">Sign in to manage projects and inquiries</p>
          </div>

          <Card className="p-8">
            {serverError && (
              <div className="mb-6 p-4 rounded-xl bg-danger/10 border border-danger/20 text-danger text-sm flex items-center gap-3">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{serverError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
              <Input
                label="Admin Email"
                type="email"
                placeholder="admin@example.com"
                error={errors.email?.message}
                {...register('email')}
              />

              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••••"
                  error={errors.password?.message}
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-fg-3 hover:text-fg transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full justify-center"
                  loading={isSubmitting}
                  iconRight={LogIn}
                >
                  Sign In
                </Button>
              </div>
            </form>
          </Card>

          <p className="mt-8 text-center text-xs text-fg-3">
            Protected agency console. Unauthorized access is prohibited.
          </p>
        </div>
      </div>
    </>
  );
}
