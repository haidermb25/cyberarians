import { AdminSidebar } from '@/components/admin-sidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex bg-background min-h-screen">
      <div className="sticky top-0 h-screen">
        <AdminSidebar />
      </div>
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
