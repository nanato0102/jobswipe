"use client";

import RoleGuard from "@/components/RoleGuard";
import StudentMobileTabs from "@/components/StudentMobileTabs";
import ChatView from "@/components/ChatView";

export default function StudentChatPage() {
  return (
    <RoleGuard allowedRoles={["STUDENT", "ADMIN"]}>
      <StudentMobileTabs>
        <ChatView />
      </StudentMobileTabs>
    </RoleGuard>
  );
}
