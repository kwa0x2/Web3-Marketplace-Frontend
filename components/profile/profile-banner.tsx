'use client';

interface ProfileBannerProps {
  bannerUrl?: string | null;
}

export function ProfileBanner({ bannerUrl }: ProfileBannerProps) {
  return (
    <div className="relative h-48 md:h-56">
      {bannerUrl ? (
        <img
          src={bannerUrl}
          alt="Profile banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-blue-900/60 to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(139,92,246,0.3),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_60%,rgba(59,130,246,0.2),transparent_60%)]" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
        </>
      )}
    </div>
  );
}
