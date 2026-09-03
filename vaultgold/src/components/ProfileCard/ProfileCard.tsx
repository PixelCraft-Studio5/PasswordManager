import GlassCard from "../GlassCard/GlassCard";

export default function ProfileCard() {
  return (
    <GlassCard className="flex items-center justify-between p-8">
      <div className="flex items-center gap-6">
        <div className="flex h-24 w-24 items-center justify-center rounded-[30px] bg-[#D4AF37] text-4xl font-bold text-black">
          JD
        </div>

        <div>
          <h2 className="text-4xl font-bold">
            John Doe
          </h2>

          <p className="mt-2 text-lg text-gray-500">
            john@example.com
          </p>
        </div>
      </div>

      <button className="rounded-full px-6 py-3 transition hover:bg-gray-100">
        Edit Profile
      </button>
    </GlassCard>
  );
}