import DashboardPage from "@/app/(dashboard)/DashboardPage";
import InfoBanner from "@/components/InfoBanner";

export default function HomePage() {
  return (
    <DashboardPage title="Home">
      <InfoBanner>Welcome to Adminboard home page!</InfoBanner>
    </DashboardPage>
  );
}
