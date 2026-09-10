import { getContent } from "@/lib/content";
import AdminDashboard from "@/components/admin/admin-dashboard";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Pannello Admin",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  const content = getContent();
  return <AdminDashboard initialContent={content} />;
}
