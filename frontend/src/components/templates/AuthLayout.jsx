export function AuthLayout({ title, footer, children }) {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-[#2a2438] via-[#352f44] to-[#5c5470]">
      
      <div className="w-full max-w-md bg-[#dbd8e3] p-8 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.4)]">
        
        {/* Title */}
        <h2 className="text-3xl font-bold text-[#2a2438] text-center mb-6">
          {title}
        </h2>

        {/* Form */}
        <div className="space-y-4">
          {children}
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-[#5c5470]">
          {footer}
        </div>

      </div>
    </div>
  );
}