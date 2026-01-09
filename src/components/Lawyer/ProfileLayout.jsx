import React, { useRef } from "react";
import ProfileSidebar from "./ProfileSidebar";
import Profile from "./Profile";

export default function Settings() {
  const rightScrollRef = useRef(null);

  return (
    <div className="h-[90dvh] w-full ml-5 mt-10 flex overflow-hidden">
      <aside className="w-[300px] hidden sm:block pl-6 shrink-0">
        <ProfileSidebar scrollRef={rightScrollRef} />
      </aside>

      <main className="flex-1 overflow-hidden">
        {/* THIS must be the scroll container */}
        <div ref={rightScrollRef} className="h-full overflow-y-auto sm:px-6">
          <Profile />
        </div>
      </main>
    </div>
  );
}
