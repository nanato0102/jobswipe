"use client";

import RoleGuard from "@/components/RoleGuard";
import CompanyMobileTabs from "@/components/CompanyMobileTabs";
import ChatView from "@/components/ChatView";

export default function CompanyChatPage() {
  return (
    <RoleGuard allowedRoles={["COMPANY", "ADMIN"]}>
      <CompanyMobileTabs>
        <ChatView />
      </CompanyMobileTabs>
    </RoleGuard>
  );
}
