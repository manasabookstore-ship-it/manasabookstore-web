import type { Metadata } from "next";

import { ProfileView } from "@/components/site/ProfileView";

export const metadata: Metadata = {
  title: "Profile | Manasa Book Center",
};

export default function ProfilePage() {
  return <ProfileView />;
}

