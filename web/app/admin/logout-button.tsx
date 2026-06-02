"use client";

export default function LogoutButton() {
  async function logout() {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/";
  }
  return (
    <button className="btn ghost" style={{ padding: "7px 14px" }} onClick={logout}>
      Sign out
    </button>
  );
}
