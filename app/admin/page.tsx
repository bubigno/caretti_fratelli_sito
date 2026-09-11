import { getContent } from "@/lib/content";
import AdminDashboard from "@/components/admin/admin-dashboard";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Pannello Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const content = await getContent();
  return <AdminDashboard initialContent={content} />;
}
