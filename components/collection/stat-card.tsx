export function StatCard({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="bg-[#111] rounded-xl p-4 ring-1 ring-white/[0.06]">
      <p className="text-gray-500 text-xs uppercase tracking-wider mb-1.5">{label}</p>
      <p className="text-white text-lg font-bold">{value}</p>
    </div>
  );
}
