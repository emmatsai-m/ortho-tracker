import { useAuth } from '../auth/useAuth'
import PageHeader from '../components/layout/PageHeader'
import ProfileForm from '../components/settings/ProfileForm'
import { useProfile } from '../hooks/useProfile'
import { emptyProfile } from '../types/models'

export default function Settings() {
  const { user, logout } = useAuth()
  const { profile, loading, error } = useProfile()

  return (
    <>
      <PageHeader title="設定" back />
      <main className="space-y-6 px-4 py-5">
        <section aria-labelledby="profile-title">
          <h2 id="profile-title" className="mb-2 text-base font-bold">
            療程資料
          </h2>
          {loading && <p className="text-sm text-steel">載入中…</p>}
          {error && (
            <p role="alert" className="rounded-xl bg-amber/10 px-4 py-3 text-sm text-amber">
              {error}
            </p>
          )}
          {!loading && !error && <ProfileForm initial={profile ?? emptyProfile} />}
        </section>

        <section aria-labelledby="account-title">
          <h2 id="account-title" className="mb-2 text-base font-bold">
            帳號
          </h2>
          <div className="rounded-2xl border border-line bg-card p-4">
            <p className="text-sm text-steel">目前登入</p>
            <p className="break-all text-base font-medium">{user?.email}</p>
            <button
              type="button"
              onClick={() => logout()}
              className="mt-4 w-full rounded-xl border border-line py-3 text-base font-medium text-ink active:bg-tide-soft"
            >
              登出
            </button>
          </div>
        </section>
      </main>
    </>
  )
}
