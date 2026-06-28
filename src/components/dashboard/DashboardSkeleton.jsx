/**
 * ============================================================
 * DASHBOARD SKELETON
 * ============================================================
 */

function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">

      {/* Welcome Card */}

      <div className="h-44 rounded-2xl bg-gray-200"></div>

      {/* Stats */}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="h-28 rounded-xl bg-gray-200"
          />
        ))}

      </div>

      {/* Main Grid */}

      <div className="grid gap-6 lg:grid-cols-3">

        {/* Left */}

        <div className="space-y-6 lg:col-span-2">

          <div className="h-96 rounded-xl bg-gray-200"></div>

          <div className="h-64 rounded-xl bg-gray-200"></div>

        </div>

        {/* Right */}

        <div className="space-y-6">

          <div className="h-96 rounded-xl bg-gray-200"></div>

          <div className="h-72 rounded-xl bg-gray-200"></div>

          <div className="h-72 rounded-xl bg-gray-200"></div>

        </div>

      </div>

    </div>
  );
}

export default DashboardSkeleton;
