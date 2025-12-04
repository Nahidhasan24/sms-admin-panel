"use client";

import { useState } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  // Top-up Settings
  const [topupSettings, setTopupSettings] = useState({
    min: 10,
    max: 1000,
  });

  // Referral Settings
  const [referralSettings, setReferralSettings] = useState({
    bonusPercent: 5,
    minWithdraw: 50,
    notice:
      "Users are not allowed to use their own referral link. Self-referrals are strictly prohibited and may result in account suspension or a permanent ban",
  });

  // Web Settings
  const [webSettings, setWebSettings] = useState({
    contactMail: "support@example.com",
    newsUrl: "https://example.com/news",
    supportUrl: "https://example.com/support",
  });

  const handleTopupUpdate = () => {
    console.log("Top-up Settings Updated:", topupSettings);
  };

  const handleReferralUpdate = () => {
    console.log("Referral Settings Updated:", referralSettings);
  };

  const handleWebUpdate = () => {
    console.log("Web Settings Updated:", webSettings);
  };

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader page="Settings" />
        <div className="p-4 flex flex-col gap-6">
          {/* Top-up Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Top-up Settings</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-1"></div>
              <div className="flex flex-col gap-1">
                <label className="font-medium">Minimum Amount</label>
                <Input
                  type="number"
                  value={topupSettings.min}
                  onChange={(e) =>
                    setTopupSettings({
                      ...topupSettings,
                      min: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-medium">Maximum Amount</label>
                <Input
                  type="number"
                  value={topupSettings.max}
                  onChange={(e) =>
                    setTopupSettings({
                      ...topupSettings,
                      max: Number(e.target.value),
                    })
                  }
                />
              </div>
              <Button onClick={handleTopupUpdate}>Update Top-up</Button>
            </CardContent>
          </Card>

          {/* Referral Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Referral Settings</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-medium">Referral Bonus %</label>
                <Input
                  type="number"
                  value={referralSettings.bonusPercent}
                  onChange={(e) =>
                    setReferralSettings({
                      ...referralSettings,
                      bonusPercent: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-medium">Minimum Referral Withdraw</label>
                <Input
                  type="number"
                  value={referralSettings.minWithdraw}
                  onChange={(e) =>
                    setReferralSettings({
                      ...referralSettings,
                      minWithdraw: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-medium">Notice</label>
                <Input
                  type="text"
                  value={referralSettings.notice}
                  onChange={(e) =>
                    setReferralSettings({
                      ...referralSettings,
                      notice: e.target.value,
                    })
                  }
                />
              </div>
              <Button onClick={handleReferralUpdate}>Update Referral</Button>
            </CardContent>
          </Card>

          {/* Web Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Web Settings</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-medium">Contact Email</label>
                <Input
                  value={webSettings.contactMail}
                  onChange={(e) =>
                    setWebSettings({
                      ...webSettings,
                      contactMail: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-medium">News URL</label>
                <Input
                  value={webSettings.newsUrl}
                  onChange={(e) =>
                    setWebSettings({ ...webSettings, newsUrl: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-medium">Support URL</label>
                <Input
                  value={webSettings.supportUrl}
                  onChange={(e) =>
                    setWebSettings({
                      ...webSettings,
                      supportUrl: e.target.value,
                    })
                  }
                />
              </div>

              <Button onClick={handleWebUpdate}>Update Web Settings</Button>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
