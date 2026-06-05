import { Logo } from "@/components/logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-beige px-4">
      <div className="mb-8">
        <Logo width="100%" />
      </div>
      <div className="w-full max-w-md bg-white rounded-3xl shadow-sm p-8">
        {children}
      </div>
    </div>
  );
}
