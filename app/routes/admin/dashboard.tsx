import { Header, StatsCard, TripCard } from "components";
import {dashboardStats, user, allTrips} from "~/constants";

const Dashboard = () => {


  const { totalUsers, usersJoined, totalTrips, tripsCreated, userRole } = dashboardStats

  return (
    <main className="dashboard">
      
      {/* Header section - full width */}
      <div className="w-full">
        <Header
          title={`Welcome ${user?.name ?? 'Guest'}`}
          description="Track activity, trends and popular destination"
        />
      </div>

      {/* StatsCards section - now wider, with its own padding */}
      <section className="w-full px-4 lg:px-8 flex flex-col gap-6"> {/* Added padding, kept flex structure */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full"> {/* Kept w-full from previous change */}
          <StatsCard
            headerTitle = "Active Users"
            total={totalUsers}
            currentMonthCount={usersJoined.currentMonth}
            lastMonthCount={usersJoined.lastMonth}
          />
          <StatsCard
            headerTitle = "Total Trips"
            total={totalTrips}
            currentMonthCount={tripsCreated.currentMonth}
            lastMonthCount={tripsCreated.lastMonth}
          />
          <StatsCard
            headerTitle = "User Roles"
            total={userRole.total}
            currentMonthCount={userRole.currentMonth}
            lastMonthCount={userRole.lastMonth}
          />
        </div>
      </section>
      <section className="container">
        <h1 className="text-xl font-semibold text-dark-100">
          Created Trips
        </h1>
        <div className="trip-grid">
          {allTrips.map(({id, name, imageUrls, itinerary, tags, estimatedPrice})=>(
            <TripCard
            key={id}
            id={id.toString()}
            name={name}
            imageUrls={imageUrls && imageUrls.length > 0 ? imageUrls[0] : '/assets/images/placeholder.png'} // Provide a fallback or handle appropriately
            location={itinerary?.[0]?.location ?? ''}
            tags={tags}
            price={Number(estimatedPrice)}
            />
          ))}
        </div>
      </section>
      
      {/* TripCard section - constrained by wrapper */}
      <div className="wrapper">
      </div>
    </main>
  )
}

export default Dashboard