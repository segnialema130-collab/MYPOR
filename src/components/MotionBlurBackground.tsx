export function MotionBlurBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#050505]"
    >
      {/* Subtle warm orange ambient glow */}
      <div
        className="absolute -top-32 left-1/4 h-[480px] w-[480px] rounded-full bg-orange-600/18 blur-[140px]"
      />
      <div
        className="absolute bottom-0 right-1/5 h-[440px] w-[440px] rounded-full bg-amber-500/14 blur-[140px]"
      />

      {/* Primary sweeping motion-blur layer from uploaded orange & black background */}
      <img
        src="/assets/aistudio/image_d710e069.png"
        alt=""
        referrerPolicy="no-referrer"
        className="animate-motion-blur-a absolute inset-0 h-full w-full object-cover opacity-90 blur-[14px] will-change-transform"
      />

      {/* Secondary counter-drifting optical motion-blur trail */}
      <img
        src="/assets/aistudio/image_d710e069.png"
        alt=""
        referrerPolicy="no-referrer"
        className="animate-motion-blur-b absolute inset-0 h-full w-full object-cover opacity-55 mix-blend-screen blur-[32px] will-change-transform"
      />

      {/* Measured dark scrim preserving text contrast while highlighting orange light leaks */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/45 via-[#050505]/30 to-[#050505]/65" />
    </div>
  );
}
