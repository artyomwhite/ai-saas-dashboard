import Topbar from "@/components/Topbar";
import Card from "@/components/Card";
import Button from "@/components/Button";

export default function SettingsPage() {
  return (
    <>
      <Topbar title="Settings" subtitle="Manage your account" />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-2xl space-y-5">
          <Card>
            <h2 className="text-base font-semibold tracking-tight text-zinc-50">Profile</h2>
            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-[13px] font-medium text-zinc-400">Full Name</label>
                <input type="text" defaultValue="Alex Morgan" className="input-field mt-1.5" />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-zinc-400">Email</label>
                <input type="email" defaultValue="alex@example.com" className="input-field mt-1.5" />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-zinc-400">Company</label>
                <input type="text" defaultValue="Acme Inc." className="input-field mt-1.5" />
              </div>
            </div>
            <Button className="mt-6">Save Changes</Button>
          </Card>

          <Card>
            <h2 className="text-base font-semibold tracking-tight text-zinc-50">Notifications</h2>
            <div className="mt-5 space-y-4">
              {[
                { label: "Email notifications", checked: true },
                { label: "Weekly digest", checked: true },
                { label: "Product updates", checked: false },
              ].map((item) => (
                <label
                  key={item.label}
                  className="flex items-center justify-between rounded-lg border border-transparent px-1 py-1 transition-colors hover:border-zinc-800/60"
                >
                  <span className="text-[13px] text-zinc-300">{item.label}</span>
                  <input
                    type="checkbox"
                    defaultChecked={item.checked}
                    className="h-4 w-4 rounded border-zinc-700 bg-zinc-800 text-violet-600 focus:ring-violet-500/50"
                  />
                </label>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="text-base font-semibold tracking-tight text-zinc-50">Danger Zone</h2>
            <p className="mt-2 text-[13px] leading-relaxed text-zinc-500">
              Permanently delete your account and all associated data.
            </p>
            <Button
              variant="secondary"
              className="mt-4 border-red-900/40 text-red-400 hover:border-red-800/50 hover:bg-red-950/30"
            >
              Delete Account
            </Button>
          </Card>
        </div>
      </main>
    </>
  );
}
